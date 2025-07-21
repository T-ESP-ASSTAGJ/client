import AccountIcon from "@/assets/svg/tab-icons/account-icon.svg";
import HomeIcon from "@/assets/svg/tab-icons/home-icon.svg";
import MoodIcon from "@/assets/svg/tab-icons/mood-icon.svg";
import ReportIcon from "@/assets/svg/tab-icons/report-icon.svg";
import * as Haptics from "expo-haptics";
import type React from "react";
import { useEffect, useState } from "react";
import { Pressable, type PressableProps, StyleSheet, Text } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	interpolate,
	withTiming,
} from "react-native-reanimated";

interface TabBarButtonProps extends PressableProps {
	isFocused: boolean;
	label: string;
	routeName: string;
}

const TabBarButton: React.FC<TabBarButtonProps> = (props) => {
	/*const { user } = useUserStore();*/
	const { isFocused, label, routeName, ...rest } = props;

	// Valeur partagée pour l'animation
	const scale = useSharedValue(0);

	// Mettre à jour la valeur lors du changement de focus
	useEffect(() => {
		scale.value = withTiming(isFocused ? 1 : 0, { duration: 350 });
	}, [scale, isFocused]);

	// Style animé pour le background
	const animatedBgStyle = useAnimatedStyle(() => {
		return {
			position: "absolute",
			width: 75,
			height: 55,
			borderRadius: 12,
			backgroundColor: "#FFFFFF",
			opacity: scale.value,
			zIndex: -1,
		};
	});

	// Style animé pour l'icône
	const animatedIconStyle = useAnimatedStyle(() => {
		const scaleValue = interpolate(
			scale.value,
			[0, 1],
			[1, 1.1], // Légère augmentation de la taille de l'icône
		);

		return {
			transform: [{ scale: scaleValue }],
		};
	});

	// Déterminer quelle icône afficher en fonction du routeName
	const renderIcon = () => {
		const color = isFocused ? "#6C5F54" : "#C9C8C9";
		const size = 24;

		switch (routeName) {
			case "home":
				return <HomeIcon width={size} height={size} color={color} />;
			case "profile":
				return <AccountIcon width={size} height={size} color={color} />;
			default:
				return <HomeIcon width={size} height={size} color={color} />;
		}
	};

	const [buttonIsPressed, setButtonIsPressed] = useState(false);

	return (
		<Pressable
			{...rest}
			style={styles.container}
			className={`transition-all duration-300 ${buttonIsPressed ? "scale-90" : "scale-100"}`}
			onPressIn={() => {
				/*if(user?.preferences?.haptic_touch) {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }*/
				setButtonIsPressed(true);
			}}
			onPressOut={() => setButtonIsPressed(false)}
		>
			{/* Background animé */}
			{/*<Animated.View style={routeName !== "create" && animatedBgStyle} />*/}
			<Animated.View style={animatedBgStyle} />

			{/* Icône animée */}
			<Animated.View style={animatedIconStyle}>{renderIcon()}</Animated.View>

			{/* Label */}
			<Text
				className={`text-center font-semibold text-[12px] ${isFocused ? "text-primary" : "text-[#C9C8C9]"}`}
			>
				{label}
			</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		gap: 4,
		paddingVertical: 10,
	},
});

export default TabBarButton;
