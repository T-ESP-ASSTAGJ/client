import type { IMusic } from "@/app/core/(tabs)/home/_types/post.types";
import { useAudio } from "@/components/Audio-context";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

type PostBodyProps = {
	postId: number;
	music: IMusic;
	photo: string;
};

export default function PostBody({ postId, music, photo }: PostBodyProps) {
	const { playPost, pausePost, isPlaying: isPostPlaying } = useAudio();
	const coverProgress = useSharedValue(0);
	const FILL = StyleSheet.absoluteFillObject;

	const isPlaying = isPostPlaying(postId);

	const toggleCover = () => {
		coverProgress.value =
			coverProgress.value === 0
				? withTiming(1, { duration: 300 })
				: withTiming(0, { duration: 300 });
	};

	const mainCoverStyle = useAnimatedStyle(() => ({
		opacity: 1 - coverProgress.value,
	}));
	const mainPhotoStyle = useAnimatedStyle(() => ({
		opacity: coverProgress.value,
	}));
	const thumbPhotoStyle = useAnimatedStyle(() => ({
		opacity: 1 - coverProgress.value,
	}));
	const thumbCoverStyle = useAnimatedStyle(() => ({
		opacity: coverProgress.value,
	}));

	const togglePlayPause = async () => {
		if (!music.preview_url) return;

		if (isPlaying) {
			await pausePost(postId);
		} else {
			await playPost(postId, music.preview_url);
		}
	};

	const handleCardPress = async () => {
		if (!music.preview_url) return;
		await togglePlayPause();
	};

	return (
		<Pressable
			className={
				"relative mx-auto flex h-[330px] w-[365px] flex-row justify-center"
			}
			onPress={handleCardPress}
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
					<Image
						style={FILL}
						source={music.music_cover}
						alt="Music cover"
						contentFit="cover"
					/>
				</Animated.View>

				<Animated.View style={[FILL, mainPhotoStyle]}>
					<Image style={FILL} source={photo} alt="Photo" contentFit="cover" />
				</Animated.View>

				{music.preview_url && (
					<Pressable
						onPress={togglePlayPause}
						style={{
							position: "absolute",
							alignSelf: "center",
							top: "42%",
							width: 60,
							height: 60,
							borderRadius: 30,
							alignItems: "center",
							justifyContent: "center",
							backgroundColor: !isPlaying ? "rgba(0, 0, 0, 0.6)" : "",
						}}
						hitSlop={15}
					>
						{!isPlaying ? (
							<Ionicons name={"pause"} size={32} color="#fff" />
						) : null}
					</Pressable>
				)}

				{isPlaying && (
					<View
						style={{
							position: "absolute",
							top: 12,
							left: 12,
							backgroundColor: "rgba(15, 15, 15, 0.75)",
							borderRadius: 12,
							paddingHorizontal: 10,
							paddingVertical: 6,
							flexDirection: "row",
							alignItems: "center",
							gap: 6,
						}}
					>
						<Ionicons name="musical-notes" size={14} color="#fff" />
						<Text style={{ color: "#fff", fontSize: 11, fontWeight: "600" }}>
							Playing
						</Text>
					</View>
				)}
			</View>

			<Pressable
				onPress={toggleCover}
				style={{
					position: "absolute",
					top: 12,
					right: 12,
					width: 80,
					height: 80,
					borderRadius: 21,
					overflow: "hidden",
				}}
				hitSlop={8}
			>
				<Animated.View style={[FILL, thumbPhotoStyle]}>
					<Image
						style={FILL}
						source={photo}
						alt="Photo thumb"
						contentFit="cover"
					/>
				</Animated.View>

				<Animated.View style={[FILL, thumbCoverStyle]}>
					<Image
						style={FILL}
						source={music.music_cover}
						alt="Cover thumb"
						contentFit="cover"
					/>
				</Animated.View>
			</Pressable>
		</Pressable>
	);
}
