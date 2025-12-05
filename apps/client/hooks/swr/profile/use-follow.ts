import type { IFollow } from "@/types/profile/follow/follow.types";
import { axiosSWRFetcher } from "@/utils/swr-fetcher";
import useSWR from "swr";

export function useFollows() {
	const { data, error, isLoading, mutate } = useSWR<IFollow[]>(
		"/users?page=1",
		axiosSWRFetcher,
		{
			refreshInterval: 60_000,
			revalidateOnReconnect: true,
			revalidateIfStale: true,
		},
	);

	return {
		follows: data ?? [],
		error: error,
		loading: isLoading,
		mutateFollows: mutate,
	};
}
