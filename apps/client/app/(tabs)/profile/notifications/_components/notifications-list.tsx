import Notification from "@/app/(tabs)/profile/notifications/_components/notification";
import { mock_notifications_response } from "@/mock-data/notification";
import type {
	INotification,
	INotificationsResponse,
} from "@/types/profile/notifications/notification.types";
import { FlashList } from "@shopify/flash-list";
import React, { useEffect, useMemo, useState } from "react";
import { View } from "react-native";

export default function NotificationsList() {
	const [notifications, setNotifications] = useState<INotificationsResponse>({
		notifications: [],
		total_notifications: 0,
		unread_count: 0,
	});

	useEffect(() => {
		setNotifications(mock_notifications_response);
	}, []);

	return (
		<View className={"mx-5 flex flex-col gap-2"}>
			<View className={"h-full w-[400px] overflow-hidden pt-6 pb-24"}>
				<FlashList<INotification>
					data={notifications.notifications}
					numColumns={1}
					renderItem={({ item }) => <Notification notification={item} />}
					estimatedItemSize={60}
					ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
					showsVerticalScrollIndicator={false}
				/>
			</View>
		</View>
	);
}
