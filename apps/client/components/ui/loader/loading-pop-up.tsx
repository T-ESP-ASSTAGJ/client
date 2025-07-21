import { Loader } from "@/components/ui/loader/loader"; // Vous devrez installer cette dépendance
import { BlurView } from "expo-blur";
import React from "react";
import { ActivityIndicator, Modal, Text, View } from "react-native";

export const LoadingPopUp = ({ title }: { title?: string }) => {
	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={true} // N'oubliez pas d'ajouter cette prop
			onRequestClose={() => {
				// Fonction appelée lorsque l'utilisateur appuie sur le bouton retour (Android)
			}}
		>
			<BlurView
				intensity={10} // Ajustez l'intensité du flou (0-100)
				tint="dark" // Options: 'light', 'dark', 'default'
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "rgba(9, 16, 29, 0.6)",
				}}
			>
				<View
					className={"flex"}
					style={{
						width: 340,
						height: 225,
						backgroundColor: "white",
						borderRadius: 10,
						padding: 20,
						alignItems: "center",
					}}
				>
					{/* Indicateur de chargement */}
					{/*<ActivityIndicator size="large" color="black" />*/}
					<Loader width={240} height={135} />

					<Text
						className={"text-xl tracking-wide"}
						style={{ fontFamily: "Urbanist-semibold" }}
					>
						{title ? title : "Veuillez patienter..."}
					</Text>
				</View>
			</BlurView>
		</Modal>
	);
};
