import TabBarButton from "@/components/tabs/tab-bar-button";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import type React from "react";
import { StyleSheet, View } from "react-native";

const TabBar: React.FC<BottomTabBarProps> = ({
	state,
	descriptors,
	navigation,
}) => {
	return (
		<View style={styles.tabbar}>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];

				// Obtenir le label à partir des options
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel.toString()
						: options.title !== undefined
							? options.title
							: route.name;

				// Ignorer certaines routes si nécessaire
				if (["create"].includes(route.name) && route.name !== "create") {
					return null;
				}

				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: "tabPress",
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						// Le type ici est générique, donc on peut passer les params sans erreur
						navigation.navigate(route.name);
					}
				};

				const onLongPress = () => {
					navigation.emit({
						type: "tabLongPress",
						target: route.key,
					});
				};

				let displayLabel: string;
				switch (route.name) {
					case "home":
						displayLabel = "Accueil";
						break;
					case "explore":
						displayLabel = "Explore";
						break;
					case "friends":
						displayLabel = "Amis";
						break;
					case "chats":
						displayLabel = "Chats";
						break;
					default:
						displayLabel = label;
				}

				return (
					<TabBarButton
						key={route.key}
						style={[
							styles.tabbarItem,
							route.name === "create" && styles.createButton,
						]}
						onPress={onPress}
						onLongPress={onLongPress}
						isFocused={isFocused}
						routeName={route.name}
						label={displayLabel}
					/>
				);
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	tabbar: {
		position: "absolute",
		bottom: 0,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "#000000",
		paddingHorizontal: 10,
		paddingBottom: 20,
		paddingVertical: 5,
		borderTopWidth: 0,
		borderRadius: 0,
	},
	tabbarItem: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	createButton: {
		marginTop: -20, // Décaler le bouton + vers le haut
	},
});

export default TabBar;
