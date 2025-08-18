import { MainView } from "@/components/ui/MainView";
import { useUserStore } from "@/stores/use-user-store";
import { useState } from "react";
import { Text, View } from "react-native";

export default function HomePage() {
	const [isRefreshing, setIsRefreshing] = useState(false);

	const { user } = useUserStore();

	return (
		<MainView disableTouchableWrapper>
			<View>
				<Text>Home</Text>
			</View>
		</MainView>
	);
}
