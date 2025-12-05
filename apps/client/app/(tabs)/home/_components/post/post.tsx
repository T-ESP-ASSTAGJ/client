import PostBody from "@/app/(tabs)/home/_components/post/post-body";
import PostFooter from "@/app/(tabs)/home/_components/post/post-footer";
import PostHeader from "@/app/(tabs)/home/_components/post/post-header";
import type { ICommentResponse } from "@/types/comments/comment.types";
import type { IPost } from "@/types/post/post.types";
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
						user={post.user}
						created_at={"22/11/2025"}
						location={post.location}
					/>
					<PostBody postId={post.id} music={post.music} photo={post.photo} />
				</View>
				<PostFooter music={post.music} stats={post.stats} comments={comments} />
			</View>
		</>
	);
}
