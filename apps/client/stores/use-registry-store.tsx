import { validateStep } from "@/utils/schemas/registration";
import type { Href } from "expo-router";
import { create } from "zustand";

export const REGISTER_ROUTES = [
	"/signup/phone",
	"/signup/phone-confirmation",
	"/signup/email",
	"/signup/email-confirmation",
	"/signup/username",
] as const;

export interface RegistrationState {
	phoneNumber: string;
	isPhoneConfirmed: boolean;
	email: string;
	isEmailConfirmed: boolean;
	username: string;
	currentStep: number;
}

interface RegistrationStore {
	formState: RegistrationState;
	errors: Record<string, string[]>;

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
	isEmailConfirmed: false,
	username: "",
	currentStep: 0,
};

export const useRegistrationStore = create<RegistrationStore>()((set, get) => ({
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
}));
