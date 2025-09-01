import RegistrationProgress from "@/components/ui/registration-progress";
import { useRegistrationStore } from "@/stores/use-registry-store";
import { useSegments } from "expo-router";
import React, { useEffect } from "react";

export default function RegistrationProgressWrapper() {
	const segments = useSegments();
	const { formState, setFormState } = useRegistrationStore();

	useEffect(() => {
		const currentRoute = segments[segments.length - 1];
		let step = 1;

		switch (currentRoute) {
			case "phone":
				step = 1;
				break;
			case "phone-confirmation":
				step = 2;
				break;
			case "email":
				step = 3;
				break;
			case "email-confirmation":
				step = 4;
				break;
			case "names":
				step = 5;
				break;
			default:
				step = 1;
		}

		if (step !== formState.currentStep) {
			setFormState((prev) => ({ ...prev, currentStep: step }));
		}
	}, [segments, formState.currentStep, setFormState]);

	return (
		<RegistrationProgress currentStep={formState.currentStep} totalSteps={4} />
	);
}
