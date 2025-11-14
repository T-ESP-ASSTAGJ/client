import { MainView } from "@/components/ui/MainView";
import { TouchableButton } from "@/components/ui/touchable-button";
import { ArrowLeft, ArrowRight, Info } from "lucide-react-native";
import { View } from "react-native";

export default function ExplorePage() {
	return (
		<MainView disableTouchableWrapper>
			<View className={"w-full flex gap-y-4"}>
				<TouchableButton variant={"primary"} content={"Explore"} />
				<TouchableButton
					variant={"primary"}
					content={"Explore"}
					leftIcon={<ArrowLeft />}
				/>
				<TouchableButton
					variant={"primary"}
					content={"Explore"}
					rightIcon={<ArrowRight />}
				/>
				<TouchableButton variant={"primary"} isLoading />
				<TouchableButton icon={<Info />} />
			</View>
		</MainView>
	);
}
