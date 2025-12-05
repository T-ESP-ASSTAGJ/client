import { useUserStore } from "@/stores/use-user-store";
import type { IPost } from "@/types/post/post.types";
import { axiosSWRFetcher } from "@/utils/swr-fetcher";
import { useEffect, useState } from "react";
import useSWR from "swr";

export const useFeeds = ({
	option,
	page = 1,
}: { option: "private" | "public"; page: number }) => {
	const { user } = useUserStore();
	const [posts, setPosts] = useState<IPost[]>([]);

	// Only fetch if user exists and has an _id
	// biome-ignore lint/complexity/useOptionalChain: <explanation>
	/*const shouldFetch = !!(user && user.id);*/

	const key = `/feed/${option}?page=${page}`;

	const {
		data,
		mutate,
		isLoading: loadingSWRFeed,
		error: errorSWRFeed,
	} = useSWR(key, axiosSWRFetcher, {
		revalidateOnFocus: true,
		revalidateOnReconnect: true,
	});

	useEffect(() => {
		if (data) {
			setPosts(data);
		}
	}, [data]);

	return {
		feed: posts,
		refreshFeed: () => mutate(),
		loadingSWRFeed,
		errorSWRFeed,
		isError: !!errorSWRFeed,
	};
};
