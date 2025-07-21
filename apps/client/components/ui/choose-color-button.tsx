import { IconSymbol } from "@/components/ui/IconSymbol";
import { TouchableButton } from "@/components/ui/touchable-button";
import React, { useEffect } from "react";
import Animated, {
	BounceIn,
	FadeOut,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

export const ChooseColorButton = ({
	color,
	selectedColor,
	setSelectedColor,
}: {
	color: string;
	selectedColor: string;
	setSelectedColor: (color: string) => void;
}) => {
	const scale = useSharedValue(0);

	useEffect(() => {
		if (selectedColor === color) {
			scale.value = withTiming(1, { duration: 300 });
		} else {
			scale.value = 0;
		}
	}, [selectedColor, color]);

	const animStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: scale.value }],
			opacity: scale.value,
		};
	});

	return (
		<TouchableButton
			onPress={() => setSelectedColor(color)}
			sensory={"light"}
			className={`relative flex size-[60px] items-center justify-center rounded-full`}
			style={{ backgroundColor: color }}
		>
			{selectedColor === color && (
				<Animated.View
					className={"flex h-full w-full items-center justify-center"}
					style={[animStyle]}
				>
					<IconSymbol
						name={"checkmark"}
						color={"white"}
						size={25}
						weight={"bold"}
					/>
				</Animated.View>
			)}
		</TouchableButton>
	);
};
