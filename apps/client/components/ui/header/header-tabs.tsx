import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    interpolate, withTiming,
} from "react-native-reanimated";
import {TouchableButton} from "@/components/ui/touchable-button";

export default function HeaderTabs() {
    const [index, setIndex] = useState<0 | 1>(0);
    const progress = useSharedValue(index);

    // update anim quand index change
    React.useEffect(() => {
        progress.value = withTiming(index);
    }, [index]);

    const indicatorStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: interpolate(progress.value, [0, 1], [0, 100]), // 100px = largeur d’un onglet
            },
        ],
    }));

    return (
        <View className="flex-row h-12 items-center justify-center">
            <TouchableButton
                sensory={"light"}
                content={"Friends"}
                className={"w-[100px] bg-transparent gap-y-1"}
                onPress={() => {
                    setIndex(0);
                }}
            >
                <Text className={`text-center text-lg tracking-wider ${index === 0 ? "text-white font-semibold" : "text-muted-foreground font-medium"}`}>Friends</Text>
            </TouchableButton>

            <TouchableButton
                sensory={"light"}
                content={"Discover"}
                className={"w-[100px] bg-transparent gap-y-1"}
                onPress={() => {
                    setIndex(1);
                }}
            >
                <Text className={`text-center text-lg tracking-wider ${index === 1 ? "text-white font-semibold" : "text-muted-foreground font-medium"}`}>Discover</Text>
            </TouchableButton>

            <Animated.View
                className="absolute bottom-0.5 h-[2.5px] bg-white rounded"
                style={[{ width: 30, left: 34 }, indicatorStyle]}
            />
        </View>
    );
}