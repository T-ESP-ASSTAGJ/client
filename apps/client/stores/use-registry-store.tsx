import { canAccessStep, validateStep } from "@/utils/schemas/registration";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const ROUTES = [
	"/(auth)/(signup)/phone",
	"/(auth)/(signup)/phone-confirmation",
	"/(auth)/(signup)/email",
	"/(auth)/(signup)/email-confirmation",
	"/(auth)/(signup)/names",
] as const;

export const createSecureStorage = () => ({
	getItem: (name: string) => SecureStore.getItemAsync(name).catch(() => null),
	setItem: (name: string, value: string) =>
		SecureStore.setItemAsync(name, value).catch(console.error),
	removeItem: (name: string) =>
		SecureStore.deleteItemAsync(name).catch(console.error),
});

export interface RegistrationState {
	phoneNumber: string;
	isPhoneConfirmed: boolean;
	email: string;
	username: string;
	currentStep: number;
}

interface RegistrationStore {
	// Form state
	formState: RegistrationState;
	errors: Record<string, string[]>;

	// Methods
	setFormState: (
		updater: (prevState: RegistrationState) => RegistrationState,
	) => void;
	nextStep: () => void;
	prevStep: () => void;
	goToStep: (step: number) => void;

	// Validation
	canNext: () => boolean;
	canBack: () => boolean;
	canAccessStep: (step: number) => boolean;
	validateCurrentStep: () => boolean;

	// Progress & Errors
	getProgress: () => number;
	getErrors: (field?: string) => string[];
	clearErrors: () => void;
}

const initialFormState: RegistrationState = {
	phoneNumber: "",
	isPhoneConfirmed: false,
	email: "",
	username: "",
	currentStep: 0,
};

export const useRegistrationStore = create<RegistrationStore>()(
	persist(
		(set, get) => ({
			formState: initialFormState,
			errors: {},

			setFormState: (updater) =>
				set((state) => ({
					formState: updater(state.formState),
				})),

			nextStep: () => {
				const state = get().formState;
				const validation = validateStep(state.currentStep, state);

				if (!validation.isValid) {
					set((prevState) => ({
						...prevState,
						errors: validation.fieldErrors,
					}));
					return;
				}

				const nextStep = Math.min(state.currentStep + 1, ROUTES.length - 1);
				// Fixed: update formState properly
				set((prevState) => ({
					...prevState,
					formState: {
						...prevState.formState,
						currentStep: nextStep,
					},
				}));
				router.push(ROUTES[nextStep]);
			},

			prevStep: () => {
				const { formState } = get();
				const prevStep = Math.max(formState.currentStep - 1, 0);
				// Fixed: update formState properly
				set((prevState) => ({
					...prevState,
					formState: {
						...prevState.formState,
						currentStep: prevStep,
					},
				}));
				router.push(ROUTES[prevStep]);
			},

			goToStep: (step) => {
				const { formState } = get(); // Fixed: get formState specifically
				const targetStep = Math.max(0, Math.min(step, ROUTES.length - 1));

				if (canAccessStep(targetStep, formState)) {
					// Fixed: pass formState
					set((prevState) => ({
						...prevState,
						formState: {
							...prevState.formState,
							currentStep: targetStep,
						},
					}));
					router.push(ROUTES[targetStep]);
				}
			},

			canNext: () => {
				const { formState } = get(); // Fixed: get formState specifically
                return true
				/*return validateStep(formState.currentStep, formState).isValid;*/
			},

			canBack: () => get().formState.currentStep > 0, // Fixed: access formState.currentStep

			canAccessStep: (step) => {
				const { formState } = get(); // Fixed: get formState specifically
                return true
				/*return canAccessStep(step, formState); // Fixed: pass formState*/
			},

			validateCurrentStep: () => {
				const { formState } = get(); // Fixed: get formState specifically
				const validation = validateStep(formState.currentStep, formState);
				set((prevState) => ({
					...prevState,
					errors: validation.fieldErrors,
				}));
				return validation.isValid;
			},

			getProgress: () => {
				const { formState } = get();
				return (formState.currentStep / ROUTES.length) * 100;
			},

			getErrors: (field) => {
				const { errors } = get();
				return field ? errors[field] || [] : Object.values(errors).flat();
			},

			clearErrors: () =>
				set((prevState) => ({
					...prevState,
					errors: {},
				})),
		}),
		{
			name: "registration",
			storage: createJSONStorage(() => createSecureStorage()),
			partialize: ({ errors, ...state }) => state, // This excludes errors from persistence
		},
	),
);
