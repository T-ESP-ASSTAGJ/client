import { createPost } from "@/actions/post/post.action";
import MusicPicker from "@/app/(tabs)/post/new/_components/music-picker";
import PhotoPicker from "@/app/(tabs)/post/new/_components/photo-picker";
import PostPreview from "@/app/(tabs)/post/new/_components/post-preview";
import { Button } from "@/components/rnr-ui/button";
import { Input } from "@/components/rnr-ui/input";
import { MainView } from "@/components/ui/MainView";
import {
	BottomSheetComponent,
	type BottomSheetComponentRef,
} from "@/components/ui/bottom-sheet/bottom-sheet-component";
import { Header } from "@/components/ui/header/header";
import { useAudio } from "@/contexts/audio-context";
import { getBase64FromUri } from "@/lib/base64";
import { initPost } from "@/lib/data/posts";
import type { INewPost, ITrack } from "@/types/post/post.types";
import { BlurView } from "expo-blur";
import { router, useNavigation } from "expo-router";
import { MapPinIcon, XIcon } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
	Alert,
	Animated,
	Keyboard,
	Platform,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";

let Location: any = null;
let Device: any = null;

try {
	Location = require("expo-location");
} catch (e) {}

try {
	Device = require("expo-device");
} catch (e) {}

interface LocationData {
	latitude: number;
	longitude: number;
	address?: string;
}

