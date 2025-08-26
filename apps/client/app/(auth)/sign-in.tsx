import { Button } from "@/components/rnr-ui/button";
import { Text } from "@/components/rnr-ui/text";
import { MainView } from "@/components/ui/MainView";
import { Link, router } from "expo-router";
import { View } from "react-native";

export default function AuthPage() {
	return (
		<MainView disableTouchableWrapper>
			<View className={"mx-12 flex h-full items-center justify-between py-12"}>
				<View className={"h-1/2"} />
				<View className={"flex items-start gap-y-6 border"}>
					<Text className={"text-4xl"}>Welcome to JAMLY</Text>
					<Text className={"text-xl"}>
						Explore your friends' new musical discoveries, and share your mood
						with them.
					</Text>
				</View>
				<View className={"w-full items-center"}>
					<Button
						onPress={() => router.navigate("/(auth)/(signup)/phone")}
						className="w-full"
						variant="default"
					>
						<Text>{"Join us!"}</Text>
					</Button>
					<View className="my-4 flex flex-row items-center">
						<Text>{"Already with us?"}</Text>
						<Link
							className={"ml-2 font-semibold underline"}
							href={"/(auth)/login"}
						>
							{"Login"}
						</Link>
					</View>
				</View>
			</View>
		</MainView>
	);
}
