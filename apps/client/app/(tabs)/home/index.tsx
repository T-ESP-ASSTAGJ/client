import Post from "@/app/(tabs)/home/_components/post/post";
import type {
	IPost,
	IUserPostsResponse,
} from "@/app/(tabs)/home/_types/post.types";
import { MainView } from "@/components/ui/MainView";
import { HeaderAuth } from "@/components/ui/header/header-auth";
import { mock_pagination, mock_posts } from "@/mock-data/post";
import { FlashList } from "@shopify/flash-list";
import { useCallback, useEffect, useState } from "react";
import { Platform, RefreshControl, View } from "react-native";

export default function HomePage() {
	const [posts, setPosts] = useState<IUserPostsResponse>();
	const [refreshing, setRefreshing] = useState(false);

	useEffect(() => {
		setPosts({
			posts: mock_posts,
			pagination: mock_pagination,
		});
	}, []);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		console.log("🔄 refresh feed…");
		setTimeout(() => {
			setRefreshing(false);
			console.log("✅ refresh terminé");
		}, 1000);
	}, []);

	return (
		<MainView safeArea disableTouchableWrapper={true}>
			<HeaderAuth searchIcon />

			<View className={"h-full w-full"}>
				<FlashList<IPost>
					data={posts?.posts ?? []}
					numColumns={1}
					renderItem={({ item }) => (
						<View className="m-auto">
							<Post key={item.id} post={item} />
						</View>
					)}
					contentContainerStyle={{ paddingBottom: 180 }}
					estimatedItemSize={60}
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
			</View>
		</MainView>
	);
}
