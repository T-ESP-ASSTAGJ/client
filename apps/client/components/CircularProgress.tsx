import { IconSymbol } from "@/components/ui/IconSymbol";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

const CircularProgress = ({ percentage = 0, size = 40, strokeWidth = 5 }) => {
	const radius = (size - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;
	const strokeDashoffset = circumference - (percentage / 100) * circumference;

	return (
		<View
			style={{
				width: size,
				height: size,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{percentage === 100 ? (
				<View
					className={
						"flex size-full items-center justify-center rounded-full bg-[#fbbf24]"
					}
				>
					<IconSymbol
						name={"checkmark"}
						color={"white"}
						size={20}
						weight={"bold"}
					/>
				</View>
			) : (
				<Svg width={size} height={size}>
					<Circle
						stroke="#E7E7E7"
						fill="none"
						cx={size / 2}
						cy={size / 2}
						r={radius}
						strokeWidth={strokeWidth}
					/>
					<Circle
						stroke="#fbbf24" // orange
						fill="none"
						cx={size / 2}
						cy={size / 2}
						r={radius}
						strokeWidth={strokeWidth}
						strokeDasharray={`${circumference} ${circumference}`}
						strokeDashoffset={strokeDashoffset}
						strokeLinecap="round"
						rotation="-90"
						origin={`${size / 2}, ${size / 2}`}
					/>
				</Svg>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	question: {
		position: "absolute",
		fontSize: 16,
		color: "#888",
		fontWeight: "600",
	},
});

export default CircularProgress;
