import type { ICurrentUser } from "@/types/user/current-user.types";
import { axiosSWRFetcher } from "@/utils/swr-fetcher";
import useSWR from "swr";

export function useCurrentUser() {
	const { data, error, isLoading, mutate } = useSWR<ICurrentUser>(
		'/users/me',
		axiosSWRFetcher,
		{
			refreshInterval: 60_000,
			revalidateOnReconnect: true,
			revalidateIfStale: true,
		},
	);

	return {
		currentUser: data ?? null,
		errorCurrentUser: error,
		loadingCurrentUser: isLoading,
		mutateCurrentUser: mutate,
	};
}
