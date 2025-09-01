import { Button } from "@/components/rnr-ui/button";
import type { ReactNode } from "react";
import { Text, View } from "react-native";

type AlertProps = {
	alertIcon: ReactNode;
	title: string;
	description: string;
	primaryButton: {
		label: string;
		onPress: () => void;
	};
	secondaryButton?: {
		label: string;
		onPress: () => void;
	};
};

export default function AlertComponent({
	alertIcon,
	title,
	description,
	primaryButton,
	secondaryButton,
}: AlertProps) {
	return (
		<View className={"flex flex-col items-center justify-center gap-4"}>
			<View className={"flex flex-col items-center justify-center gap-4 p-3"}>
				{alertIcon}
				<Text className={"text-center font-bold text-3xl"}>{title}</Text>
				<Text className={"text-center text-lg"}>{description}</Text>
			</View>
			<View className={"flex flex-col gap-4"}>
				<Button
					className={"w-[100px] rounded-full bg-background"}
					onPress={primaryButton.onPress}
				>
					<Text className={"text-center text-white"}>
						{primaryButton.label}
					</Text>
				</Button>
				{secondaryButton && (
					<Button
						className={"w-[100px] rounded-full border border-black bg-white"}
						onPress={secondaryButton.onPress}
					>
						<Text className={"text-center text-black"}>
							{secondaryButton.label}
						</Text>
					</Button>
				)}
			</View>
		</View>
	);
}
