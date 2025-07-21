import { cn } from "@/lib/utils";
import type { FC, ReactNode } from "react";
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
	ScrollView,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface MainViewProps {
	children: ReactNode;
	className?: string;
	disableTouchableWrapper?: boolean; // Nouvelle prop pour désactiver TouchableWithoutFeedback
	safeArea?: boolean;
	avoidingView?: boolean;
	scrollView?: boolean;
}

export const MainView: FC<MainViewProps> = ({
	children,
	className,
	disableTouchableWrapper = false, // false par défaut pour la rétrocompatibilité
	safeArea = true,
	avoidingView = true,
	scrollView = false,
}) => {
	const content = avoidingView ? (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			className={"w-full flex-1 transition-all"} // Ajout de w-full ici
			keyboardVerticalOffset={20}
		>
			{children}
		</KeyboardAvoidingView>
	) : (
		children
	);

	return (
		<GestureHandlerRootView>
			<>
				{safeArea ? (
					<SafeAreaView
						className={cn(
							"relative flex h-screen w-screen items-center bg-[#F3F2EE]",
							className,
						)}
					>
						{avoidingView && disableTouchableWrapper ? (
							content
						) : (
							<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
								{content}
							</TouchableWithoutFeedback>
						)}
					</SafeAreaView>
				) : !scrollView ? (
					<View
						className={cn(
							"relative flex h-screen w-screen items-center bg-[#F3F2EE] pt-16",
							className,
						)}
					>
						{disableTouchableWrapper ? (
							content
						) : (
							<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
								{content}
							</TouchableWithoutFeedback>
						)}
					</View>
				) : (
					<ScrollView
						className={cn("relative w-screen bg-[#F3F2EE] pt-16", className)}
					>
						{disableTouchableWrapper ? (
							content
						) : (
							<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
								{content}
							</TouchableWithoutFeedback>
						)}
					</ScrollView>
				)}
			</>
		</GestureHandlerRootView>
	);
};
