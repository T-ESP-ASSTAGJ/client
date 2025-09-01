import { MainView } from "@/components/ui/MainView";
import { TouchableButton } from "@/components/ui/touchable-button";
import React from "react";
import { Text, View } from "react-native";

export default function ExplorePage() {
	return (
		<MainView disableTouchableWrapper>
			<TouchableButton variant={"primary"} content={"Explore"} />

			<Text
				className={"text-white"}
				style={{ fontFamily: "JakartaRegular", fontSize: 20 }}
			>
				JakartaRegular
			</Text>
			<Text
				className={"text-white"}
				style={{ fontFamily: "JakartaMedium", fontSize: 24 }}
			>
				JakartaMedium
			</Text>
			<Text
				className={"text-white"}
				style={{ fontFamily: "Jakarta", fontWeight: "800", fontSize: 24 }}
			>
				JakartaBold
			</Text>
		</MainView>
	);
}
