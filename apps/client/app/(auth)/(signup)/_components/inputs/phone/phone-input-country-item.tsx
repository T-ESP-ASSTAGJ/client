import type { Country } from "@/constants/countries";
import { useEffect, useRef } from "react";
import { Animated, Text, TouchableOpacity } from "react-native";

const PhoneInputCountryItem = ({
	item,
	isSelected,
	onPress,
}: {
	item: Country;
	isSelected: boolean;
	onPress: () => void;
}) => {
	const fadeAnim = useRef(new Animated.Value(0)).current;
	const scaleAnim = useRef(new Animated.Value(0.8)).current;

	useEffect(() => {
		Animated.parallel([
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 300,
				useNativeDriver: true,
			}),
			Animated.spring(scaleAnim, {
				toValue: 1,
				tension: 100,
				friction: 8,
				useNativeDriver: true,
			}),
		]).start();
	}, []);

	return (
		<Animated.View
			style={{
				opacity: fadeAnim,
				transform: [{ scale: scaleAnim }],
			}}
		>
			<TouchableOpacity
				className="border-gray-100 border-b px-4 py-6"
				onPress={onPress}
			>
				<Text
					className={`text-lg ${
						isSelected
							? "font-semibold text-blue-500"
							: "font-normal text-black"
					}`}
				>
					{`${item.flag}   ${item.name}  (${item.dialCode})`}
				</Text>
			</TouchableOpacity>
		</Animated.View>
	);
};

export default PhoneInputCountryItem;
