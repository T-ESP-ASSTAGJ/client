import type { ICreatePost } from "@/app/(tabs)/post/new/_types/post.create.types";
import { axiosInstance } from "@/utils/axios-instance";

export async function createPost(payload: ICreatePost) {
	const res = await axiosInstance.post("/posts", payload);
	return {
		success: true as const,
		status: res.status,
		data: res.data,
	};
}

export async function getTracks() {
	const res = await axiosInstance.get("/tracks");
	return {
		success: true as const,
		status: res.status,
		data: res.data,
	};
}
