import { useFocusEffect } from "expo-router";
import {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withTiming,
} from "react-native-reanimated";

export const useFadeInScale = ({
	duration,
	delay,
}: { duration?: number; delay?: number }) => {
	const opacity = useSharedValue(0);
	const scale = useSharedValue(0.7);

	const animatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
		transform: [{ scale: scale.value }],
	}));

	useFocusEffect(() => {
		opacity.value = withDelay(
			delay,
			withTiming(1, { duration, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }),
		);

		scale.value = withDelay(
			delay,
			withTiming(1, { duration, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }),
		);
	});

	return animatedStyle;
};
