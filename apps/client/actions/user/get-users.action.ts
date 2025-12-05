import { axiosInstance } from "@/utils/axios-instance";

export async function getUsersAction() {
	try {
		const response = await axiosInstance.get("/users");

		console.log(response.data);
		return response.data;
	} catch (e) {
		console.error(e);
	}
}
