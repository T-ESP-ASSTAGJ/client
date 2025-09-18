import FriendsList from "@/app/core/(tabs)/friends/_components/friends-list";
import { MainView } from "@/components/ui/MainView";
import { Header } from "@/components/ui/header/header";
import { HeaderAuth } from "@/components/ui/header/header-auth";

export default function FriendsPage() {
	return (
		<MainView disableTouchableWrapper>
			<Header title={"Friends"} />
			<FriendsList />
		</MainView>
	);
}
