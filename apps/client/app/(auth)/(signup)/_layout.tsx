import { Header } from "@/components/ui/header";
import RegistrationProgressWrapper from "@/components/ui/registration-progress-wrapper";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function Layout() {
	return (
		<View className="flex-1">
			<RegistrationProgressWrapper />
			<Header backButton />
			<Stack screenOptions={{ headerShown: false, animation: "none" }}>
				<Stack.Screen name="phone" />
				<Stack.Screen name="phone-confirmation" />
				<Stack.Screen name="email" />
				<Stack.Screen name="email-confirmation" />
				<Stack.Screen name="names" />
			</Stack>
		</View>
	);
}
