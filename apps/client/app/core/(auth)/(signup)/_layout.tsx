import RegisterFooter from "@/app/core/(auth)/(signup)/_components/register-footer";
import RegisterProgress from "@/app/core/(auth)/(signup)/_components/register-progress";
import { MainView } from "@/components/ui/MainView";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function SignUpLayout() {
	return (
		<MainView safeArea={true} disableTouchableWrapper={false}>
			<RegisterProgress />

			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="phone" />
				<Stack.Screen name="phone-confirmation" />
				<Stack.Screen name="email" />
				<Stack.Screen name="email-confirmation" />
				<Stack.Screen name="username" />
			</Stack>

			<View className={"mb-6 w-full gap-y-4 p-4 px-6"}>
				<RegisterFooter />
			</View>
		</MainView>
	);
}
