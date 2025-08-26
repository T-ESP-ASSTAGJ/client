import { TouchableButton } from "@/components/ui/touchable-button";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	interpolate,
	withTiming,
} from "react-native-reanimated";

export default function HeaderTabs() {
	const [index, setIndex] = useState<0 | 1>(0);
	const progress = useSharedValue(index);

	// update anim quand index change
	React.useEffect(() => {
		progress.value = withTiming(index);
	}, [index]);

	const indicatorStyle = useAnimatedStyle(() => ({
		transform: [
			{
				translateX: interpolate(progress.value, [0, 1], [0, 100]), // 100px = largeur d’un onglet
			},
		],
	}));

	return (
		<View className="h-12 flex-row items-center justify-center">
			<TouchableButton
				sensory={"light"}
				content={"Friends"}
				className={"w-[100px] gap-y-1 bg-transparent"}
				onPress={() => {
					setIndex(0);
				}}
			>
				<Text
					className={`text-center text-lg tracking-wider ${index === 0 ? "font-semibold text-white" : "font-medium text-muted-foreground"}`}
				>
					Friends
				</Text>
			</TouchableButton>

			<TouchableButton
				sensory={"light"}
				content={"Discover"}
				className={"w-[100px] gap-y-1 bg-transparent"}
				onPress={() => {
					setIndex(1);
				}}
			>
				<Text
					className={`text-center text-lg tracking-wider ${index === 1 ? "font-semibold text-white" : "font-medium text-muted-foreground"}`}
				>
					Discover
				</Text>
			</TouchableButton>

			<Animated.View
				className="absolute bottom-0.5 h-[2.5px] rounded bg-white"
				style={[{ width: 30, left: 34 }, indicatorStyle]}
			/>
		</View>
	);
}
