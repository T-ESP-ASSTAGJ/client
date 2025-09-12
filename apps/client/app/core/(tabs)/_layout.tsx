import TabBar from "@/components/tabs/tab-bar";
import Tabs from "@/components/ui/Tabs";
import { Text, View } from "react-native";

export default function Layout() {
	return (
		<View className={"flex flex-1"}>
			<Tabs tabBar={(props) => <TabBar {...props} />}>
				<Tabs.Screen name="home" />
				<Tabs.Screen name="explore" />
				<Tabs.Screen name="friends" />
				<Tabs.Screen name="chats" />
				{/*<Tabs.Screen name="profile" />*/}
			</Tabs>
		</View>
	);
}