export default function PostPage() {
	const [post, setPost] = useState<INewPost>(initPost());
	const { playPost, pausePost } = useAudio();
	const [isPublishing, setIsPublishing] = useState(false);
	const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
	const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);
	const translateY = useRef(new Animated.Value(0)).current;
	const overlayOpacity = useRef(new Animated.Value(0)).current;
	const navigation = useNavigation();

	const photoSheetRef = useRef<BottomSheetComponentRef>(null);
	const musicSheetRef = useRef<BottomSheetComponentRef>(null);

	const isSimulator = Device ? !Device.isDevice : Platform.OS === "ios";

	useEffect(() => {
		const showSubscription = Keyboard.addListener(
			Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
			(event) => {
				setIsKeyboardVisible(true);
				Animated.timing(translateY, {
					toValue: -event.endCoordinates.height + 100,
					duration: event.duration || 250,
					useNativeDriver: true,
				}).start();
			},
		);
		const hideSubscription = Keyboard.addListener(
			Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
			(event) => {
				setIsKeyboardVisible(false);
				Animated.timing(translateY, {
					toValue: 0,
					duration: event.duration || 250,
					useNativeDriver: true,
				}).start();
			},
		);

		return () => {
			setPost(initPost());
			showSubscription.remove();
			hideSubscription.remove();
		};
	}, []);

	useEffect(() => {
		const unsubscribe = navigation.addListener("blur", async () => {
			await pausePost(0);
		});
		return () => {
			unsubscribe();
		};
	}, [navigation, pausePost]);

	useEffect(() => {
		Animated.timing(overlayOpacity, {
			toValue: isDescriptionFocused ? 1 : 0,
			duration: 200,
			useNativeDriver: true,
		}).start();
	}, [isDescriptionFocused]);

	useEffect(() => {
		const unmount = navigation.addListener("blur", async () => {
			await pausePost(0);
		});
		return () => {
			unmount();
		};
	}, [navigation]);

	function onPhotoPick(photoUri: string | null) {
		if (photoUri) {
			setPost((prev) => ({ ...prev, photoUrl: photoUri }));
		}
		photoSheetRef.current?.dismiss();
	}

	function onDescriptionChange(description: string) {
		setPost((prev) => ({ ...prev, caption: description }));
	}

	function onPhotoCancel() {
		photoSheetRef.current?.dismiss();
	}

	async function onMusicSelect(music: ITrack) {
		await pausePost(0);
		setPost((prev) => ({ ...prev, track: music }));
		if (music.metadata?.previewUrl) {
			await playPost(0, music.metadata?.previewUrl);
		}
		musicSheetRef.current?.dismiss();
	}

	function onMusicCancel() {
		musicSheetRef.current?.dismiss();
	}

	async function onCamera() {
		photoSheetRef.current?.present();
		if (isSimulator) {
			return;
		}
	}

	function onMusicPress() {
		musicSheetRef.current?.present();
	}

	async function onLocalize() {
		if (!Location) {
			Alert.alert(
				"Location Unavailable",
				"Location services are not available in this environment. Using mock location.",
				[
					{
						text: "OK",
						onPress: () => {
							const mockLocation: LocationData = {
								latitude: 48.8566,
								longitude: 2.3522,
								address: "Paris, France (Mock)",
							};
							setPost((prev) => ({ ...prev, location: mockLocation.address }));
						},
					},
				],
			);
			return;
		}

		if (isSimulator) {
			const mockLocation: LocationData = {
				latitude: 48.8566,
				longitude: 2.3522,
				address: "Paris, France (Simulator)",
			};
			setPost((prev) => ({ ...prev, location: mockLocation.address }));

			return;
		}

		try {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				Alert.alert(
					"Permission Required",
					"Location permission is needed to add your location.",
					[{ text: "OK" }],
				);
				return;
			}

			const currentLocation = await Location.getCurrentPositionAsync({
				accuracy: Location.Accuracy.Balanced,
			});

			const [address] = await Location.reverseGeocodeAsync({
				latitude: currentLocation.coords.latitude,
				longitude: currentLocation.coords.longitude,
			});

			const locationData: LocationData = {
				latitude: currentLocation.coords.latitude,
				longitude: currentLocation.coords.longitude,
				address: address ? `${address.city}, ${address.region}` : undefined,
			};

			setPost((prev) => ({ ...prev, location: locationData.address }));
		} catch (error) {
			Alert.alert("Error", "Failed to get location. Please try again.");
		}
	}

	async function onPublish() {
		setIsPublishing(true);
		try {
			const base64 = await getBase64FromUri(post.photoUrl);
			//TODO: fix with proper user ui handling logic

			const payload = {
				trackId: post.track.id,
				songPreviewUrl: post.track.metadata.previewUrl,
				photoUrl: "https://placehold.co/400x400/png",
				// photoUrl: `data:image/jpeg;base64,${base64}`,
				location: post.location,
				caption: post.caption,
			};

			//TODO: fix payload with base 64 value
			const res = await createPost(payload);

			if (res.success) {
				router.push("/home");
				setPost(initPost());
				await pausePost(0);
				setIsPublishing(false);
			}
		} catch (error) {
			Alert.alert("Error", "Failed to publish capsule. Please try again.");
		} finally {
			setIsPublishing(false);
		}
	}

	function handleDescriptionFocus() {
		setIsDescriptionFocused(true);
	}

	function handleDescriptionBlur() {
		setIsDescriptionFocused(false);
		Keyboard.dismiss();
	}

	const canPublish =
		post.photoUrl !== null && post.track !== null && !isPublishing;

	return (
		<MainView safeArea disableTouchableWrapper={true}>
			{isDescriptionFocused && (
				<TouchableWithoutFeedback onPress={handleDescriptionBlur}>
					<Animated.View
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							zIndex: 10,
							opacity: overlayOpacity,
						}}
					>
						<BlurView
							intensity={80}
							tint="dark"
							style={{
								flex: 1,
								backgroundColor: "rgba(0, 0, 0, 0.7)",
							}}
						/>
					</Animated.View>
				</TouchableWithoutFeedback>
			)}

			<Header backButton />
			<View className="flex-1">
				{isKeyboardVisible && (
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<View
							className="absolute inset-0"
							style={{
								backgroundColor: "rgba(0, 0, 0, 0.85)",
							}}
						/>
					</TouchableWithoutFeedback>
				)}

				<View className="flex-1 px-4">
					<View className="mt-6 items-center">
						<View className="relative">
							<PostPreview
								music={post.track}
								photo={post.photoUrl}
								onMusicPress={onMusicPress}
								onPhotoPress={onCamera}
							/>
						</View>
					</View>

					{post.location && (
						<View className="mt-4 p-3 bg-muted-foreground/10 rounded-xl flex-row justify-between items-center z-0">
							<Text className="text-muted-foreground text-sm flex-1">
								📍 {post.location}
							</Text>
							<TouchableOpacity
								onPress={() => setPost((prev) => ({ ...prev, location: null }))}
							>
								<XIcon size={20} color="#666" />
							</TouchableOpacity>
						</View>
					)}

					{!post.location && (
						<View className="flex flex-row justify-between gap-x-2 mt-8 mx-auto z-0">
							<View className="w-44">
								<Button size="default" variant="secondary" onPress={onLocalize}>
									<View className="flex flex-row">
										<MapPinIcon size={24} />
										<Text className="text-lg mx-4 self-center">Location</Text>
									</View>
								</Button>
							</View>
						</View>
					)}
					<Animated.View
						className="mt-8 z-20"
						style={{ transform: [{ translateY }] }}
					>
						<View className="px-4 pb-6">
							<Input
								value={post.caption}
								onChangeText={onDescriptionChange}
								placeholder="Description..."
								multiline
								numberOfLines={3}
								maxLength={200}
								className="text-muted-foreground text-base p-2"
								style={{
									textAlignVertical: "top",
									minHeight: 60,
								}}
								returnKeyType="done"
								onFocus={handleDescriptionFocus}
								onBlur={handleDescriptionBlur}
							/>
						</View>
					</Animated.View>

					<View className="px-4 pb-6">
						<Button
							disabled={!canPublish}
							variant="secondary"
							size="lg"
							onPress={onPublish}
						>
							<View className="flex flex-row">
								<Text className="text-xl mx-4">
									{isPublishing ? "Publishing..." : "Publish capsule"}
								</Text>
							</View>
						</Button>
					</View>
				</View>
			</View>

			<BottomSheetComponent
				bottomSheetContent={
					<PhotoPicker onPhotoPick={onPhotoPick} onCancel={onPhotoCancel} />
				}
				ref={photoSheetRef}
				radius={23}
				snapPoints={["90%"]}
				locked={false}
				backgroundColor="#181818"
			/>

			<BottomSheetComponent
				bottomSheetContent={
					<MusicPicker onMusicSelect={onMusicSelect} onCancel={onMusicCancel} />
				}
				ref={musicSheetRef}
				radius={23}
				snapPoints={["90%"]}
				locked={false}
				backgroundColor="#181818"
				enableContentPanningGesture={false}
			/>
		</MainView>
	);
}
