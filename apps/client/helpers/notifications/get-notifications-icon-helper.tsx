import {
	AtSign,
	Heart,
	Mail,
	MessageSquare,
	Reply,
	UserPlus,
} from "lucide-react-native";
import React from "react";

export function getNotificationIcon(type: string, color = "white", size = 16) {
	switch (type) {
		case "post_comment":
			return <MessageSquare color={color} size={size} />;
		case "post_like":
			return <Heart color={color} size={size} />;
		case "comment_reply":
			return <Reply color={color} size={size} />;
		case "mention":
			return <AtSign color={color} size={size} />;
		case "follow":
			return <UserPlus color={color} size={size} />;
		case "message":
			return <Mail color={color} size={size} />;
		default:
			return null;
	}
}
