import Friend from "@/app/core/(tabs)/friends/_components/friend";
import { Input } from "@/components/rnr-ui/input";
import { mock_friends } from "@/mock-data/friend";
import type { IFriend } from "@/types/friends/friend.types";
import { FlashList } from "@shopify/flash-list";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Text, View } from "react-native";

const normalize = (s: string) =>
	s
		.toLocaleLowerCase()
		.normalize("NFD")
		.replace(/\p{M}+/gu, "");

const PAGE_SIZE = 11;

export default function FriendsList() {
	const [friends, setFriends] = useState<IFriend[]>([]);
	const [value, setValue] = useState<string>("");
	const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);
	const hasScrolledRef = useRef<boolean>(false);
	const isLoadingMoreRef = useRef<boolean>(false);

	useEffect(() => {
		setFriends(mock_friends);
	}, []);

	const filtered = useMemo(() => {
		const q = normalize(value.trim());
		if (!q) return friends;

		return friends.filter((f) => {
			const haystack = [
				f.username,
				f.first_name,
				f.last_name,
				`${f.first_name} ${f.last_name}`,
			]
				.filter(Boolean)
				.map(normalize)
				.join(" ");
			return haystack.includes(q);
		});
	}, [value, friends]);

	useEffect(() => {
		setVisibleCount(PAGE_SIZE);
	}, [value]);

	const data = useMemo(
		() => filtered.slice(0, Math.min(visibleCount, filtered.length)),
		[filtered, visibleCount],
	);

	const canLoadMore = visibleCount < filtered.length;
	const loadMore = () => {
		if (!hasScrolledRef.current) return;
		if (isLoadingMoreRef.current) return;
		if (!canLoadMore) return;

		isLoadingMoreRef.current = true;
		setVisibleCount((c) => Math.min(c + PAGE_SIZE, filtered.length));
		console.log("loadMore called");
		isLoadingMoreRef.current = false;
	};

	return (
		<View className={"m-5 h-[650px] overflow-hidden"}>
			<View className={"mb-8"}>
				<Input
					value={value}
					onChangeText={setValue}
					placeholder={"Find friends"}
					iconLeft="magnifyingglass"
					iconLeftColor={"#717C83"}
					returnKeyType="search"
				/>
			</View>

			{filtered.length === 0 ? (
				<Text className={"color-[#9aa0a6] text-center"}>
					{value.trim() ? `No results for “${value}”.` : "Any suggestions."}
				</Text>
			) : (
				<FlashList<IFriend>
					data={data}
					keyExtractor={(item) => String(item.id)}
					numColumns={1}
					renderItem={({ item }) => <Friend friend={item} />}
					estimatedItemSize={data.length}
					ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
					showsVerticalScrollIndicator={false}
					onMomentumScrollBegin={() => {
						hasScrolledRef.current = true;
					}}
					onScrollBeginDrag={() => {
						hasScrolledRef.current = true;
					}}
					onEndReachedThreshold={0.2}
					onEndReached={loadMore}
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
					contentContainerStyle={{ paddingBottom: 18 }}
				/>
			)}
		</View>
	);
}
