import Post from "@/app/core/(tabs)/home/_components/post/post";
import type {
	IPost,
	IUserPostsResponse,
} from "@/app/core/(tabs)/home/_types/post.types";
import { MainView } from "@/components/ui/MainView";
import { HeaderAuth } from "@/components/ui/header/header-auth";
import { mock_comments } from "@/mock-data/comment";
import { mock_pagination, mock_posts } from "@/mock-data/post";
import type { ICommentResponse } from "@/types/comments/comment.types";
import { FlashList } from "@shopify/flash-list";
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { Platform, RefreshControl, Text, View } from "react-native";

const PAGE_SIZE = 3;

export default function HomePage() {
	const [posts, setPosts] = useState<IUserPostsResponse>({
		posts: [],
		pagination: { page: 1, limit: 0, has_next: false, last_post_id: 0 },
	});
	const [comments, setComments] = useState<ICommentResponse>();
	const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);
	const [refreshing, setRefreshing] = useState<boolean>(false);
	const hasScrolledRef = useRef<boolean>(false);
	const isLoadingMoreRef = useRef<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [containerHeight, setContainerHeight] = useState(0);
	const [itemHeight, setItemHeight] = useState(0);

	useEffect(() => {
		setPosts({
			posts: mock_posts,
			pagination: mock_pagination,
		});

		setComments(mock_comments);
		setVisibleCount(PAGE_SIZE);
		setLoading(false);
	}, []);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		console.log("🔄 refresh feed…");
		setTimeout(() => {
			setRefreshing(false);
			console.log("✅ refresh terminé");
		}, 1000);
	}, []);

	const data = useMemo(
		() =>
			(posts?.posts ?? []).slice(
				0,
				Math.min(visibleCount, posts?.posts.length ?? 0),
			),
		[visibleCount, posts.posts],
	);

	const canLoadMore = visibleCount < (posts?.posts.length ?? 0);

	const loadMore = () => {
		if (!hasScrolledRef.current) return;
		if (isLoadingMoreRef.current) return;
		if (!canLoadMore) return;

		isLoadingMoreRef.current = true;
		setVisibleCount((c) => Math.min(c + PAGE_SIZE, posts.posts.length));
		console.log("loadMore called");
		isLoadingMoreRef.current = false;
	};

	return (
		<MainView safeArea disableTouchableWrapper={true}>
			<HeaderAuth searchIcon />

			<View
				className="w-full flex-1"
				onLayout={(e) => {
					setContainerHeight(e.nativeEvent.layout.height);
				}}
			>
				{containerHeight > 0 && (
					<FlashList<IPost>
						data={data ?? []}
						keyExtractor={(item) => item.id.toString()}
						renderItem={({ item }) => (
							<View
								onLayout={(e) => {
									if (!itemHeight) {
										setItemHeight(e.nativeEvent.layout.height);
									}
								}}
								style={{
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<View
									style={{
										width: "91%",
									}}
								>
									<Post post={item} comments={comments} />
								</View>
							</View>
						)}
						pagingEnabled={false}
						snapToInterval={itemHeight || containerHeight}
						snapToAlignment="start"
						decelerationRate="fast"
						disableIntervalMomentum
						estimatedItemSize={itemHeight || containerHeight}
						onMomentumScrollBegin={() => {
							hasScrolledRef.current = true;
						}}
						onScrollBeginDrag={() => {
							hasScrolledRef.current = true;
						}}
						onEndReachedThreshold={0.8}
						onEndReached={loadMore}
						contentContainerStyle={{}}
						ListFooterComponent={
							canLoadMore ? (
								<Text
									style={{
										color: "#9aa0a6",
										textAlign: "center",
										paddingVertical: 12,
									}}
								>
									Load more...
								</Text>
							) : (
								<View style={{ height: 12 }} />
							)
						}
						refreshControl={
							<RefreshControl
								onRefresh={onRefresh}
								refreshing={refreshing}
								tintColor="#ffffff"
								colors={["#ffffff"]}
								progressBackgroundColor="#ffffff"
								progressViewOffset={Platform.select({ ios: 24, android: 16 })}
							/>
						}
					/>
				)}
			</View>
		</MainView>
	);
}
