import Notification from "@/app/core/(account)/notifications/_components/notification";
import { fontFamily } from "@/dimensions/font-family";
import { mock_notifications_response } from "@/mock-data/notification";
import type {
	INotification,
	INotificationsResponse,
} from "@/types/notifications/notification.types";
import { FlashList } from "@shopify/flash-list";
import { ChevronLeft, LucideHistory, Sparkles } from "lucide-react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";

export default function NotificationsList() {
	const [notifications, setNotifications] = useState<INotificationsResponse>({
		notifications: [],
		total_notifications: 0,
		unread_count: 0,
	});

	useEffect(() => {
		setNotifications(mock_notifications_response);
	}, []);

	const newNotifications = useMemo(
		() => notifications.notifications.filter((n) => !n.is_read),
		[notifications.notifications],
	);

	const oldNotifications = useMemo(
		() => notifications.notifications.filter((n) => n.is_read),
		[notifications.notifications],
	);

	const headerLeftIcon = <ChevronLeft color={"white"} size={24} />;

	return (
		<View className={"mt-3 mx-5 flex flex-col gap-2"}>
			<View>
				<View className={"flex flex-row gap-2 items-center"}>
					<Sparkles color={"white"} size={20} />
					<Text
						className={"text-white text-xl"}
						style={{ fontFamily: fontFamily.semibold }}
					>
						New
					</Text>
				</View>
				<View className={"h-[320px] w-[400px] overflow-hidden pt-6 pb-4"}>
					<FlashList<INotification>
						data={newNotifications}
						numColumns={1}
						renderItem={({ item }) => <Notification notification={item} />}
						estimatedItemSize={60}
						ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
						showsVerticalScrollIndicator={false}
					/>
				</View>
			</View>
			<View>
				<View className={"flex flex-row gap-2 items-center"}>
					<LucideHistory color={"white"} size={20} />
					<Text
						className={"text-white text-xl"}
						style={{ fontFamily: fontFamily.semibold }}
					>
						History
					</Text>
				</View>
				<View className={"h-[320px] w-[400px] overflow-hidden pt-6 pb-4"}>
					<FlashList<INotification>
						data={oldNotifications}
						numColumns={1}
						renderItem={({ item }) => <Notification notification={item} />}
						estimatedItemSize={60}
						ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
						showsVerticalScrollIndicator={false}
					/>
				</View>
			</View>
		</View>
	);
}
