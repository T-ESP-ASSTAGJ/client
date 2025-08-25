import { IPost } from "@/app/(tabs)/home/_types/post.types";
import {View} from "react-native";
import PostHeader from "@/app/(tabs)/home/_components/post/post-header";
import PostFooter from "@/app/(tabs)/home/_components/post/post-footer";
import PostBody from "@/app/(tabs)/home/_components/post/post-body";

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