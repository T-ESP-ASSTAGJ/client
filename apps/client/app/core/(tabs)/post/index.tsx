import type { IMusic } from "@/app/core/(tabs)/home/_types/post.types";
import PhotoPicker from "@/app/core/(tabs)/post/_components/photo-picker";
import { Input } from "@/components/rnr-ui/input";
import { MainView } from "@/components/ui/MainView";
import {
	BottomSheetComponent,
	type BottomSheetComponentRef,
} from "@/components/ui/bottom-sheet/bottom-sheet-component";
import { Header } from "@/components/ui/header/header";
import { TouchableButton } from "@/components/ui/touchable-button";
import * as ImagePicker from "expo-image-picker";
import { MapPinIcon, RocketIcon, XIcon } from "lucide-react-native";
import { useRef, useState } from "react";
import { Alert, Platform, Text, TouchableOpacity, View } from "react-native";
import PostPreview from "../post/_components/post-preview";

let Location: any = null;
let Device: any = null;

try {
	Location = require("expo-location");
} catch (e) {
	console.log("Location module not available:", e);
}

try {
	Device = require("expo-device");
} catch (e) {
	console.log("Device module not available:", e);
}

interface LocationData {
	latitude: number;
	longitude: number;
	address?: string;
}

export default function PostPage() {
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [selectedMusic, setSelectedMusic] = useState<IMusic | null>(null);
	const [location, setLocation] = useState<LocationData | null>(null);
	const [isPublishing, setIsPublishing] = useState(false);
	const [description, setDescription] = useState("");
	const sheetRef = useRef<BottomSheetComponentRef>(null);

	const isSimulator = Device ? !Device.isDevice : Platform.OS === "ios";

	function onPhotoPick(photoUri: string | null) {
		if (photoUri) {
			setSelectedImage(photoUri);
		}
		sheetRef.current?.dismiss();
	}

	function onCancel() {
		sheetRef.current?.dismiss();
	}

	async function requestCameraPermissions() {
		const { status } = await ImagePicker.requestCameraPermissionsAsync();
		if (status !== "granted") {
			Alert.alert(
				"Permission Required",
				"Camera permission is needed to take selfies.",
				[{ text: "OK" }],
			);
			return false;
		}
		return true;
	}

	function useMockImage() {
		const mockImageUrl = "https://picsum.photos/400/600";
		setSelectedImage(mockImageUrl);
		Alert.alert("Mock Image", "Using a test image for simulator");
	}

	async function onCamera() {
		sheetRef.current?.present();
		if (isSimulator) {
			Alert.alert(
				"Camera on Simulator",
				"Camera may not work properly on simulator. Would you like to use a mock image instead?",
				[
					{
						text: "Use Mock Image",
						onPress: useMockImage,
					},
					{
						text: "Try Camera Anyway",
						onPress: openCamera,
					},
					{
						text: "Cancel",
						style: "cancel",
					},
				],
			);
			return;
		}

		await openCamera();
	}

	async function openCamera() {
		const hasPermission = await requestCameraPermissions();
		if (!hasPermission) return;

		try {
			const result = await ImagePicker.launchCameraAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 0.8,
				cameraType: ImagePicker.CameraType.front,
			});

			if (!result.canceled && result.assets[0]) {
				setSelectedImage(result.assets[0].uri);
			}
		} catch (error) {
			Alert.alert("Error", "Failed to open camera. Please try again.");
			console.error("Camera error:", error);
		}
	}

	function onMusicPress() {
		if (isSimulator) {
			const mockMusic: IMusic = {
				title: "Blinding Lights",
				artist: "The Weeknd",
				music_cover: "https://picsum.photos/400/400",
				release_date: "2019-11-29",
				preview_url: "https://example.com/preview.mp3",
				streaming_links: {
					spotify: "https://open.spotify.com/track/example",
					apple_music: "https://music.apple.com/track/example",
				},
			};
			setSelectedMusic(mockMusic);
			Alert.alert("Mock Music", "Using test music for simulator");
		} else {
			// Real device - open music selection
			//TODO: MUSIC SELECTION
			Alert.alert("Music Selection", "Music selection feature coming soon!");
		}
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
							setLocation(mockLocation);
						},
					},
				],
			);
			return;
		}

		if (isSimulator) {
			Alert.alert(
				"Simulator Detected",
				"Using mock location for simulator testing.",
				[
					{
						text: "OK",
						onPress: () => {
							const mockLocation: LocationData = {
								latitude: 48.8566,
								longitude: 2.3522,
								address: "Paris, France (Simulator)",
							};
							setLocation(mockLocation);
						},
					},
				],
			);
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

			setLocation(locationData);
			Alert.alert("Success", "Location added successfully!");
		} catch (error) {
			Alert.alert("Error", "Failed to get location. Please try again.");
			console.error("Location error:", error);
		}
	}

	async function onPublish() {
		if (!selectedImage) {
			Alert.alert("Missing Content", "Please add a selfie before publishing.");
			return;
		}

		if (!selectedMusic) {
			Alert.alert("Missing Content", "Please select a song before publishing.");
			return;
		}

		setIsPublishing(true);

		try {
			const postData = {
				image: selectedImage,
				music: selectedMusic,
				location: location,
				timestamp: new Date().toISOString(),
			};

			console.log("Publishing post:", postData);

			await new Promise((resolve) => setTimeout(resolve, 1500));

			Alert.alert("Success!", "Your capsule has been published!", [
				{
					text: "OK",
					onPress: () => {
						setSelectedImage(null);
						setSelectedMusic(null);
						setLocation(null);
					},
				},
			]);
		} catch (error) {
			Alert.alert("Error", "Failed to publish capsule. Please try again.");
			console.error("Publish error:", error);
		} finally {
			setIsPublishing(false);
		}
	}

	const canPublish =
		selectedImage !== null && selectedMusic !== null && !isPublishing;

	return (
		<MainView safeArea disableTouchableWrapper={true}>
			<Header backButton />
			<View className={"h-full mx-auto"}>
				<View className={"mt-6 items-center"}>
					<View className={"relative"}>
						<PostPreview
							music={selectedMusic}
							photo={selectedImage}
							onMusicPress={onMusicPress}
							onPhotoPress={onCamera}
						/>
					</View>
				</View>

				{location && (
					<View
						className={
							"mt-4 p-3 bg-muted-foreground/10 rounded-xl flex-row justify-between items-center"
						}
					>
						<Text className={"text-muted-foreground text-sm flex-1"}>
							📍{" "}
							{location.address ||
								`${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`}
						</Text>
						<TouchableOpacity onPress={() => setLocation(null)}>
							<XIcon size={20} color="#666" />
						</TouchableOpacity>
					</View>
				)}

				{!location && (
					<View
						className={"flex flex-row justify-between gap-x-2 mt-8 mx-auto"}
					>
						<View className={"w-44"}>
							<TouchableButton
								className={"space-x-2"}
								variant={"primary"}
								onPress={onLocalize}
								leftIcon={<MapPinIcon size={24} />}
							>
								<Text>{"Location"}</Text>
							</TouchableButton>
						</View>
					</View>
				)}

				<View className={"mt-8"}>
					<Input
						value={description}
						onChangeText={setDescription}
						placeholder="Description..."
						placeholderTextColor="#666"
						multiline
						numberOfLines={3}
						maxLength={200}
						className={"text-muted-foreground text-base p-0"}
						style={{
							textAlignVertical: "top",
							minHeight: 60,
						}}
					/>
				</View>

				<View className={"absolute bottom-48 inset-x-0.5"}>
					<TouchableButton
						disabled={!canPublish}
						variant={"primary"}
						onPress={onPublish}
						leftIcon={<RocketIcon size={24} />}
					>
						<Text className={"text-xl"}>
							{isPublishing ? "Publishing..." : "Publish capsule"}
						</Text>
					</TouchableButton>
				</View>
				<BottomSheetComponent
					bottomSheetContent={
						<PhotoPicker onPhotoPick={onPhotoPick} onCancel={onCancel} />
					}
					ref={sheetRef}
					radius={23}
					snapPoints={["80%"]}
					locked={false}
					backgroundColor={"#181818"}
				/>
			</View>
		</MainView>
	);
}
