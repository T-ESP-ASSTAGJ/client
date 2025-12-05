import UserCard from "@/app/(tabs)/profile/_components/user-card";
import { Input } from "@/components/rnr-ui/input";
import { useFollowers } from "@/hooks/swr/profile/use-follower";
import { useCurrentUser } from "@/hooks/swr/user/use-current-user";
import { FlashList } from "@shopify/flash-list";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
	ActivityIndicator,
	Keyboard,
	Pressable,
	Text,
	View,
} from "react-native";

const normalize = (s: string) =>
	s
		.toLocaleLowerCase()
		.normalize("NFD")
		.replace(/\p{M}+/gu, "");

export default function FollowersList() {
	const { followers, error, loading, mutateFollowers } = useFollowers();
	const {
		currentUser,
		errorCurrentUser,
		loadingCurrentUser,
		mutateCurrentUser,
	} = useCurrentUser();

	const [value, setValue] = useState<string>("");
	const hasScrolledRef = useRef<boolean>(false);

	// snapshot des ids des gens qui ME follow, au chargement
	const [snapshotFollowerIds, setSnapshotFollowerIds] = useState<
		number[] | null
	>(null);

	useEffect(() => {
		if (error || errorCurrentUser) {
			console.log(error ?? errorCurrentUser);
		}
	}, [error, errorCurrentUser]);

	useEffect(() => {
		if (
			!loading &&
			!loadingCurrentUser &&
			currentUser?.follower &&
			snapshotFollowerIds === null
		) {
			setSnapshotFollowerIds(currentUser.follower.map((u) => u.id));
		}
	}, [loading, loadingCurrentUser, currentUser, snapshotFollowerIds]);

	const baseFollowers = useMemo(() => {
		if (!followers || !snapshotFollowerIds) return [];

		const followerIds = new Set(snapshotFollowerIds);
		return followers.filter((u) => followerIds.has(u.id));
	}, [followers, snapshotFollowerIds]);

	const filtered = useMemo(() => {
		const list = baseFollowers;
		const q = normalize(value.trim());
		if (!q) return list;

		return list.filter((f) => {
			const haystack = [f.username].filter(Boolean).map(normalize).join(" ");
			return haystack.includes(q);
		});
	}, [baseFollowers, value]);

	const handleFollowChange = async () => {
		// on ne touche pas à snapshotFollowerIds → la liste reste stable
		await mutateCurrentUser();
		await mutateFollowers();
	};

	return (
		<Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
			<View className={"mx-5 h-[650px] overflow-hidden"}>
				<View className={"mb-8"}>
					<Input
						value={value}
						onChangeText={setValue}
						placeholder={"Find followers"}
						iconLeft="magnifyingglass"
						iconLeftColor={"#717C83"}
						returnKeyType="search"
					/>
				</View>

				{loading || loadingCurrentUser || snapshotFollowerIds === null ? (
					<View className={"flex-1 flex justify-center items-center"}>
						<ActivityIndicator />
					</View>
				) : filtered?.length === 0 ? (
					<Text className={"color-[#9aa0a6] text-center"}>
						{value.trim() ? `No results for “${value}”.` : "Any suggestions"}
					</Text>
				) : (
					<FlashList
						className={"m-1"}
						data={filtered}
						keyExtractor={(item) => String(item.id)}
						numColumns={1}
						renderItem={({ item }) => (
							<UserCard
								follower={item}
								isFollowersPage={true}
								isFollowing={
									currentUser?.followed?.some((u) => u.id === item.id) ?? false
								}
								onFollowChange={handleFollowChange}
							/>
						)}
						estimatedItemSize={80}
						ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
						showsVerticalScrollIndicator={false}
						onMomentumScrollBegin={() => {
							hasScrolledRef.current = true;
						}}
						onScrollBeginDrag={() => {
							hasScrolledRef.current = true;
							Keyboard.dismiss();
						}}
						keyboardDismissMode="on-drag"
						keyboardShouldPersistTaps="never"
						onEndReachedThreshold={0.2}
						contentContainerStyle={{ paddingBottom: 18 }}
					/>
				)}
			</View>
		</Pressable>
	);
}
