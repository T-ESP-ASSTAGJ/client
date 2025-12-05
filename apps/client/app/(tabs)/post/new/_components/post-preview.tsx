import type {ITrack} from "@/app/(tabs)/home/_types/post.types";
import {useAudio} from "@/contexts/audio-context";
import {Image} from "expo-image";
import {CameraIcon, MusicIcon, Volume2Icon, VolumeOffIcon,} from "lucide-react-native";
import React from "react";
import {Pressable, StyleSheet, View} from "react-native";
import Animated, {useAnimatedStyle, useSharedValue,} from "react-native-reanimated";

export default function PostPreview({
                                        music,
                                        photo,
                                        onMusicPress,
                                        onPhotoPress,
                                    }: {
    music?: ITrack;
    photo?: string;
    onMusicPress: () => void;
    onPhotoPress: () => void;
}) {
    const {mute, isMuted} = useAudio();
    const progress = useSharedValue(0);
    const FILL = StyleSheet.absoluteFillObject;

    const mainCoverStyle = useAnimatedStyle(() => ({
        opacity: 1 - progress.value,
    }));
    const mainPhotoStyle = useAnimatedStyle(() => ({opacity: progress.value}));

    async function onMute(e) {
        e.stopPropagation();
        await mute();
    }

    return (
        <Pressable
            className={
                "relative mx-auto flex h-[330px] w-[365px] flex-row justify-center"
            }
            onPress={onMusicPress}
        >
            <View
                style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 21,
                    overflow: "hidden",
                    borderWidth: 3,
                    borderColor: "rgba(50, 50, 50, 0.4)",
                }}
            >
                <Animated.View style={[FILL, mainCoverStyle]}>
                    {
                        <Pressable
                            className="absolute top-4 left-4 bg-[rgba(15,15,15,0.75)] rounded-xl px-2.5 py-1.5 flex-row items-center gap-1.5 z-50"
                            onPress={onMute}
                        >
                            {isMuted ? (
                                <VolumeOffIcon size={24} color="#fff"/>
                            ) : (
                                <Volume2Icon size={24} color="#fff"/>
                            )}
                        </Pressable>
                    }
                    <View className={"h-full items-center justify-center z-0"}>
                        {music.coverUrl ? (
                            <Image
                                style={FILL}
                                source={music.coverUrl}
                                alt="Music cover"
                                contentFit="cover"
                            />
                        ) : (
                            <MusicIcon size={32} color={"white"}/>
                        )}
                    </View>
                </Animated.View>

                <Animated.View style={[FILL, mainPhotoStyle]}>
                    <Image style={FILL} source={photo} alt="Photo" contentFit="cover"/>
                </Animated.View>
            </View>

            <Pressable
                onPress={onPhotoPress}
                style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    width: 80,
                    height: 80,
                    borderRadius: 21,
                    overflow: "hidden",
                    borderWidth: 3,
                    borderColor: "rgba(255, 255, 255, 0.9)",
                }}
                hitSlop={8}
            >
                <View className={"justify-center items-center h-full"}>
                    {photo ? (
                        <Image
                            style={FILL}
                            source={photo}
                            alt="Photo thumb"
                            contentFit="cover"
                        />
                    ) : (
                        <CameraIcon size={32} color={"white"}/>
                    )}
                </View>
            </Pressable>
        </Pressable>
    );
}
