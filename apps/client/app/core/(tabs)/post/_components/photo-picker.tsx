import { useCamera } from "@/hooks/useCamera";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { Camera } from "lucide-react-native";
import React, { useState, useEffect, useRef } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import {
	Gesture,
	GestureDetector,
	GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";

const NUM_COLUMNS = 3;
const ITEM_SPACING = 2;

const PhotoPicker = ({
	onPhotoPick,
	onCancel,
}: {
	onPhotoPick: (photoUri: string | null) => void;
	onCancel: () => void;
}) => {
	const [photos, setPhotos] = useState([]);
	const [selectedPhoto, setSelectedPhoto] = useState(null);
	const [mainPhoto, setMainPhoto] = useState(null);
	const [gridWidth, setGridWidth] = useState(0);
	const gridRef = useRef<View>(null);

	const scale = useSharedValue(1);
	const savedScale = useSharedValue(1);
	const translateX = useSharedValue(0);
	const translateY = useSharedValue(0);
	const savedTranslateX = useSharedValue(0);
	const savedTranslateY = useSharedValue(0);

	const GRID_ITEM_SIZE =
		gridWidth > 0
			? (gridWidth - ITEM_SPACING * (NUM_COLUMNS + 1)) / NUM_COLUMNS
			: 0;

	useEffect(() => {
		loadPhotos();
	}, []);

	useEffect(() => {
		scale.value = withSpring(1);
		savedScale.value = 1;
		translateX.value = withSpring(0);
		translateY.value = withSpring(0);
		savedTranslateX.value = 0;
		savedTranslateY.value = 0;
	}, [mainPhoto]);

	const { launchCamera } = useCamera({
		onImageCaptured: (uri) => {
			const newPhoto = {
				id: `camera-${Date.now()}`,
				uri: uri,
			};
			setMainPhoto(newPhoto);
			setSelectedPhoto(newPhoto);
			setPhotos([newPhoto, ...photos]);
		},
		allowMockImage: true,
		cameraType: ImagePicker.CameraType.back,
		allowsEditing: false,
		quality: 1,
	});

	const openCamera = async () => {
		await launchCamera();
	};

	const loadPhotos = async () => {
		const { status } = await MediaLibrary.requestPermissionsAsync();

		if (status !== "granted") {
			alert("Permission to access media library is required!");
			return;
		}

		const media = await MediaLibrary.getAssetsAsync({
			first: 100,
			mediaType: "photo",
			sortBy: ["creationTime"],
		});

		setPhotos(media.assets);
	};

	const selectPhoto = (photo) => {
		setMainPhoto(photo);
		setSelectedPhoto(photo);
	};

	const isPhotoSelected = (photoId) => {
		return selectedPhoto?.id === photoId;
	};

	const onGridLayout = (event) => {
		const { width } = event.nativeEvent.layout;
		setGridWidth(width);
	};

	const handleValidate = () => {
		if (selectedPhoto) {
			onPhotoPick(selectedPhoto.uri);
		} else {
			onPhotoPick(null);
		}
	};

	const handleCancel = () => {
		onCancel();
	};

	const pinchGesture = Gesture.Pinch()
		.onUpdate((e) => {
			scale.value = savedScale.value * e.scale;
		})
		.onEnd(() => {
			if (scale.value < 1) {
				scale.value = withSpring(1);
				savedScale.value = 1;
			} else if (scale.value > 3) {
				scale.value = withSpring(3);
				savedScale.value = 3;
			} else {
				savedScale.value = scale.value;
			}
		});

	const panGesture = Gesture.Pan()
		.onUpdate((e) => {
			translateX.value = savedTranslateX.value + e.translationX;
			translateY.value = savedTranslateY.value + e.translationY;
		})
		.onEnd(() => {
			savedTranslateX.value = translateX.value;
			savedTranslateY.value = translateY.value;
		});

	const doubleTap = Gesture.Tap()
		.numberOfTaps(2)
		.onEnd(() => {
			scale.value = withSpring(1);
			savedScale.value = 1;
			translateX.value = withSpring(0);
			translateY.value = withSpring(0);
			savedTranslateX.value = 0;
			savedTranslateY.value = 0;
		});

	const composedGesture = Gesture.Simultaneous(
		pinchGesture,
		panGesture,
		doubleTap,
	);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: translateX.value },
				{ translateY: translateY.value },
				{ scale: scale.value },
			],
		};
	});

	const renderGridItem = ({ item, index }) => {
		if (GRID_ITEM_SIZE === 0) return null;

		if (index === 0) {
			return (
				<TouchableOpacity
					onPress={openCamera}
					style={{
						width: GRID_ITEM_SIZE,
						height: GRID_ITEM_SIZE,
						margin: ITEM_SPACING / 2,
						backgroundColor: "#1f2937",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Camera color="white" size={40} />
				</TouchableOpacity>
			);
		}

		const selected = isPhotoSelected(item.id);

		return (
			<TouchableOpacity
				onPress={() => selectPhoto(item)}
				style={{
					width: GRID_ITEM_SIZE,
					height: GRID_ITEM_SIZE,
					margin: ITEM_SPACING / 2,
				}}
			>
				<Image
					source={{ uri: item.uri }}
					style={{ width: "100%", height: "100%" }}
				/>
				{selected && (
					<View className="absolute top-2 right-2 w-6 h-6 rounded-full bg-blue-500 justify-center items-center border-2 border-white" />
				)}
				{selected && <View className="absolute inset-0 bg-blue-500/30" />}
			</TouchableOpacity>
		);
	};

	return (
		<GestureHandlerRootView className="flex-1">
			<View className="flex-1">
				<View className="flex-row justify-between items-center px-4 py-3">
					<TouchableOpacity onPress={handleCancel}>
						<Text className="text-base text-gray-600">Cancel</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={handleValidate} disabled={!selectedPhoto}>
						<Text
							className={`text-base font-semibold ${selectedPhoto ? "text-blue-500" : "text-gray-300"}`}
						>
							Validate
						</Text>
					</TouchableOpacity>
				</View>

				<View className={"w-full items-center bg-black"}>
					<View className="h-[330px] w-[365px] overflow-hidden">
						{mainPhoto && (
							<GestureDetector gesture={composedGesture}>
								<Animated.View style={[animatedStyle, { flex: 1 }]}>
									<Image
										source={{ uri: mainPhoto.uri }}
										className="w-full h-full"
										resizeMode="contain"
									/>
								</Animated.View>
							</GestureDetector>
						)}
					</View>
				</View>

				<View className={"mt-6 h-1/3"} ref={gridRef} onLayout={onGridLayout}>
					<FlatList
						data={[{ id: "camera" }, ...photos]}
						renderItem={renderGridItem}
						keyExtractor={(item) => item.id}
						numColumns={NUM_COLUMNS}
						contentContainerStyle={{ paddingBottom: 80 }}
					/>
				</View>
			</View>
		</GestureHandlerRootView>
	);
};

export default PhotoPicker;
