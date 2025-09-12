import { validateStep } from "@/utils/schemas/registration";
import type { Href } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const REGISTER_ROUTES = [
	"/core/(auth)/(signup)/phone",
	"/core/(auth)/(signup)/phone-confirmation",
	"/core/(auth)/(signup)/email",
	"/core/(auth)/(signup)/email-confirmation",
	"/core/(auth)/(signup)/username",
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
	// State
	formState: RegistrationState;
	errors: Record<string, string[]>;

	// Methods
	setFormState: (
		updater: (prevState: RegistrationState) => RegistrationState,
	) => void;
	nextStep: () => Href | null;
	prevStep: () => Href | null;
	getCurrentStep: () => Href;
	canNext: () => boolean;
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

			setFormState: (updater) => {
				set((state) => ({
					formState: updater(state.formState),
					errors: {},
				}));
			},

			canNext: () => {
				const { formState } = get();
				return validateStep(formState.currentStep, formState).isValid;
			},

			nextStep: () => {
				const { formState } = get();
				if (formState.currentStep === REGISTER_ROUTES.length - 1) return null;
				const validation = validateStep(formState.currentStep, formState);

				if (!validation.isValid) {
					set((prevState) => ({
						...prevState,
						errors: validation.fieldErrors,
					}));
					return null;
				}

				const nextStepIndex = Math.min(
					formState.currentStep + 1,
					REGISTER_ROUTES.length - 1,
				);

				set((prevState) => ({
					...prevState,
					formState: {
						...prevState.formState,
						currentStep: nextStepIndex,
					},
					errors: {},
				}));

				return REGISTER_ROUTES[nextStepIndex];
			},

			prevStep: () => {
				const { formState } = get();
				if (formState.currentStep === 0) return null;
				const prevStepIndex = Math.max(formState.currentStep - 1, 0);

				set((prevState) => ({
					...prevState,
					formState: {
						...prevState.formState,
						currentStep: prevStepIndex,
					},
				}));

				return REGISTER_ROUTES[prevStepIndex];
			},
			getCurrentStep: () => {
				const { formState } = get();
				return formState.currentStep < REGISTER_ROUTES.length &&
					formState.currentStep >= 0
					? REGISTER_ROUTES[formState.currentStep]
					: REGISTER_ROUTES[0];
			},
		}),
		{
			name: "registration",
			storage: createJSONStorage(() => createSecureStorage()),
			partialize: ({ errors, ...state }) => state,
		},
	),
);
