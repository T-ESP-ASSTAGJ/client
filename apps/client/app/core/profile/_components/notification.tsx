import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/rnr-ui/avatar";
import { fontFamily } from "@/dimensions/font-family";
import { timeAgoFullString } from "@/helpers/format-date-helper";
import { formatNotificationMessage } from "@/helpers/notifications/format-notification-helper";
import { getNotificationIcon } from "@/helpers/notifications/get-notifications-icon-helper";
import type { INotification } from "@/types/notifications/notification.types";
import { Image } from "expo-image";
import { Text, View } from "react-native";

interface NotificationProps {
	notification: INotification;
}

export default function Notification({ notification }: NotificationProps) {
	const { username, action, subtitle } =
		formatNotificationMessage(notification);

	const Icon = getNotificationIcon(notification.target_type);

	return (
		<View className={"flex flex-row gap-3 w-[300px]"}>
			<View>
				{notification.target_type === "follow" ? (
					<Avatar
						alt={"User avatar"}
						style={{
							width: 53,
							height: 53,
						}}
					>
						<AvatarImage
							source={{ uri: notification.preview_image }}
							style={{
								width: 53,
								height: 53,
							}}
						/>
						<AvatarFallback>
							<Text style={{ fontFamily: fontFamily.regular }}>Avatar</Text>
						</AvatarFallback>
					</Avatar>
				) : (
					<>
						<Image
							source={{ uri: notification.preview_image }}
							alt="photo"
							style={{ width: 51, height: 51, borderRadius: 6 }}
						/>
						{Icon && (
							<View
								style={{
									position: "absolute",
									bottom: -6,
									right: -4,
									backgroundColor: "black",
									borderRadius: 12,
									padding: 4,
								}}
							>
								{Icon}
							</View>
						)}
					</>
				)}
			</View>
			<View className={"flex flex-col gap-1 w-full"}>
				<View className={"flex flex-col"}>
					{notification.target_type === "message" ? (
						<View className={"flex flex-row flex-wrap"}>
							<Text
								className="text-white font-light"
								style={{ fontFamily: fontFamily.regular }}
							>
								{" "}
								{action}
							</Text>
							<Text
								className="text-white"
								numberOfLines={1}
								ellipsizeMode="tail"
								style={{ maxWidth: 150, fontFamily: fontFamily.semibold }}
							>
								{username}
							</Text>
						</View>
					) : (
						<View className={"flex flex-row flex-wrap"}>
							<Text
								className="text-white font-bold"
								numberOfLines={1}
								ellipsizeMode="tail"
								style={{ maxWidth: 150, fontFamily: fontFamily.semibold }}
							>
								{username}
							</Text>
							<Text
								className="text-white font-light"
								style={{ fontFamily: fontFamily.regular }}
							>
								{action}
							</Text>
						</View>
					)}
				</View>
				<Text
					className="text-white text-sm font-light"
					numberOfLines={2}
					ellipsizeMode={"tail"}
					style={{ fontFamily: fontFamily.regular }}
				>
					{subtitle}
				</Text>
				<Text
					className={"text-sm text-gray-400"}
					style={{ fontFamily: fontFamily.regular }}
				>
					{timeAgoFullString(notification.created_at)} ago
				</Text>
			</View>
		</View>
	);
}
