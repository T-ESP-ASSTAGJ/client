import PostBody from "@/app/(tabs)/home/_components/post/post-body";
import PostFooter from "@/app/(tabs)/home/_components/post/post-footer";
import PostHeader from "@/app/(tabs)/home/_components/post/post-header";
import type { IPost } from "@/app/(tabs)/home/_types/post.types";
import type { ICommentResponse } from "@/types/Comment/comment.types";
import { View } from "react-native";

type PostProps = {
	post: IPost;
	comments: ICommentResponse;
};

export default function Post({ post, comments }: PostProps) {
	return (
		<>
			<View className={"flex flex-col gap-2"}>
				<View>
					<PostHeader
						user_post={post.user_post}
						created_at={post.created_at}
						location={post.location}
					/>
					<PostBody music={post.music} photo={post.photo} />
				</View>
				<PostFooter music={post.music} stats={post.stats} comments={comments} />
			</View>
		</>
	);
}
