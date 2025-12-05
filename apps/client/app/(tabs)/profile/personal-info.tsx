import { Input } from "@/components/rnr-ui/input";
import { MainView } from "@/components/ui/MainView";
import { AvatarPicker } from "@/components/ui/avatar-picker";
import { Header } from "@/components/ui/header/header";
import { View } from "react-native";

export default function PersonalInfoPage() {
	return (
		<MainView>
			<Header title={"Informations"} backButton />

			<AvatarPicker />

			<View className={"w-11/12 mx-auto flex items-center"}>
				<Input
					label={"Username"}
					inputMode={"text"}
					textAlignVertical={"center"}
					aria-labelledby="username"
					accessibilityLabel={"Enter your username"}
				/>
			</View>
		</MainView>
	);
}
