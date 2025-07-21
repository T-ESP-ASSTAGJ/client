import { Avatar as RNAvatar } from "@/components/rnr-ui/avatar";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TouchableBounce from "@/components/ui/TouchableBounce";
import { TouchableButton } from "@/components/ui/touchable-button";
import { useRouter } from "expo-router";
import { ArrowLeft, Cross } from "lucide-react-native";
import React, { type FC } from "react";

interface BackButtonProps {
	cross?: boolean;
}

export const BackButton: FC<BackButtonProps> = ({ cross }) => {
	const router = useRouter();

	return (
		router.canGoBack() && (
			<TouchableButton
				sensory={"light"}
				onPress={() => {
					router.back();
				}}
			>
				<RNAvatar
					alt="back"
					className="flex size-10 items-center justify-center"
				>
					{cross ? (
						<IconSymbol
							name={"xmark"}
							size={25}
							color="#090909"
							weight={"medium"}
						/>
					) : (
						<ArrowLeft size={28} strokeWidth={2.5} color="#090909" />
					)}
				</RNAvatar>
			</TouchableButton>
		)
	);
};
