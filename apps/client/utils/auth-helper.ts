import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

export async function refreshAccessToken(): Promise<string | null> {
	try {
		const refreshToken = await SecureStore.getItemAsync("refresh_token");
		if (!refreshToken) return null;

		const res = await fetch("http://192.168.1.125:3001/api/v1/auth/refresh", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ refresh_token: refreshToken }),
		});

		if (res.ok) {
			const data = await res.json();
			return data.access_token;
		}

		return null;
	} catch (e) {
		console.error("Erreur lors du refresh token", e);
		return null;
	}
}

export async function forceLogout() {
	await SecureStore.deleteItemAsync("access_token");
	await SecureStore.deleteItemAsync("refresh_token");
	/*router.replace('/(auth)/sign-in');*/
}
