import { type Href, router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const expoSecureStorage = {
	getItem: async (name: string): Promise<string | null> => {
		try {
			return await SecureStore.getItemAsync(name);
		} catch (error) {
			console.error("Error getting item from SecureStore:", error);
			return null;
		}
	},
	setItem: async (name: string, value: string): Promise<void> => {
		try {
			await SecureStore.setItemAsync(name, value);
		} catch (error) {
			console.error("Error setting item in SecureStore:", error);
		}
	},
	removeItem: async (name: string): Promise<void> => {
		try {
			await SecureStore.deleteItemAsync(name);
		} catch (error) {
			console.error("Error removing item from SecureStore:", error);
		}
	},
};

const SIGNUP_FLOW: Href[] = [
	"/(auth)/(signup)/phone",
	"/(auth)/(signup)/phone-confirmation",
	"/(auth)/(signup)/email",
	"/(auth)/(signup)/email-confirmation",
	"/(auth)/(signup)/names",
];

const TOTAL_STEPS = SIGNUP_FLOW.length;

interface RegistrationState {
	phoneNumber: string;
	email: string;
	name: string;
	lastName: string;
	currentStep: number;
}

interface RegistrationStore {
	formState: RegistrationState;
	nextStep: () => void;
	setFormState: (
		updater: (prevState: RegistrationState) => RegistrationState,
	) => void;
	prevStep: () => void;
	setStep: (step: number) => void;
	getProgress: () => number;
	// loadStoredData: () => Promise<void>;
}

const initialFormState: RegistrationState = {
	phoneNumber: "",
	email: "",
	name: "",
	lastName: "",
	currentStep: 0,
};

export const useRegistrationStore = create<RegistrationStore>()(
	persist(
		(set, get) => ({
			formState: initialFormState,
			setFormState: (updater) =>
				set((state) => ({
					formState: updater(state.formState),
				})),
			nextStep: () => {
				set((state) => ({
					formState: {
						...state.formState,
						currentStep: Math.min(state.formState.currentStep + 1, TOTAL_STEPS),
					},
				}));
				router.push(SIGNUP_FLOW[get().formState.currentStep]);
			},
			prevStep: () => {
				set((state) => ({
					formState: {
						...state.formState,
						currentStep: Math.max(state.formState.currentStep - 1, 0),
					},
				}));
				router.push(SIGNUP_FLOW[get().formState.currentStep]);
			},

			setStep: (step) => {
				set((state) => ({
					formState: {
						...state.formState,
						currentStep: Math.max(1, Math.min(step, TOTAL_STEPS - 1)),
					},
				}));
				router.push(SIGNUP_FLOW[get().formState.currentStep]);
			},

			getProgress: () => (get().formState.currentStep * 100) / TOTAL_STEPS - 1,
			loadStoredData: async () => {
				try {
					const storedData = await expoSecureStorage.getItem(
						"registration-storage",
					);
					if (storedData) {
						const parsed = JSON.parse(storedData);
						if (parsed.state?.formState) {
							set({ formState: parsed.state.formState });
						}
					}
				} catch (error) {
					console.error("Error loading stored registration data:", error);
				}
			},
		}),
		{
			name: "registration-storage",
			storage: createJSONStorage(() => expoSecureStorage),
			partialize: (state) => ({ formState: state.formState }),
		},
	),
);
