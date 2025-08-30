import RegisterProgress from "@/app/(auth)/(signup)/_components/register-progress";
import { MainView } from "@/components/ui/MainView";
import { Stack } from "expo-router";

export default function SignUpLayout() {
	return (
		<MainView safeArea={true} disableTouchableWrapper={false}>
			<RegisterProgress />
			<Stack screenOptions={{ headerShown: false, animation: "none" }}>
				<Stack.Screen name="phone" />
				<Stack.Screen name="phone-confirmation" />
				<Stack.Screen name="email" />
				<Stack.Screen name="email-confirmation" />
				<Stack.Screen name="names" />
			</Stack>
		</MainView>
	);
}
