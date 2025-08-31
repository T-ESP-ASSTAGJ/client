import { Button } from "@/components/rnr-ui/button";
import { Text } from "@/components/rnr-ui/text";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useRegistrationStore } from "@/stores/use-registry-store";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { View } from "react-native";

export default function ContinueButton() {
	const { nextStep, prevStep, formState, canNext } = useRegistrationStore();
	const router = useRouter();
	const currentStep = formState.currentStep;
	const canGoNext = useMemo(() => canNext(), [formState]);

	function onPrev() {
		if (currentStep !== 0) {
			prevStep();
			return;
		}
		router.push("/(auth)/sign-in");
	}

	return (
		<View className={"flex flex-row justify-between"}>
			<Button
				onPress={onPrev}
				className={"w-1/4 rounded-2xl bg-primary"}
				variant="default"
			>
				<IconSymbol name={"chevron.left"} color={"white"} size={12} />
			</Button>
			<Button
				disabled={!canGoNext}
				onPress={nextStep}
				className={"flex flex-row gap-x-4 rounded-2xl bg-primary-foreground"}
				variant="default"
			>
				<Text className={"text-primary"}>{"Continue"}</Text>
				<IconSymbol name={"chevron.right"} color={"black"} size={12} />
			</Button>
		</View>
	);
}
