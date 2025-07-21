import { SegmentedControl } from "@/components/ui/Segments";
import { TouchableButton } from "@/components/ui/touchable-button";
import BottomSheet, {
	BottomSheetBackdrop,
	BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export const ChooseIconSheet = ({ setOpenIconSheet }) => {
	const [icons, setIcons] = useState([]);

	const icon_types = [
		{ id: "icon", title: "Icônes" },
		{ id: "emoji", title: "Emojis" },
	];

	const [selectedIconType, setSelectedIconType] = useState("Icônes");

	const bottomSheetRef = useRef(null);

	// Au lieu de démarrer à l'index 1, commencez à -1 (fermé)
	const [sheetIndex, setSheetIndex] = useState(-1);

	// Effet pour ouvrir le sheet quand le composant est monté
	useEffect(() => {
		// Délai court pour permettre au composant de se monter complètement
		const timer = setTimeout(() => {
			setSheetIndex(0);
		}, 100);

		return () => clearTimeout(timer);
	}, []);

	const handleSheetChanges = useCallback(
		(index) => {
			// Si le sheet est fermé, informez le parent
			if (index === -1) {
				setOpenIconSheet(false);
			}
		},
		[setOpenIconSheet],
	);

	const snapPoints = useMemo(() => ["65%"], []);

	const renderBackdrop = useCallback(
		(props) => (
			<BottomSheetBackdrop
				appearsOnIndex={0}
				disappearsOnIndex={-1}
				{...props}
			/>
		),
		[],
	);

	// Fonction pour fermer proprement le sheet
	const closeSheet = useCallback(() => {
		bottomSheetRef.current?.close();
	}, []);

	return (
		<BottomSheet
			ref={bottomSheetRef}
			onChange={handleSheetChanges}
			index={1}
			backdropComponent={renderBackdrop}
			snapPoints={snapPoints}
			enablePanDownToClose={true}
		>
			<BottomSheetView style={styles.container}>
				<View className={"flex items-center"}>
					<Text className={"text-2xl"} style={{ fontFamily: "Urbanist-bold" }}>
						Choix de l'icône
					</Text>
				</View>

				<View className={"my-4 flex w-full items-center"}>
					<SegmentedControl
						options={icon_types.map((icon_type) => icon_type.title)}
						selectedOption={selectedIconType}
						onOptionPress={(icon_type) => setSelectedIconType(icon_type)}
					/>
				</View>

				{/* Ajoutez ici votre contenu de sheet, par exemple une grille d'icônes */}
				<View className={"flex flex-row flex-wrap justify-center gap-4 p-4"}>
					{icons.map((item) => (
						<TouchableButton
							key={item.id}
							sensory={"light"}
							className="size-[70px] rounded-xl bg-[#F5F5F5] p-3"
							onPress={() => {
								// Mettre à jour l'icône et fermer le sheet
								// Vous pouvez passer une fonction setNewHabit ici si nécessaire
								closeSheet();
							}}
						>
							<Image
								style={{ width: 42, height: 42 }}
								source={item.icon}
								contentFit={"contain"}
								cachePolicy="memory-disk"
								className={"rounded-full"}
							/>
						</TouchableButton>
					))}
				</View>
			</BottomSheetView>
		</BottomSheet>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
});
