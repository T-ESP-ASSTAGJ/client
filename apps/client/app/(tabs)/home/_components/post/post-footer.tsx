import type { IMusic, IStats } from "@/app/(tabs)/home/_types/post.types";
import { getYearFromDate } from "@/helpers/format-date-helper";
import {
	Dot,
	MessageCircle,
	LucideThumbsUp as ThumbUp,
} from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

type PostFooterProps = {
	music: IMusic;
	stats: IStats;
};

export default function PostFooter({ music, stats }: PostFooterProps) {
	return (
		<Pressable className={"flex flex-col"}>
			<View className="flex flex-row items-center justify-between pt-2.5 pr-1 pl-1">
				<View className="flex flex-row items-center">
					<Text className="items-center pb-1 font-semibold text-2xl text-white">
						{music.artist}
					</Text>
					<Dot className={"items-center"} color="white" size={30} />
					<Text className="font-medium text-white">{music.title}</Text>
				</View>

				<Text className="text-muted-foreground">
					{getYearFromDate(music.release_date)}
				</Text>
			</View>
			<View>
				<View
					className={"flex flex-row items-center gap-2 pt-3 pr-1 pb-5 pl-1"}
				>
					<View className={"flex flex-row items-center gap-2"}>
						<ThumbUp color="#8D8D8D" size={14} />
						<Text className="text-muted-foreground text-sm">{stats.likes}</Text>
					</View>
					<View className={"flex flex-row items-center gap-2"}>
						<MessageCircle color="#8D8D8D" size={14} />
						<Text className="text-muted-foreground text-sm">
							{stats.comments}
						</Text>
					</View>
				</View>
			</View>
		</Pressable>
	);
}
