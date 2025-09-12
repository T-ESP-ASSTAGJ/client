export type NotificationType =
	| "message"
	| "post_comment"
	| "post_like"
	| "follow";

export interface INotification {
	id: number;
	recipient_id: number;
	sender_id: number;
	sender_username: string;
	preview_image: string | null;
	target_type: NotificationType;
	target_id: number;
	content?: string;
	is_read: boolean;
	created_at: string;
}

export interface INotificationsResponse {
	notifications: INotification[];
	total_notifications: number;
	unread_count?: number;
}
