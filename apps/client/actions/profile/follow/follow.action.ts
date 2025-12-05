import { axiosInstance } from "@/utils/axios-instance";

export async function follow(id: number) {
	try {
		await axiosInstance.post(`/users/${id}/follow`);
		return { success: true as const };
	} catch (e) {
		console.error(e);
		return {
			success: false as const,
			error: "Impossible to follow this user.",
		};
	}
}

export async function unfollow(id: number) {
	try {
		await axiosInstance.delete(`/users/${id}/unfollow`);
		return { success: true as const };
	} catch (e) {
		console.error(e);
		return {
			success: false as const,
			error: "Impossible to unfollow this user.",
		};
	}
}
