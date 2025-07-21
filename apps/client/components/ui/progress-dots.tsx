import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

export const ProgressDots = ({ currentStep, totalSteps = 3 }) => {
	// Créer un tableau de références pour les animations de chaque dot
	const dotWidths = useRef(
		Array.from({ length: totalSteps }).map(() => new Animated.Value(8.5)),
	).current;

	useEffect(() => {
		// Animer tous les dots simultanément
		const animations = dotWidths.map((width, index) => {
			return Animated.timing(width, {
				toValue: currentStep === index + 1 ? 32 : 8.5,
				duration: 400, // Durée de la transition en ms
				useNativeDriver: false, // Les animations de layout ne supportent pas le native driver
			});
		});

		// Lancer toutes les animations en parallèle
		Animated.parallel(animations).start();
	}, [currentStep, dotWidths]);

	return (
		<View className="mb-5 flex flex-row gap-x-2">
			{dotWidths.map((width, index) => (
				<Animated.View
					key={index}
					className={`${currentStep === index + 1 ? "bg-primary" : "bg-[#C9C8C9]"}`}
					style={{
						width: width,
						height: 8.5,
						borderRadius: 999,
					}}
				/>
			))}
		</View>
	);
};
