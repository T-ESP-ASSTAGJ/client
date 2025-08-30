import { Progress } from "@/components/rnr-ui/progress";
import { useRegistrationStore } from "@/stores/use-registry-store";
import { View } from "react-native";

export default function RegisterProgress() {
	const { getProgress } = useRegistrationStore();
	const progress = getProgress();
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
