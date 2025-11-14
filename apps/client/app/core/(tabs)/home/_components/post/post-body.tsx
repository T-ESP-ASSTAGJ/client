import type { IMusic } from "@/app/core/(tabs)/home/_types/post.types";
import { Ionicons } from "@expo/vector-icons";
import { type AVPlaybackStatus, Audio } from "expo-av";
import { Image } from "expo-image";
import React, { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

type PostBodyProps = {
	music: IMusic;
	photo: string;
};

export default function PostBody({ music, photo }: PostBodyProps) {
	const coverProgress = useSharedValue(0);
	const FILL = StyleSheet.absoluteFillObject;

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

	const soundRef = useRef<Audio.Sound | null>(null);
	const [status, setStatus] = useState<AVPlaybackStatus | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const [controlsVisible, setControlsVisible] = useState(false);
	const hideControlsTimeout = useRef<ReturnType<typeof setTimeout> | null>(
		null,
	);

	const showControls = () => {
		setControlsVisible(true);
	};

	useEffect(() => {
		return () => {
			if (hideControlsTimeout.current) {
				clearTimeout(hideControlsTimeout.current);
			}
		};
	}, []);

	useEffect(() => {
		let isMounted = true;

		const loadSound = async () => {
			if (!music.preview_url) return;
			setIsLoading(true);

			try {
				if (soundRef.current) {
					await soundRef.current.unloadAsync();
					soundRef.current = null;
				}

				const { sound, status } = await Audio.Sound.createAsync(
					{ uri: music.preview_url },
					{ shouldPlay: false },
					(s) => {
						if (!isMounted) return;
						setStatus(s);
					},
				);

				soundRef.current = sound;
				if (isMounted) setStatus(status);
			} catch (e) {
				console.error("Error loading audio:", e);
			} finally {
				if (isMounted) setIsLoading(false);
			}
		};

		loadSound();

		return () => {
			isMounted = false;
			if (soundRef.current) {
				soundRef.current.unloadAsync();
				soundRef.current = null;
			}
		};
	}, [music.preview_url]);

	const isLoaded = music.preview_url && status?.isLoaded;
	const isPlaying =
		music.preview_url && status && status.isLoaded
			? (status as any).isPlaying
			: false;

	const togglePlayPause = async () => {
		if (!music.preview_url || !soundRef.current || !isLoaded) return;

		try {
			if (isPlaying) {
				await soundRef.current.pauseAsync();
			} else {
				await soundRef.current.playAsync();
			}
		} catch (e) {
			console.error("Error play/pause:", e);
		}
	};

	const handlePressPlay = async () => {
		if (!music.preview_url) return;
		showControls();
		await togglePlayPause();
	};

	const handleCardPress = async () => {
		if (!music.preview_url) return;
		await handlePressPlay();
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

				{controlsVisible && (
					<View
						style={{
							position: "absolute",
							left: 0,
							right: 0,
							bottom: 0,
							height: 53,
						}}
					/>
				)}

				{music.preview_url && controlsVisible && (
					<Pressable
						onPress={handlePressPlay}
						style={[
							{
								position: "absolute",
								alignSelf: "center",
								top: "40%",
								width: 39,
								height: 39,
								borderRadius: 20,
								alignItems: "center",
								justifyContent: "center",
							},
							!isPlaying && {
								backgroundColor: "rgba(0, 0, 0, 0.35)",
							},
						]}
						hitSlop={10}
						disabled={isLoading || !isLoaded}
					>
						{isLoading || !isLoaded ? (
							<Text style={{ color: "white", fontSize: 20 }}>
								{isLoading ? "…" : "×"}
							</Text>
						) : !isPlaying ? (
							<Ionicons name="pause" size={30} color="#fff" />
						) : null}
					</Pressable>
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
					borderWidth: 3,
					borderColor: "rgba(255, 255, 255, 0.9)",
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
