import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert, Platform } from "react-native";

let Device: any = null;

try {
	Device = require("expo-device");
} catch (e) {
	console.log("Device module not available:", e);
}

interface UseCameraOptions {
	onImageCaptured?: (uri: string) => void;
	allowMockImage?: boolean;
	cameraType?: ImagePicker.CameraType;
	quality?: number;
	aspect?: [number, number];
	allowsEditing?: boolean;
}

export function useCamera(options: UseCameraOptions = {}) {
	const {
		onImageCaptured,
		allowMockImage = true,
		cameraType = ImagePicker.CameraType.front,
		quality = 0.8,
		aspect = [4, 3],
		allowsEditing = true,
	} = options;

	const [isLoading, setIsLoading] = useState(false);
	const isSimulator = Device ? !Device.isDevice : Platform.OS === "ios";

	async function requestCameraPermissions() {
		const { status } = await ImagePicker.requestCameraPermissionsAsync();
		if (status !== "granted") {
			Alert.alert(
				"Permission Required",
				"Camera permission is needed to take photos.",
				[{ text: "OK" }],
			);
			return false;
		}
		return true;
	}

	function useMockImage() {
		const mockImageUrl = "https://picsum.photos/400/600";
		onImageCaptured?.(mockImageUrl);
		Alert.alert("Mock Image", "Using a test image for simulator");
	}

	async function openCamera() {
		const hasPermission = await requestCameraPermissions();
		if (!hasPermission) return;

		setIsLoading(true);
		try {
			const result = await ImagePicker.launchCameraAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing,
				aspect,
				quality,
				cameraType,
			});

			if (!result.canceled && result.assets[0]) {
				onImageCaptured?.(result.assets[0].uri);
			}
		} catch (error) {
			Alert.alert("Error", "Failed to open camera. Please try again.");
			console.error("Camera error:", error);
		} finally {
			setIsLoading(false);
		}
	}

	async function launchCamera() {
		if (isSimulator && allowMockImage) {
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

	return {
		launchCamera,
		isSimulator,
		isLoading,
	};
}
