import NotificationsList from "@/app/(tabs)/profile/notifications/_components/notifications-list";
import { MainView } from "@/components/ui/MainView";
import { Header } from "@/components/ui/header/header";

export default function Notifications() {
	return (
		<MainView disableTouchableWrapper>
			<Header title={"Notifications"} backButton />

			<NotificationsList />
		</MainView>
	);
}
