import { Avatar } from "@/components/rnr-ui/avatar";
import HeaderTabs from "@/components/ui/header/header-tabs";
import { TouchableButton } from "@/components/ui/touchable-button";
import { cn } from "@/lib/utils";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Search } from "lucide-react-native";
import React, { useState } from "react";
import { View } from "react-native";

type HeaderAuthProps = {
	searchIcon: boolean;
	className?: string;
};

export const HeaderAuth = ({ className }: HeaderAuthProps) => {
	const redirectToProfile = () => {
		router.push("/core/profile/notifications");
	};

	return (
		<View
			className={cn(
				"mx-auto w-full h-[70px] flex flex-row items-center justify-between px-2",
				className,
			)}
		>
			<View className={"flex h-full w-1/6 justify-center items-start"}>
				<TouchableButton
					onPress={redirectToProfile}
					sensory={"light"}
					className={"bg-transparent"}
				>
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

			<View className={"flex h-full w-1/6 items-center justify-center"}>
				<TouchableButton
					sensory={"light"}
					className={"gap-y-1 bg-transparent"}
					onPress={() => {
						console.log("Search");
					}}
					variant={"transparent"}
				>
					<Search color={"#FFF"} size={24} strokeWidth={2.5} />
				</TouchableButton>
			</View>
		</View>
	);
};
