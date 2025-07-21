import { Image } from "expo-image";
import React, { type FC, useEffect } from "react";
import { View } from "react-native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	Easing,
} from "react-native-reanimated";

interface AnimatedImageProps {
	imageSource: string;
}

const AnimatedImage: FC<AnimatedImageProps> = ({ imageSource }) => {
	// Utiliser une valeur partagée pour l'animation
	const translateY = useSharedValue(500); // Commencer en dehors de l'écran (100 unités en dessous)

	// Style animé basé sur la valeur partagée
	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateY: translateY.value }],
		};
	});

	// Déclencher l'animation au montage du composant
	useEffect(() => {
		// Petite temporisation pour s'assurer que le composant est bien monté
		const timeout = setTimeout(() => {
			translateY.value = withTiming(0, {
				duration: 800,
				easing: Easing.out(Easing.cubic),
			});
		}, 100);

		return () => clearTimeout(timeout);
	}, []);

	return (
		<Animated.View
			className={"top-28"}
			style={[
				{
					width: "100%",
					height: "100%",
					position: "absolute",
					alignItems: "center",
				},
				animatedStyle,
			]}
		>
			<Image
				source={imageSource}
				style={{ width: "100%", height: "140%" }}
				contentFit={"contain"}
				// Ajout des props de cache pour optimiser le chargement de l'image
				cachePolicy="memory-disk"
				placeholder={{ uri: "blurhash" }} // Optionnel: Utilisez un blurhash si disponible
				transition={300}
			/>
		</Animated.View>
	);
};

export default AnimatedImage;
