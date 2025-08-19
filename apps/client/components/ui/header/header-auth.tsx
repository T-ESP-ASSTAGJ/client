import {cn} from "@/lib/utils";
import {View} from "react-native";
import {Avatar} from "@/components/rnr-ui/avatar";
import {Image} from "expo-image";
import {TouchableButton} from "@/components/ui/touchable-button";
import React, {useState} from "react";
import {Search} from "lucide-react-native";
import HeaderTabs from "@/components/ui/header/header-tabs";

type HeaderAuthProps = {
    searchIcon: boolean;
    className?: string;
}

export const HeaderAuth = ({ className }: HeaderAuthProps) => {
    return (
        <View
            className={cn(
                "flex h-20 w-11/12 mx-auto flex-row items-center justify-between px-1.5",
                className,
            )}
        >
            <View className={"flex h-full w-1/6 justify-center"}>
                <TouchableButton
                    sensory={"light"}
                >
                    <Avatar className={"size-11 flex justify-center items-center rounded-full"} alt={"Profile picture"}>
                        <Image style={{ width: "100%", height: "100%" }} source={require("@/assets/images/avatar.png")} contentFit={"cover"} className={"rounded-full"}/>
                    </Avatar>
                </TouchableButton>
            </View>

            <HeaderTabs/>

            <View className={"flex h-full w-1/6 items-end justify-center"}>
                <TouchableButton
                    sensory={"light"}
                    className={"bg-transparent gap-y-1"}
                    onPress={() => {
                        console.log("Search")
                    }}
                >
                    <Search color={"#FFF"} size={25}/>
                </TouchableButton>
            </View>
        </View>
    )
}