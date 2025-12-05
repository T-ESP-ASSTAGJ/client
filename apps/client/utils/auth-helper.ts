import { axiosInstance } from "@/utils/axios-instance";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

export async function refreshAccessToken(): Promise<string | null> {
	try {
		const refreshToken = await SecureStore.getItemAsync("refresh_token");
		if (!refreshToken) return null;

		const res = await axiosInstance.post("/auth/refresh", {
			refresh_token: refreshToken,
		});

		if (res.status !== 422) {
			const data = await res.data;
			return data.token;
		}

		return null;
	} catch (e) {
		console.error("Erreur lors du refresh token", e);
		return null;
	}
}
