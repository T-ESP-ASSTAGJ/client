import { Button } from "@/components/rnr-ui/button";
import { Text } from "@/components/rnr-ui/text";
import { MainView } from "@/components/ui/MainView";
import { TouchableButton } from "@/components/ui/touchable-button";
import { useRegistrationStore } from "@/stores/use-registry-store";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import { View } from "react-native";
import {fontFamily} from "@/dimensions/font-family";

export default function AuthPage() {
	const { getCurrentStep } = useRegistrationStore();
	function onPress() {
		const currentStep = getCurrentStep();
		if (!currentStep) return;
		router.push(currentStep);
	}

	return (
		<MainView disableTouchableWrapper safeArea={false} className={"pt-0"}>
			<View className="relative h-screen">
				<View className={"h-2/3 items-center justify-end"}>
					<View className={"absolute top-0 h-full w-screen"}>
						<Image
							source={require("@/assets/images/branding/branding-background.png")}
							className={"h-full w-full rounded-full"}
							contentFit={"cover"}
							style={{ height: "100%", width: "100%" }}
						/>
						<LinearGradient
							colors={["transparent", "transparent", "#090909", "#090909"]}
							locations={[0, 0.5, 0.85, 1]}
							style={{
								position: "absolute",
								bottom: 0,
								left: 0,
								right: 0,
								height: "90%",
							}}
						/>
					</View>
				</View>
				<View
					className={
						"absolute bottom-0 flex h-1/2 w-full items-center justify-between px-10 pb-10"
					}
				>
					<View className={"mt-12 flex items-start gap-y-6"}>
						<View>
							<Text
								className={
									"text-4xl text-primary-foreground tracking-tighter"
								}
                                style={{ fontFamily: fontFamily.semibold }}
							>
								Welcome to
							</Text>
							<Text
								className={
									"-mt-2.5 text-5xl text-primary-foreground tracking-tighter"
								}
                                style={{ fontFamily: fontFamily.extrabold }}
							>
								JAMLY
							</Text>
						</View>
						<Text
							className={"text-secondary text-xl tracking-tight -mt-2.5"}
                            style={{ fontFamily: fontFamily.regular }}
						>
							Explore your friends new musical discoveries, and share your mood
							with them.
						</Text>
					</View>
					<View className={"mb-4 flex w-full items-center justify-end"}>
						<TouchableButton
							variant={"primary"}
							onPress={onPress}
							content={"Join us!"}
						/>
						<View className="my-4 flex flex-row items-center">
							<Text className={"text-primary-foreground"}>
								{"Already with us?"}
							</Text>
							<Link
								className={
									"ml-2 font-semibold text-primary-foreground underline"
								}
								href={"/(auth)/login"}
							>
								{"Login"}
							</Link>
						</View>
					</View>
				</View>
			</View>
		</MainView>
	);
}
