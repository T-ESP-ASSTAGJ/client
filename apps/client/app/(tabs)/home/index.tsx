import Post from "@/app/(tabs)/home/_components/post/post";
import { MainView } from "@/components/ui/MainView";
import { HeaderAuth } from "@/components/ui/header/header-auth";
import { useAudio } from "@/contexts/audio-context";
import { fontFamily } from "@/dimensions/font-family";
import { useFeeds } from "@/hooks/swr/use-feeds";
import { mock_comments } from "@/mock-data/comment";
import type { ICommentResponse } from "@/types/comments/comment.types";
import type { IPost } from "@/types/post/post.types";
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
	const { stopCurrentPost, playPost } = useAudio();
	const { feed, loadingSWRFeed, errorSWRFeed, refreshFeed } = useFeeds({
		option: "public",
		page: 1,
	});
	/*const [posts, setPosts] = useState<IUserPostsResponse>({
		posts: [],
		pagination: { page: 1, limit: 0, has_next: false, last_post_id: 0 },
	});*/
	const [comments, setComments] = useState<ICommentResponse>();
	const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);
	const [refreshing, setRefreshing] = useState<boolean>(false);
	const hasScrolledRef = useRef<boolean>(false);
	const isLoadingMoreRef = useRef<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [containerHeight, setContainerHeight] = useState(0);
	const [itemHeight, setItemHeight] = useState(0);
	const [visiblePostIndex, setVisiblePostIndex] = useState(0);
	const previousPostIndexRef = useRef<number>(0);
	const hasInitializedRef = useRef<boolean>(false);

	useEffect(() => {
		setComments(mock_comments);
		setVisibleCount(PAGE_SIZE);
		setLoading(false);
	}, []);

	/*useEffect(() => {
		if (feed.length > 0 && !hasInitializedRef.current) {
			hasInitializedRef.current = true;

			if (feed[0]?.music?.preview_url) {
				const timer = setTimeout(() => {
					playPost(feed[0].id, feed[0].music.preview_url);
				}, 500);
				return () => clearTimeout(timer);
			}
		}
	}, [feed.length, playPost]);*/

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		console.log("🔄 refresh feed…");
		setTimeout(() => {
			setRefreshing(false);
			console.log("✅ refresh terminé");
		}, 1000);
	}, []);

	const data = useMemo(
		() => (feed ?? []).slice(0, Math.min(visibleCount, feed.length ?? 0)),
		[visibleCount, feed],
	);

	/*useEffect(() => {
		if (!hasInitializedRef.current && visiblePostIndex === 0) {
			return;
		}

		if (visiblePostIndex === previousPostIndexRef.current) {
			return;
		}

		const currentPost = data[visiblePostIndex];
		previousPostIndexRef.current = visiblePostIndex;
		stopCurrentPost();

		if (currentPost?.track?.preview_url) {
			const timer = setTimeout(() => {
				playPost(currentPost.id, currentPost.track.preview_url);
			}, 150);

			return () => {
				clearTimeout(timer);
			};
		}
	}, [visiblePostIndex, data, stopCurrentPost, playPost]);*/

	const canLoadMore = visibleCount < (feed.length ?? 0);

	const loadMore = () => {
		if (!hasScrolledRef.current) return;
		if (isLoadingMoreRef.current) return;
		if (!canLoadMore) return;

		isLoadingMoreRef.current = true;
		setVisibleCount((c) => Math.min(c + PAGE_SIZE, feed.length));
		console.log("loadMore called");
		isLoadingMoreRef.current = false;
	};

	const onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
		if (viewableItems.length > 0) {
			const firstVisibleItem = viewableItems[0];
			const index = firstVisibleItem.index;
			if (index !== null) {
				setVisiblePostIndex(index);
			}
		}
	}, []);

	const viewabilityConfig = useRef({
		itemVisiblePercentThreshold: 50,
		minimumViewTime: 100,
	}).current;

	return (
		<MainView safeArea disableTouchableWrapper={true}>
			<HeaderAuth searchIcon />

			{feed.length > 0 ? (
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
							renderItem={({ item, index }) => (
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
											width: "90%",
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
							onViewableItemsChanged={onViewableItemsChanged}
							viewabilityConfig={viewabilityConfig}
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
			) : (
				<View className={"flex-1 flex justify-center items-center"}>
					<Text
						className={"text-white text-lg"}
						style={{ fontFamily: fontFamily.semibold }}
					>
						No post founds
					</Text>
				</View>
			)}
		</MainView>
	);
}
