import { IconSymbol } from "@/components/ui/IconSymbol";
import { useUserPreferences } from "@/hooks/user/userUserPreferences";
import { useUserStore } from "@/stores/use-user-store";
import * as Haptics from "expo-haptics";
import { type Route, useRouter } from "expo-router";
import { type FC, type ReactNode, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface AccountButtonProps {
	item: {
		icon: ReactNode;
		label: string;
		path: Route; // Updated to use the non-generic Route type
	};
	onPress?: () => void;
}

export const AccountButton: FC<AccountButtonProps> = ({ item, onPress }) => {
	const router = useRouter();
	const { user } = useUserStore();
	const [isPressed, setIsPressed] = useState(false);

	return (
		<TouchableOpacity
			className={`flex h-[60px] flex-row items-center justify-between gap-x-2 rounded-2xl px-7 py-0.5 pl-5 transition-all ${isPressed ? "bg-foreground/[0.05]" : "bg-white"}`}
			activeOpacity={1}
			onPress={() => {
				if (item.path) {
					router.push(item.path);
				}
			}}
			onPressIn={() => {
				if (user.preferences.haptic_touch) {
					Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
				}
				setIsPressed(true);
				if (onPress) {
					onPress();
				}
			}}
			onPressOut={() => {
				setIsPressed(false);
			}}
		>
			<View className={"flex flex-row items-center gap-x-3"}>
				<View
					className={`items-center justify-center rounded-xl p-2 ${item.label !== "Déconnexion" ? "bg-primary/10" : "bg-red-500/10"}`}
				>
					{item.icon}
				</View>
				<Text
					className={`text-lg ${item.label !== "Déconnexion" ? "text-foreground" : "text-red-500"}`}
					style={{ fontFamily: "Urbanist-bold" }}
				>
					{item.label}
				</Text>
			</View>

			{item.label !== "Déconnexion" && (
				<IconSymbol
					name={"chevron.right"}
					color={"black"}
					weight={"medium"}
					size={18}
				/>
			)}
		</TouchableOpacity>
	);
};
