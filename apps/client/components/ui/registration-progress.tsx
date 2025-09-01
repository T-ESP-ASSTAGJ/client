import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	Easing,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface RegistrationProgressProps {
	currentStep: number;
	totalSteps: number;
}

export default function RegistrationProgress({
	currentStep,
	totalSteps,
}: RegistrationProgressProps) {
	const insets = useSafeAreaInsets();
	const progress = useSharedValue(0);
	const targetProgress = (currentStep / totalSteps) * 100;

	useEffect(() => {
		progress.value = withTiming(targetProgress, {
			duration: 800,
			easing: Easing.out(Easing.cubic),
		});
	}, [currentStep, totalSteps, targetProgress]);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			width: `${progress.value}%`,
		};
	});

	return (
		<View className="w-full px-6 pb-4" style={{ paddingTop: insets.top + 16 }}>
			<View className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
				<Animated.View
					className="h-full rounded-full bg-blue-500"
					style={animatedStyle}
				/>
			</View>
		</View>
	);
}
