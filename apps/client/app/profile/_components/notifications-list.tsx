import Notification from "@/app/profile/_components/notification";
import { MainView } from "@/components/ui/MainView";
import { Header } from "@/components/ui/header/header";
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
