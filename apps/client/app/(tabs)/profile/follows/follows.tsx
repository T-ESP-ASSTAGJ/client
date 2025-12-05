import FollowsList from "@/app/(tabs)/profile/_components/follows/follows-list";
import { MainView } from "@/components/ui/MainView";
import { Header } from "@/components/ui/header/header";

export default function Follows() {
	return (
		<MainView disableTouchableWrapper>
			<Header title={"Follows"} backButton />

			<FollowsList />
		</MainView>
	);
}
