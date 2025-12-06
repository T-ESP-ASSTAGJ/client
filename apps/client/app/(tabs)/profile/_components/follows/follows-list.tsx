import UserCard from "@/app/(tabs)/profile/_components/user-card";
import { Input } from "@/components/rnr-ui/input";
import { useFollows } from "@/hooks/swr/profile/use-follow";
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

export default function FollowsList() {
	const { follows, error, loading, mutateFollows } = useFollows();
	const {
		currentUser,
		errorCurrentUser,
		loadingCurrentUser,
		mutateCurrentUser,
	} = useCurrentUser();

	const [value, setValue] = useState<string>("");
	const hasScrolledRef = useRef<boolean>(false);

	// 👇 snapshot des ids suivis au moment où la page est prête
	const [snapshotFollowedIds, setSnapshotFollowedIds] = useState<
		number[] | null
	>(null);

	useEffect(() => {
		if (error || errorCurrentUser) {
			console.log(error ?? errorCurrentUser);
		}
	}, [error, errorCurrentUser]);

	useEffect(() => {
		// quand tout est chargé et qu'on n'a pas encore pris le snapshot
		if (
			!loading &&
			!loadingCurrentUser &&
			currentUser?.followed &&
			snapshotFollowedIds === null
		) {
			setSnapshotFollowedIds(currentUser.followed.map((u: any) => u.id));
		}
	}, [loading, loadingCurrentUser, currentUser, snapshotFollowedIds]);

	const baseFollows = useMemo(() => {
		if (!follows || !snapshotFollowedIds) return [];

		const ids = new Set(snapshotFollowedIds);
		return follows.filter((f: any) => ids.has(f.id));
	}, [follows, snapshotFollowedIds]);

	const filtered = useMemo(() => {
		const list = baseFollows ?? [];
		const q = normalize(value.trim());
		if (!q) return list;

		return list.filter((f) => {
			const haystack = [f.username].filter(Boolean).map(normalize).join(" ");
			return haystack.includes(q);
		});
	}, [baseFollows, value]);

	const handleFollowChange = async () => {
		// on garde list baseFollows telle quelle (on ne touche pas à snapshotFollowedIds)
		// mais on rafraîchit les données "vraies" en background
		await mutateCurrentUser();
		await mutateFollows();
	};

	return (
		<Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
			<View className={"mx-5 h-[650px] overflow-hidden"}>
				<View className={"mb-8"}>
					<Input
						value={value}
						onChangeText={setValue}
						placeholder={"Find follows"}
						iconLeft="magnifyingglass"
						iconLeftColor={"#717C83"}
						returnKeyType="search"
					/>
				</View>

				{loading || loadingCurrentUser || snapshotFollowedIds === null ? (
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
								isFollowersPage={false}
								// ici on regarde l'état ACTUEL pour l'affichage du bouton
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
