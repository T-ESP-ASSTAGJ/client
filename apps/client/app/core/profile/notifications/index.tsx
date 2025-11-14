import NotificationsList from "@/app/core/profile/_components/notifications-list";
import { MainView } from "@/components/ui/MainView";
import { Header } from "@/components/ui/header/header";

export default function FriendsPage() {
	return (
		<MainView disableTouchableWrapper>
			<Header title={"Notifications"} backButton />

			<NotificationsList />
		</MainView>
	);
}
