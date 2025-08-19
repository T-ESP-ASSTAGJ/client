import {Text, View} from "react-native";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/rnr-ui/avatar";
import {formatDate} from "@/utils/format-date-helper";
import {IUserPost} from "@/types/posts/post";

type PostHeaderProps = {
    user_post: IUserPost,
    created_at: string,
    location: string,
}

export default function PostHeader({ user_post, created_at, location }: PostHeaderProps) {
    return (
        <>
            <View className={"flex flex-row gap-3 p-5 justify-between"}>
                <View className={"flex flex-row gap-3"}>
                    <Avatar alt={"User avatar"}>
                        <AvatarImage source={{ uri: user_post.profile_picture }}/>
                        <AvatarFallback>
                            <Text>Avatar</Text>
                        </AvatarFallback>
                    </Avatar>
                    <View className={"flex flex-col gap-2"}>
                        <View>
                            <Text className={"text-white font-semibold text-lg"}>
                                {user_post.username}
                            </Text>
                            <Text className={"text-muted-foreground text-sm"}>
                                {location}
                            </Text>
                        </View>
                    </View>
                </View>
                <View className={"flex justify-end"}>
                    <Text className={"text-muted-foreground text-sm"}>
                        {formatDate(created_at)}
                    </Text>
                </View>
            </View>
        </>
    )
}