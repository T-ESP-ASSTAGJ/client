import { axiosInstance } from "@/utils/axios-instance";

const axiosSWRFetcher = (url: string) =>
	axiosInstance.get(url).then((res) => res.data);

export { axiosSWRFetcher };
