import { Header } from "@/components/ui/header/header";
import { Stack } from "expo-router";

export default function Layout() {
	return (
		<>
			<Header backButton />
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="index" />
			</Stack>
		</>
	);
}
