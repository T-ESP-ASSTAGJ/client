import ContinueButton from "@/app/(auth)/(signup)/_components/continue_button";
import { Text } from "@/components/rnr-ui/text";
import { MainView } from "@/components/ui/MainView";
import React from "react";
import { View } from "react-native";

export default function Names() {
	return (
		<MainView disableTouchableWrapper>
			<View>
				<Text>names</Text>
				<ContinueButton />
			</View>
		</MainView>
	);
}
