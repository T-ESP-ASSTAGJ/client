import { IPost } from "@/types/posts/post";
import {Text, View} from "react-native";
import {Image} from "expo-image";
import PostHeader from "@/app/(tabs)/home/_components/post-header";
import PostFooter from "@/app/(tabs)/home/_components/post-footer";
import PostBody from "@/app/(tabs)/home/_components/post-body";

type PostProps = {
    post: IPost;
};

export default function Post({ post }: PostProps) {
    return (
        <>
            <View className={"flex flex-col gap-2"}>
                <View>
                    <PostHeader
                        user_post={post.user_post}
                        created_at={post.created_at}
                        location={post.location}
                    />
                    <PostBody
                        music={post.music}
                        photo={post.photo}
                    />
                </View>
                <PostFooter
                    music={post.music}
                    stats={post.stats}
                />
            </View>
        </>
    )
}