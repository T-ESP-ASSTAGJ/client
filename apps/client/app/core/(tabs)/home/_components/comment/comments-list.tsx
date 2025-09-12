import Commentary from "@/app/core/(tabs)/home/_components/comment/commentary";
import type { IMusic } from "@/app/core/(tabs)/home/_types/post.types";
import { Button } from "@/components/rnr-ui/button";
import { getYearFromDate } from "@/helpers/format-date-helper";
import type { IComment, ICommentResponse } from "@/types/Comment/comment.types";
import { FlashList } from "@shopify/flash-list";
import {
	BookmarkIcon,
	CircleAlert,
	Heart,
	LucidePlay,
	MessageSquarePlusIcon,
} from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface CommentsProps {
	music: IMusic;
	comments: ICommentResponse;
}

export default function CommentsList({ music, comments }: CommentsProps) {
	return (
		<View className={"flex gap-3"}>
			<View className={"flex flex-row justify-between text-center px-1"}>
				<View className={"flex flex-row gap-4 items-start"}>
					<Button className="w-12 h-12 rounded-full bg-white flex items-center justify-center mt-1">
						<LucidePlay color="#181818" fill="#181818" />
					</Button>

					<View className={"flex flex-col"}>
						<Text
							className={"text-white text-2xl font-extrabold"}
							style={{ fontFamily: "Jakarta" }}
						>
							{music.title}
						</Text>
						<Text
							className={"text-white text-lg font-medium"}
							style={{ fontFamily: "Jakarta" }}
						>
							{music.artist}
						</Text>
					</View>
				</View>
				<View className={"flex justify-end"}>
					<Text
						className={"text-white font-medium text-lg"}
						style={{ fontFamily: "Jakarta" }}
					>
						{getYearFromDate(music.release_date)}
					</Text>
				</View>
			</View>
			<View className={"flex flex-row gap-[4.5rem] mx-auto my-4"}>
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
			<View className={"h-[500px] overflow-hidden"}>
				<FlashList<IComment>
					data={comments?.comments ?? []}
					numColumns={1}
					renderItem={({ item }) => <Commentary key={item.id} comment={item} />}
					estimatedItemSize={60}
					contentContainerStyle={{
						paddingLeft: 6,
						paddingRight: 6,
						paddingTop: 8,
						paddingBottom: 24,
					}}
					nestedScrollEnabled
					ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
					showsVerticalScrollIndicator={false}
				/>
			</View>
		</View>
	);
}
