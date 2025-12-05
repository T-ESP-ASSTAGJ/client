import { FlashList } from "@shopify/flash-list";
import {
	BookmarkIcon,
	CircleAlert,
	Heart,
	LucidePlay,
	MessageSquarePlusIcon,
	Send,
} from "lucide-react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
	Keyboard,
	Platform,
	Pressable,
	Text,
	type TextInput,
	View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Commentary from "@/app/(tabs)/home/_components/comment/commentary";
import type {
	IComment,
	ICommentResponse,
} from "@/types/comments/comment.types";
import type { IMusic } from "@/types/post/post.types";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/rnr-ui/avatar";
import { Button } from "@/components/rnr-ui/button";
import { Input } from "@/components/rnr-ui/input";
import { TouchableButton } from "@/components/ui/touchable-button";
import { getYearFromDate } from "@/helpers/format-date-helper";

interface CommentsProps {
	music: IMusic;
	comments: ICommentResponse;
}

export default function CommentsList({ music, comments }: CommentsProps) {
	const insets = useSafeAreaInsets();
	const [inputBarH, setInputBarH] = useState(56);
	const [kbHeight, setKbHeight] = useState(0);
	const [commentText, setCommentText] = useState(""); // <- état pour l'input

	const listRef = useRef<FlashList<IComment>>(null);
	const inputRef = useRef<TextInput>(null);

	useEffect(() => {
		const showEvt =
			Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
		const hideEvt =
			Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

		const subShow = Keyboard.addListener(showEvt, (e) =>
			setKbHeight(e.endCoordinates?.height ?? 0),
		);
		const subHide = Keyboard.addListener(hideEvt, () => setKbHeight(0));

		return () => {
			subShow.remove();
			subHide.remove();
		};
	}, []);

	const inputBottom = useMemo(
		() => (kbHeight > 0 ? kbHeight - 55 : Math.max(insets.bottom - 55, 0)),
		[kbHeight, insets.bottom],
	);

	const listBottomPadding = useMemo(
		() => (kbHeight > 0 ? 8 : inputBarH + 8),
		[kbHeight, inputBarH],
	);

	const handleSend = () => {
		if (!commentText.trim()) return;
		console.log("Commentaire:", commentText);
		setCommentText("");
		Keyboard.dismiss();
	};

	return (
		<View className="flex-1 bg-[#181818] w-full">
			<View className="flex flex-row justify-between px-1 pt-2">
				<View className="flex flex-row gap-4 items-start">
					<Button className="w-12 h-12 rounded-full bg-white flex items-center justify-center mt-1">
						<LucidePlay color="#181818" fill="#181818" />
					</Button>
					<View>
						<Text
							className="text-white text-2xl font-extrabold"
							style={{ fontFamily: "Jakarta" }}
						>
							{music.title}
						</Text>
						<Text
							className="text-white text-lg font-medium"
							style={{ fontFamily: "Jakarta" }}
						>
							{music.artist}
						</Text>
					</View>
				</View>
				<View className="flex justify-end">
					<Text
						className="text-white font-medium text-lg"
						style={{ fontFamily: "Jakarta" }}
					>
						{getYearFromDate(music.release_date)}
					</Text>
				</View>
			</View>

			{/* ACTIONS */}
			<View className="flex flex-row gap-[4.5rem] mx-auto my-4">
				<Pressable>
					<Heart color={"#8D8D8D"} />
				</Pressable>
				<Pressable>
					<MessageSquarePlusIcon color={"#8D8D8D"} />
				</Pressable>
				<Pressable>
					<BookmarkIcon color={"#8D8D8D"} />
				</Pressable>
				<Pressable>
					<CircleAlert color={"#8D8D8D"} />
				</Pressable>
			</View>

			<View className="h-[500px] overflow-hidden">
				<FlashList<IComment>
					ref={listRef}
					data={comments?.comments ?? []}
					renderItem={({ item }) => <Commentary key={item.id} comment={item} />}
					estimatedItemSize={60}
					contentContainerStyle={{
						paddingLeft: 6,
						paddingRight: 6,
						paddingTop: 8,
						paddingBottom: listBottomPadding,
					}}
					onScrollBeginDrag={Keyboard.dismiss}
					keyboardDismissMode="on-drag"
					ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
					keyboardShouldPersistTaps="handled"
					showsVerticalScrollIndicator={false}
				/>
			</View>

			<View
				className="bg-[#181818] border-t border-[#333]"
				style={{
					position: "absolute",
					left: 0,
					right: 0,
					bottom: inputBottom,
					zIndex: 50,
					elevation: 50,
				}}
				onLayout={(e) => setInputBarH(e.nativeEvent.layout.height)}
			>
				<View className="w-full flex flex-row items-center gap-4 px-2 py-2">
					<Avatar alt="User avatar">
						<AvatarImage source={{ uri: "https://github.com/shadcn.png" }} />
						<AvatarFallback>
							<Text>Avatar</Text>
						</AvatarFallback>
					</Avatar>
					<Pressable
						className="flex-1"
						onPress={() => inputRef.current?.focus()}
					>
						<Input
							ref={inputRef as any}
							placeholder="Écrire un commentaire…"
							returnKeyType="send"
							value={commentText}
							onChangeText={setCommentText}
							onSubmitEditing={handleSend}
						/>
					</Pressable>
					<View className={"flex items-center justify-center"}>
						<TouchableButton
							className={"w-[18px] h-[18px] bg-[#181818]"}
							size={"icon"}
							icon={
								<Send
									size={20}
									color={commentText.trim() ? "#fff" : "#8D8D8D"}
								/>
							}
							onPress={handleSend}
						/>
					</View>
				</View>
			</View>
		</View>
	);
}
