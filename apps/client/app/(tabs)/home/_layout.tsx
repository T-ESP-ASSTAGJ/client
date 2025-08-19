import { IconSymbol } from "@/components/ui/IconSymbol";
import { TouchableButton } from "@/components/ui/touchable-button";
import { Stack, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Alert, Text, View } from "react-native";

export default function Layout() {
	const router = useRouter();

	return (
		<>
            <Stack
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name="index" />
			</Stack>
		</>
	);
}
