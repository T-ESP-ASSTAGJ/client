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

interface RegistrationState {
	phoneNumber: string;
	email: string;
	name: string;
	lastName: string;
	currentStep: number;
}

interface RegistrationStore {
	formState: RegistrationState;
	setFormState: (
		updater: (prevState: RegistrationState) => RegistrationState,
	) => void;
	loadStoredData: () => Promise<void>;
}

const initialFormState: RegistrationState = {
	phoneNumber: "",
	email: "",
	name: "",
	lastName: "",
	currentStep: 1,
};

export const useRegistrationStore = create<RegistrationStore>()(
	persist(
		(set) => ({
			formState: initialFormState,
			setFormState: (updater) =>
				set((state) => ({
					formState: updater(state.formState),
				})),
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
