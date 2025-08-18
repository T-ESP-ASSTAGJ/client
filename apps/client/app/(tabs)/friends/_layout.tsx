import { Stack } from "expo-router";
import { Text, View } from "react-native";

export default function Layout() {
	return (
		<>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="index" />
			</Stack>
		</>
	);
}
