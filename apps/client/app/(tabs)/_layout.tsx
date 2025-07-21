import TabBar from "@/components/tabs/tab-bar";
import Tabs from "@/components/ui/Tabs";
import { Text, View } from "react-native";

export default function Layout() {
	return (
		<View className={"flex flex-1 bg-[#121213]"}>
			<Tabs tabBar={(props) => <TabBar {...props} />}>
				<Tabs.Screen name="home" />
				<Tabs.Screen name="profile" />
			</Tabs>
		</View>
	);
}
