import React from "react";
import {
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	useWindowDimensions,
} from "react-native";
import Animated, {
	useAnimatedStyle,
	withTiming,
} from "react-native-reanimated";

type SegmentedControlProps = {
	options: string[];
	selectedOption: string;
	onOptionPress?: (option: string) => void;
};

const SegmentedControl: React.FC<SegmentedControlProps> = React.memo(
	({ options, selectedOption, onOptionPress }) => {
		const { width: windowWidth } = useWindowDimensions();

		// Suppression du padding interne
		const segmentedControlWidth = windowWidth - 40; // Garde seulement le padding externe de l'écran

		const itemWidth = segmentedControlWidth / options.length;

		const rStyle = useAnimatedStyle(() => {
			return {
				left: withTiming(itemWidth * options.indexOf(selectedOption)),
			};
		}, [selectedOption, options, itemWidth]);

		return (
			<View
				style={[
					styles.container,
					{
						width: segmentedControlWidth,
						borderRadius: 10,
					},
				]}
			>
				<Animated.View
					style={[
						{
							width: itemWidth,
						},
						rStyle,
						styles.activeBox,
					]}
				/>
				{options.map((option) => {
					return (
						<Pressable
							onPress={() => {
								onOptionPress?.(option);
							}}
							key={option}
							style={[
								{
									width: itemWidth,
								},
								styles.labelContainer,
							]}
						>
							<Text
								className={`text-lg transition-colors delay-150 duration-300 ${option === selectedOption ? "text-white" : "text-foreground"}`}
								style={{ fontFamily: "Urbanist-semibold" }}
							>
								{option}
							</Text>
						</Pressable>
					);
				})}
			</View>
		);
	},
);

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		height: 45,
		backgroundColor: "#FFFFFF",
	},
	activeBox: {
		position: "absolute",
		borderRadius: 10,
		shadowColor: "black",
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.1,
		elevation: 3,
		height: "100%",
		backgroundColor: "#6C5F54",
	},
	labelContainer: { justifyContent: "center", alignItems: "center" },
});

export { SegmentedControl };
