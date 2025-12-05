import { axiosInstance } from "@/utils/axios-instance";
import axios from "axios";

export async function login(email: string) {
	try {
		await axiosInstance.post("/auth/request", { email });

		return { success: true as const };
	} catch (e) {
		console.error(e);
		return {
			success: false as const,
			error: "Impossible d'envoyer le code. Réessaie plus tard.",
		};
	}
}

export async function verifyOtp({
	email,
	code,
}: { email: string; code: string }) {
	try {
		const res = await axiosInstance.post("/auth/verify", { email, code });

		return {
			success: true as const,
			status: res.status,
			data: res.data,
		};
	} catch (e: unknown) {
		console.error(e);

		if (axios.isAxiosError(e) && e.response?.status === 403) {
			return {
				success: false as const,
				status: 403,
				error: "Code invalide ou expiré.",
			};
		}

		return {
			success: false as const,
			status: 500,
			error: "Erreur serveur. Réessaie plus tard.",
		};
	}
}
