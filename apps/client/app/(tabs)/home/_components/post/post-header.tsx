import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/rnr-ui/avatar";
import { formatDate } from "@/helpers/format-date-helper";
import type { IUserPost } from "@/types/post/post.types";
import { Pressable, Text, View } from "react-native";

type PostHeaderProps = {
	user: IUserPost;
	created_at: string;
	location: string;
};

export default function PostHeader({
	user,
	created_at,
	location,
}: PostHeaderProps) {
	return (
		<View className={"flex flex-row justify-between gap-3 pt-5 pr-1 pb-5 pl-1"}>
			<Pressable className={"flex flex-1 flex-row items-center gap-3"}>
				<Avatar alt={"User avatar"} className="w-14 h-14">
					<AvatarImage
						source={{ uri: user.profilePicture }}
						className="w-14 h-14"
					/>
					<AvatarFallback>
						<Text>Avatar</Text>
					</AvatarFallback>
				</Avatar>
				<View className={"flex flex-col gap-2"}>
					<View>
						<Text className={"font-semibold text-lg text-white"}>
							{user.username}
						</Text>
						<Text className={"text-muted-foreground text-sm"}>{location}</Text>
					</View>
				</View>
			</Pressable>
			<View className={"flex justify-end"}>
				<Text className={"text-muted-foreground text-sm"}>
					{formatDate(created_at)}
				</Text>
			</View>
		</View>
	);
}
