import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import {
	type User,
	type UserData,
	UserInfo,
	type UserPreferences,
} from "../../../shared/types/user";

interface UserState {
	user: User | null;
	isDirty: boolean;
	isAuthenticated: boolean;
	updateUserLocally: (partialUser: Partial<User>) => void;
	updateUserDataLocally: (partialUserData: Partial<UserData>) => void;
	updatePreferencesLocally: (
		partialPreferences: Partial<UserPreferences>,
	) => void;
	syncUserToBackend: () => Promise<void>;
	initializeUser: () => Promise<void>;
	logout: () => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
	user: null,
	isDirty: false,

	get isAuthenticated() {
		return get().user !== null;
	},

	updateUserLocally: (partialUser) => {
		set((state) => ({
			user: state.user ? { ...state.user, ...partialUser } : null,
			isDirty: true,
		}));
	},

	updateUserDataLocally: (partialUserData: Partial<UserData>) => {
		set((state) => ({
			user: state.user
				? {
						...state.user,
						user_data: {
							...state.user.user_data,
							...partialUserData,
						},
					}
				: null,
			isDirty: true,
		}));
	},

	updatePreferencesLocally: (partialPreferences) => {
		set((state) => ({
			user: state.user
				? {
						...state.user,
						preferences: {
							...state.user.preferences,
							...partialPreferences,
						},
					}
				: null,
			isDirty: true,
		}));
	},

	syncUserToBackend: async () => {
		const { user, isDirty } = get();
		if (!user || !isDirty) return;

		try {
			/*await updateUser(user.id, user);*/
			set({ isDirty: false });
			console.log("✅ User synced with backend");
		} catch (error) {
			console.error("❌ Error syncing user:", error);
		}
	},

	initializeUser: async () => {
		try {
			const token = await SecureStore.getItemAsync("access_token");

			if (!token) {
				/*await get().logout();*/
				return;
			}

			/*const userData = await getUserMe();*/
			/*set({ isAuthenticated: true, user: userData, isDirty: false });*/
		} catch (error) {
			console.error("Error initializing user:", error);
			await get().logout();
		}
	},

	logout: async () => {
		await SecureStore.deleteItemAsync("access_token");
		await SecureStore.deleteItemAsync("refresh_token");
		set({ user: null, isDirty: false, isAuthenticated: false });
		/*router.replace('/(auth)/sign-in');*/
	},
}));
