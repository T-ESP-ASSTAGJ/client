import { Avatar } from "@/components/rnr-ui/avatar";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert, Linking, Platform, Pressable } from "react-native";

export const AvatarPicker = () => {
	const [avatar, setAvatar] = useState<string>(null);

	const selectProfilePicture = async () => {
		const openIOSSettings = async () => {
			if (Platform.OS === "ios") {
				await Linking.openURL("app-settings:");
			} else {
				// Cas Android
				await Linking.openSettings();
			}
		};

		// Vérifier d'abord le statut actuel des permissions
		const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();

		// Si on n'a pas la permission, demander ou gérer l'absence
		if (status !== "granted") {
			// Si c'est la première demande ou si l'utilisateur peut encore être sollicité
			if (status === "undetermined") {
				const { status: newStatus } =
					await ImagePicker.requestMediaLibraryPermissionsAsync();
				if (newStatus !== "granted") {
					Alert.alert(
						"Accès refusé",
						"Nous avons besoin d'accéder à ta galerie pour ajouter une photo de profil.",
					);
					return;
				}
			} else {
				// L'utilisateur a précédemment refusé la permission de manière permanente
				Alert.alert(
					"Accès aux photos nécessaire",
					"Pour ajouter une photo de profil, nous avons besoin d'accéder à ta galerie.\n\nUne fois dans les Réglages, va dans 'Expo Go' puis active l'accès aux 'Photos'.",
					[
						{ text: "Plus tard", style: "cancel" },
						{ text: "Ouvrir les réglages", onPress: openIOSSettings },
					],
				);
				return;
			}
		}

		// Maintenant qu'on a la permission (ou qu'on vient de l'obtenir), on peut lancer le picker
		try {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ["images"],
				allowsEditing: true,
				quality: 1,
				base64: true,
			});

			if (!result.canceled && result.assets && result.assets.length > 0) {
				setAvatar(result.assets[0].uri);
			}
		} catch (error) {
			console.error("Erreur lors de la sélection d'image:", error);
			Alert.alert(
				"Erreur",
				"Un problème est survenu lors de la sélection de l'image.",
			);
		}
	};

	return (
		<Pressable onPress={selectProfilePicture}>
			<Avatar
				className={
					"flex size-44 items-center justify-center rounded-3xl border-2 border-[#F5F5F5]"
				}
				alt={"Profile picture"}
			>
				{avatar ? (
					<Image
						style={{ width: "100%", height: "100%" }}
						source={{ uri: avatar }}
						contentFit={"cover"}
						className={"rounded-3xl"}
					/>
				) : (
					<IconSymbol name={"plus"} color={"#101010"} />
				)}
			</Avatar>
		</Pressable>
	);
};
