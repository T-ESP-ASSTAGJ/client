import {IMusic, IStats} from "@/app/(tabs)/home/_types/post.types";
import {Text, View} from "react-native";
import {Dot, LucideThumbsUp as ThumbUp, MessageCircle} from "lucide-react-native";
import {getYearFromDate} from "@/helpers/format-date-helper";

type PostFooterProps = {
    music: IMusic,
    stats: IStats
}

export default function PostFooter({ music, stats }: PostFooterProps) {
    return (
        <>
            <View className={"flex flex-col"}>
                <View className="flex flex-row justify-between items-center pt-2.5 pl-5 pr-5">
                    <View className="flex flex-row items-center">
                        <Text className="text-2xl font-semibold text-white items-center pb-1">
                            {music.artist}
                        </Text>
                        <Dot
                            className={"items-center"}
                            color="white"
                            size={30}
                        />
                        <Text className="font-medium text-white">
                            {music.title}
                        </Text>
                    </View>

                    <Text className="text-muted-foreground">
                        {getYearFromDate(music.release_date)}
                    </Text>
                </View>
                <View>
                    <View className={"flex flex-row gap-2 items-center pl-5 pr-5 pt-3 pb-5"}>
                        <View className={"flex flex-row gap-2 items-center"}>
                            <ThumbUp
                                color="#8D8D8D"
                                size={14}
                            />
                            <Text className="text-muted-foreground text-sm">
                                {stats.likes}
                            </Text>
                        </View>
                        <View className={"flex flex-row gap-2 items-center"}>
                            <MessageCircle
                                color="#8D8D8D"
                                size={14}
                            />
                            <Text className="text-muted-foreground text-sm">
                                {stats.comments}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </>
    )
}