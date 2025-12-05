import FollowersList from "@/app/(tabs)/profile/_components/followers/followers-list";
import { MainView } from "@/components/ui/MainView";
import { Header } from "@/components/ui/header/header";

export default function Followers() {
	return (
		<MainView disableTouchableWrapper>
			<Header title={"Followers"} backButton />

			<FollowersList />
		</MainView>
	);
}
