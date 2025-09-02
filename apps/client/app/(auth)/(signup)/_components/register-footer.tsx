import { type Href, useRouter } from "expo-router";
import { View } from "react-native";

import { Button } from "@/components/rnr-ui/button";
import { Text } from "@/components/rnr-ui/text";
import { IconSymbol } from "@/components/ui/IconSymbol";
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

	const canGoNext = useCallback(() => canNext(), [currentStep]);
	function handleNext() {
		const nextRoute = nextStep();
		if (!nextRoute) return;
		router.replace(nextRoute as Href);
	}

	function handlePrev() {
		if (currentStep === 0) {
			router.back();
			return;
		}
		const prevRoute = prevStep();
		router.replace(prevRoute);
		return;
	}

	return (
		<View className={"flex flex-row justify-between"}>
			<Button
				onPress={handlePrev}
				className={"w-1/4 rounded-2xl bg-primary "}
				variant="default"
			>
				<IconSymbol name={"chevron.left"} color={"white"} size={12} />
			</Button>
			<Button
				disabled={!canGoNext()}
				onPress={handleNext}
				className={"flex flex-row gap-x-4 rounded-2xl bg-primary-foreground"}
				variant="default"
			>
				<Text className={"text-primary"}>{"Continue"}</Text>
				<IconSymbol name={"chevron.right"} color={"black"} size={12} />
			</Button>
		</View>
	);
}
