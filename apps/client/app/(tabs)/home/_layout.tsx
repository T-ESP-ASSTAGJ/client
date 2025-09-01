import { IconSymbol } from "@/components/ui/IconSymbol";
import { TouchableButton } from "@/components/ui/touchable-button";
import { Stack, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Alert, View } from "react-native";

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

			<View className={"absolute right-4 bottom-32 flex flex-row gap-x-4"}>
				<TouchableButton
					sensory={"medium"}
					onPress={() => {
						const debugLog = async () => {
							const access_token =
								await SecureStore.getItemAsync("access_token");
							const refresh_token =
								await SecureStore.getItemAsync("refresh_token");

							Alert.alert("ACCESS TOKEN", access_token);

							console.log("Access token: ", access_token);
							console.log("Refresh token: ", refresh_token);
						};

						debugLog();
					}}
					variant={"icon"}
					icon={<IconSymbol name={"ladybug"} color={"black"} size={24} />}
				/>

				<TouchableButton
					sensory={"medium"}
					onPress={() => {
						/*router.navigate("/(other)/training/create")*/
					}}
					variant={"icon"}
					icon={<IconSymbol name={"plus"} color={"#6C5F54"} size={24} />}
				/>
				<TouchableButton
					sensory={"medium"}
					onPress={() => {
						router.push("/(auth)/branding");
					}}
					variant={"icon"}
					icon={<IconSymbol name={"minus"} color={"#6C5F54"} size={24} />}
				/>
			</View>
		</>
	);
}
