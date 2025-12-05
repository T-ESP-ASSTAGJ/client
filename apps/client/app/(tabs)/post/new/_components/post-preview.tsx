import type { IMusic } from "@/types/post/post.types";
import { Image } from "expo-image";
import { CameraIcon, MusicIcon } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
} from "react-native-reanimated";

export default function PostPreview({
	music,
	photo,
	onMusicPress,
	onPhotoPress,
}: {
	music?: IMusic;
	photo?: string;
	onMusicPress: () => void;
	onPhotoPress: () => void;
}) {
	const progress = useSharedValue(0);
	const FILL = StyleSheet.absoluteFillObject;

	const mainCoverStyle = useAnimatedStyle(() => ({
		opacity: 1 - progress.value,
	}));
	const mainPhotoStyle = useAnimatedStyle(() => ({ opacity: progress.value }));

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
					<View className={"h-full items-center justify-center"}>
						{music ? (
							<Image
								style={FILL}
								source={music.music_cover}
								alt="Music cover"
								contentFit="cover"
							/>
						) : (
							<MusicIcon size={32} color={"white"} />
						)}
					</View>
				</Animated.View>

				<Animated.View style={[FILL, mainPhotoStyle]}>
					<Image style={FILL} source={photo} alt="Photo" contentFit="cover" />
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
						<CameraIcon size={32} color={"white"} />
					)}
				</View>
			</Pressable>
		</Pressable>
	);
}
