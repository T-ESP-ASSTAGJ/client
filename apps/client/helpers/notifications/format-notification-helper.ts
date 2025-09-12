import { mock_posts } from "@/mock-data/post";
import type { INotification } from "@/types/notifications/notification.types";

export function formatNotificationMessage(notification: INotification) {
	switch (notification.target_type) {
		case "post_comment":
			return {
				username: notification.sender_username,
				action: " commented on your post",
				subtitle: notification.content,
			};

		case "post_like": {
			const post = mock_posts.find(
				(post) => post.id === notification.target_id,
			);

			return {
				username: notification.sender_username,
				action: " liked your post",
				subtitle: `Your post has been liked ${post.stats.likes} times`,
			};
		}

		case "follow":
			return {
				username: notification.sender_username,
				action: " started following you.",
				subtitle: "He can now see your activities in his feed",
			};

		case "message":
			return {
				username: notification.sender_username,
				action: "New message from ",
				subtitle: notification.content,
			};

		default:
			return {
				title: `${notification.sender_username}`,
				subtitle: notification.content,
			};
	}
}
