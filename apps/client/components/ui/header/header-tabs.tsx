import { TouchableButton } from "@/components/ui/touchable-button";
import { fontFamily } from "@/dimensions/font-family";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	interpolate,
	withTiming,
} from "react-native-reanimated";

export default function HeaderTabs() {
	const [index, setIndex] = useState<0 | 1>(1);
	const progress = useSharedValue(index);

	// update anim quand index change
	React.useEffect(() => {
		progress.value = withTiming(index);
	}, [index]);

	const indicatorStyle = useAnimatedStyle(() => ({
		transform: [
			{
				translateX: interpolate(progress.value, [0, 1], [0, 112]), // 100px = largeur d’un onglet
			},
		],
	}));

	return (
		<View className="h-12 flex flex-row items-center justify-center">
			<TouchableButton
				sensory={"light"}
				className={"w-[112px]"}
				variant={"transparent"}
				onPress={() => {
					setIndex(0);
				}}
			>
				<Text
					key={"Friends"}
					className={`text-lg duration-200 transition-colors ${index === 0 ? "text-white" : "text-muted"}`}
					style={{ fontFamily: fontFamily.bold }}
				>
					Friends
				</Text>
			</TouchableButton>

			<TouchableButton
				sensory={"light"}
				className={"w-[112px]"}
				variant={"transparent"}
				onPress={() => {
					setIndex(1);
				}}
			>
				<Text
					key={"Discover"}
					className={`text-lg duration-200 transition-colors ${index === 1 ? "text-white" : "text-muted"}`}
					style={{ fontFamily: fontFamily.bold }}
				>
					Discover
				</Text>
			</TouchableButton>

			<Animated.View
				className="absolute bottom-0.5 h-[2.5px] rounded bg-white"
				style={[{ width: 35, left: 37 }, indicatorStyle]}
			/>
		</View>
	);
}
