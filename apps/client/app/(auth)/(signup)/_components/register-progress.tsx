import { Progress } from "@/components/rnr-ui/progress";
import {
	REGISTER_ROUTES,
	useRegistrationStore,
} from "@/stores/use-registry-store";
import { View } from "react-native";

export default function RegisterProgress() {
	const currentStep = useRegistrationStore(
		(state) => state.formState.currentStep,
	);
	const progress = (currentStep / REGISTER_ROUTES.length) * 100;

	return (
		<View className="mt-8 w-full bg-background px-6">
			<Progress
				max={100}
				value={progress}
				className={"h-2 bg-foreground"}
				indicatorClassName={
					"bg-primary-foreground rounded-l-none rounded-r-full"
				}
			/>
		</View>
	);
}
