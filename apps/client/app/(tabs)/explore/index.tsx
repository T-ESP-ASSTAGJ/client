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
				style={{ fontFamily: "Jakarta-Light", fontSize: 20 }}
			>
				JakartaRegular
			</Text>
			<Text
				className={"text-white"}
				style={{ fontFamily: "Jakarta-Medium", fontSize: 24 }}
			>
				JakartaMedium
			</Text>
			<Text
				className={"text-white"}
				style={{ fontFamily: "Jakarta-Bold", fontSize: 24 }}
			>
				JakartaBold
			</Text>
            <Text
                className={"text-white font-extrabold"}
            >
                JakartaExtraBold
            </Text>
		</MainView>
	);
}
