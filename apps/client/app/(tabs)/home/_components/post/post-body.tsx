import {IMusic} from "@/app/(tabs)/home/_types/post.types";
import {Pressable, StyleSheet, View} from "react-native";
import {Image} from "expo-image";
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import absoluteFillObject = StyleSheet.absoluteFillObject;

type PostBodyProps = {
    music: IMusic,
    photo: string,
}

export default function PostBody({ music, photo }: PostBodyProps) {
    const progress = useSharedValue(0);
    const FILL = StyleSheet.absoluteFillObject;

    const toggle = () => {
        progress.value = progress.value === 0
            ? withTiming(1, { duration: 300 })
            : withTiming(0, { duration: 300 });
    };

    const mainCoverStyle = useAnimatedStyle(() => ({ opacity: 1 - progress.value }));
    const mainPhotoStyle = useAnimatedStyle(() => ({ opacity: progress.value }));

    const thumbPhotoStyle = useAnimatedStyle(() => ({ opacity: 1 - progress.value }));
    const thumbCoverStyle = useAnimatedStyle(() => ({ opacity: progress.value }));

    return (
        <>
            <View className={"relative w-[375px] h-[330px] flex flex-row justify-center mx-auto"}>
                <View
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 21,
                        overflow: "hidden",
                        borderWidth: 3,
                        borderColor: "rgba(50, 50, 50, 0.4)"
                    }}
                >
                    <Animated.View
                        style={[
                            FILL,
                            mainCoverStyle
                        ]}
                    >
                        <Image
                            style={FILL}
                            source={music.music_cover}
                            alt="Music cover"
                            contentFit="cover"
                        />
                    </Animated.View>

                    <Animated.View
                        style={[
                            FILL,
                            mainPhotoStyle
                        ]}
                    >
                        <Image
                            style={FILL}
                            source={photo}
                            alt="Photo"
                            contentFit="cover"
                        />
                    </Animated.View>
                </View>

                <Pressable
                    onPress={toggle}
                    style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        width: 80,
                        height: 80,
                        borderRadius: 21,
                        overflow: "hidden",
                        borderWidth: 3,
                        borderColor: "rgba(255, 255, 255, 0.9)"
                    }}
                    hitSlop={8}
                >
                    <Animated.View style={[
                        FILL,
                        thumbPhotoStyle
                    ]}>
                        <Image
                            style={FILL}
                            source={photo}
                            alt="Photo thumb"
                            contentFit="cover"
                        />
                    </Animated.View>

                    <Animated.View style={[
                        FILL,
                        thumbCoverStyle
                    ]}>
                        <Image
                            style={FILL}
                            source={music.music_cover}
                            alt="Cover thumb"
                            contentFit="cover"
                        />
                    </Animated.View>
                </Pressable>
            </View>
        </>
    )
}