import { Avatar } from "@/components/rnr-ui/avatar";
import HeaderTabs from "@/components/ui/header/header-tabs";
import { TouchableButton } from "@/components/ui/touchable-button";
import { cn } from "@/lib/utils";
import { Image } from "expo-image";
import { Search } from "lucide-react-native";
import React, { useState } from "react";
import { View } from "react-native";

type HeaderAuthProps = {
	searchIcon: boolean;
	className?: string;
};

export const HeaderAuth = ({ className }: HeaderAuthProps) => {
	return (
		<View
			className={cn(
				"mx-auto flex h-20 w-11/12 flex-row items-center justify-between px-1.5",
				className,
			)}
		>
			<View className={"flex h-full w-1/6 justify-center"}>
				<TouchableButton sensory={"light"}>
					<Avatar
						className={"flex size-11 items-center justify-center rounded-full"}
						alt={"Profile picture"}
					>
						<Image
							style={{ width: "100%", height: "100%" }}
							source={require("@/assets/images/avatar.png")}
							contentFit={"cover"}
							className={"rounded-full"}
						/>
					</Avatar>
				</TouchableButton>
			</View>

			<HeaderTabs />

			<View className={"flex h-full w-1/6 items-end justify-center"}>
				<TouchableButton
					sensory={"light"}
					className={"gap-y-1 bg-transparent"}
					onPress={() => {
						console.log("Search");
					}}
				>
					<Search color={"#FFF"} size={25} />
				</TouchableButton>
			</View>
		</View>
	);
};
