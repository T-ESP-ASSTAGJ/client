import { Stack, useRouter } from "expo-router";

export default function AccountLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="profile" />
			<Stack.Screen name="notifications" />
			<Stack.Screen name="preferences" />
		</Stack>
	);
}
