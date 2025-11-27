import { type Href, useRouter } from "expo-router";
import { View } from "react-native";

import { Button } from "@/components/rnr-ui/button";
import { Text } from "@/components/rnr-ui/text";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { TouchableButton } from "@/components/ui/touchable-button";
import { useRegistrationStore } from "@/stores/use-registry-store";
import { useCallback } from "react";

export default function RegisterFooter() {
	const router = useRouter();

	// Store selectors
	const nextStep = useRegistrationStore((state) => state.nextStep);
	const prevStep = useRegistrationStore((state) => state.prevStep);
	const canNext = useRegistrationStore((state) => state.canNext);
	const currentStep = useRegistrationStore(
		(state) => state.formState.currentStep,
	);
	const formState = useRegistrationStore((state) => state.formState);

	const canGoNext = useCallback(() => {
		return canNext();
	}, [formState]);

	function handleNext() {
		const nextRoute = nextStep();
		if (!nextRoute) return;
		router.push(nextRoute as Href);
	}

	function handlePrev() {
		if (currentStep === 0) {
			router.back();
			return;
		}
		const prevRoute = prevStep();
		router.back();
		return;
	}

	return (
		<View className={"w-full flex flex-row justify-between items-center"}>
			<TouchableButton
				onPress={handlePrev}
				className={"rounded-xl"}
				size={"icon"}
				variant={"secondary"}
				icon={
					<IconSymbol
						name={"chevron.left"}
						color={"white"}
						size={15}
						weight={"bold"}
					/>
				}
			/>
			<View className={"w-3/6"}>
				<TouchableButton
					disabled={!canGoNext()}
					onPress={handleNext}
					variant={"primary"}
					content={"Continue"}
					className={"rounded-xl"}
				/>
			</View>
			{/*<Text className={"text-primary"}>{"Continue"}</Text>
				<IconSymbol name={"chevron.right"} color={"black"} size={12} />
			</TouchableButton>*/}
		</View>
	);
}
