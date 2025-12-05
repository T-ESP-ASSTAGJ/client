import { Stack } from "expo-router";

export default function ProfileLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index" />
			<Stack.Screen name="personal-info" />
			<Stack.Screen name="preferences" />
			<Stack.Screen name="notifications/index" />
		</Stack>
	);
}
