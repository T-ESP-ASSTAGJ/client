import { useUserStore } from "@/stores/use-user-store";
import { router } from "expo-router";
// app/index.tsx
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
	const initializeUser = useUserStore((state) => state.initializeUser);

	useEffect(() => {
		const run = async () => {
			// Initialise l’utilisateur (token, me, etc.)
			await initializeUser();

			// Redirection définie dans ton MainScreen
			router.replace("/branding");
		};

		run();
	}, []);

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<ActivityIndicator size="large" />
		</View>
	);
}
