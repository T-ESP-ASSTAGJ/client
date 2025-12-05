import axios from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

export const axiosInstance = axios.create({
	baseURL: "http://10.68.246.227:80/api",
	timeout: 5000,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
	withCredentials: true,
	validateStatus: () => true,
});

axiosInstance.interceptors.request.use(
	async (config) => {
		const token = await SecureStore.getItemAsync("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
	async (response) => {
		if (
			response.status === 401 &&
			!response.config.url.includes("/auth/refresh")
		) {
			console.log("🔄 Token expiré. Tentative de refresh...");

			try {
				await SecureStore.deleteItemAsync("token");
				await SecureStore.deleteItemAsync("refresh_token");
				router.replace("/login");
			} catch (err) {
				console.error("❌ Refresh token échoué");
				await SecureStore.deleteItemAsync("token");
				await SecureStore.deleteItemAsync("refresh_token");
				router.replace("/login");
			}
		}

		return response;
	},
	(error) => Promise.reject(error),
);
