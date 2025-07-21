import { MainView } from "@/components/ui/MainView";
import { useUserStore } from "@/stores/use-user-store";
import { useState } from "react";

export default function HomePage() {
	const [isRefreshing, setIsRefreshing] = useState(false);

	const { user } = useUserStore();

	return (
		<MainView disableTouchableWrapper>
			<></>
		</MainView>
	);
}
