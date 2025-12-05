import type { IFollower } from "@/types/profile/follower/follower.types";
import { axiosSWRFetcher } from "@/utils/swr-fetcher";
import useSWR from "swr";

export function useFollowers() {
	const { data, error, isLoading, mutate } = useSWR<IFollower[]>(
		'/users?page=1',
		axiosSWRFetcher,
		{
			refreshInterval: 60_000,
			revalidateOnReconnect: true,
			revalidateIfStale: true,
		},
	);

	return {
		followers: data ?? [],
		refresh: mutate,
		error: error,
		loading: isLoading,
		mutateFollowers: mutate,
	};
}
