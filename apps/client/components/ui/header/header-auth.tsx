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
				"mx-auto w-full h-20 flex flex-row items-center justify-between px-2",
				className,
			)}
		>
			<View className={"flex h-full w-1/6 justify-center items-start"}>
				<TouchableButton sensory={"light"} className={"bg-transparent"}>
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
					variant={"icon"}
					icon={<Search color={"#FFF"} size={25} />}
				/>
			</View>
		</View>
	);
};
