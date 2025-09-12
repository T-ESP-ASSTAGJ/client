import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/rnr-ui/avatar";
import { timeAgo } from "@/helpers/format-date-helper";
import type { IComment } from "@/types/Comment/comment.types";
import { Heart, LucideThumbsUp as ThumbUp } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

interface CommentaryProps {
	comment: IComment;
}

export default function Commentary({ comment }: CommentaryProps) {
	return (
		<View className={"flex flex-row gap-5 max-h-[10rem]"}>
			<Avatar alt={"User avatar"}>
				<AvatarImage source={{ uri: comment.author.profile_picture }} />
				<AvatarFallback>
					<Text>Avatar</Text>
				</AvatarFallback>
			</Avatar>
			<View className={"flex flex-col gap-2"}>
				<Text className={"font-semibold text-lg text-white"}>
					{comment.author.username}
				</Text>
				<Text className={"text-white max-w-[20rem]"}>{comment.content}</Text>
				<View className={"flex flex-row justify-between w-[310px]"}>
					<View className={"flex flex-row gap-2"}>
						<Text
							className={"text-white font-extralight"}
							style={{ fontFamily: "Jakarta" }}
						>
							{timeAgo(comment.created_at)}
						</Text>
						<Pressable>
							<Text
								className={"text-white font-semibold"}
								style={{ fontFamily: "Jakarta" }}
							>
								Answer
							</Text>
						</Pressable>
					</View>
					<ThumbUp
						className={"items-center justify-center"}
						color="#8D8D8D"
						size={14}
					/>
				</View>
			</View>
		</View>
	);
}
