import { Avatar as RNAvatar } from "@/components/rnr-ui/avatar";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { MainView } from "@/components/ui/MainView";
import { Header } from "@/components/ui/header/header";
import { HeaderAuth } from "@/components/ui/header/header-auth";
import HeaderTabs from "@/components/ui/header/header-tabs";
import { TouchableButton } from "@/components/ui/touchable-button";
import { ArrowLeft } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

export default function ExplorePage() {
	return (
		<MainView disableTouchableWrapper>
			<Header
				headerLeft={
					<TouchableButton sensory={"light"}>
						<RNAvatar
							alt="back"
							className="flex size-10 items-center justify-center"
						>
							<ArrowLeft size={28} strokeWidth={2.5} color="#FFF" />
						</RNAvatar>
					</TouchableButton>
				}
			/>
			{/*<HeaderAuth/>*/}

			<View>
				<Text>Explore</Text>
			</View>
		</MainView>
	);
}
