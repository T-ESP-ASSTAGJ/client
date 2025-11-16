import { Button } from "@/components/rnr-ui/button";
import { useCamera } from "@/hooks/useCamera";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { Camera } from "lucide-react-native";
import React, { useState, useEffect, useRef } from "react";
import {
	FlatList,
	Image,
	Linking,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
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
const MAX_POLL_ATTEMPTS = 20;
const POLL_INTERVAL_MS = 200;

const PhotoPicker = ({ onPhotoPick, onCancel }) => {
	const [photos, setPhotos] = useState([]);
	const [selectedPhoto, setSelectedPhoto] = useState(null);
	const [mainPhoto, setMainPhoto] = useState(null);
	const [gridWidth, setGridWidth] = useState(0);
	const [permissionDenied, setPermissionDenied] = useState(false);
	const [hasLimitedAccess, setHasLimitedAccess] = useState(false);
	const [endCursor, setEndCursor] = useState(null);
	const [hasNextPage, setHasNextPage] = useState(true);
	const [isLoadingMore, setIsLoadingMore] = useState(false);

	const gridRef = useRef(null);
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
			const newPhoto = { id: `camera-${Date.now()}`, uri };
			setMainPhoto(newPhoto);
			setSelectedPhoto(newPhoto);
			setPhotos([newPhoto, ...photos]);
		},
		allowMockImage: true,
		cameraType: ImagePicker.CameraType.back,
		allowsEditing: false,
		quality: 1,
	});

	const fetchPhotos = async (loadMore = false) => {
		const media = await MediaLibrary.getAssetsAsync({
			first: 100,
			mediaType: "photo",
			sortBy: ["creationTime"],
			after: loadMore ? endCursor : undefined,
		});

		setPhotos((prev) => (loadMore ? [...prev, ...media.assets] : media.assets));
		setEndCursor(media.endCursor);
		setHasNextPage(media.hasNextPage);

		return media;
	};

	const loadPhotos = async (loadMore = false) => {
		const { status, accessPrivileges } = loadMore
			? await MediaLibrary.getPermissionsAsync()
			: await MediaLibrary.requestPermissionsAsync();

		if (status === "denied") {
			setPermissionDenied(true);
			return;
		}

		setPermissionDenied(false);
		setHasLimitedAccess(accessPrivileges === "limited");

		if (status === "granted") {
			await fetchPhotos(loadMore);
		}
	};

	const loadMorePhotos = async () => {
		if (!hasNextPage || isLoadingMore) return;

		setIsLoadingMore(true);
		await loadPhotos(true);
		setIsLoadingMore(false);
	};

	const addMorePhotos = async () => {
		const beforeMedia = await MediaLibrary.getAssetsAsync({
			first: 1,
			mediaType: "photo",
		});
		const beforeCount = beforeMedia.totalCount;

		await MediaLibrary.presentPermissionsPickerAsync();

		let attempts = 0;
		while (attempts < MAX_POLL_ATTEMPTS) {
			await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));

			const currentMedia = await MediaLibrary.getAssetsAsync({
				first: 1,
				mediaType: "photo",
			});

			attempts++;

			if (currentMedia.totalCount !== beforeCount) {
				break;
			}
		}

		const { status, accessPrivileges } =
			await MediaLibrary.getPermissionsAsync();

		if (status === "granted") {
			setHasLimitedAccess(accessPrivileges === "limited");
			await fetchPhotos(false);
		}
	};

	const selectPhoto = (photo) => {
		setMainPhoto(photo);
		setSelectedPhoto(photo);
	};

	const handleValidate = () => {
		onPhotoPick(selectedPhoto?.uri || null);
	};

	const onGridLayout = (event) => {
		setGridWidth(event.nativeEvent.layout.width);
	};

	const pinchGesture = Gesture.Pinch()
		.onUpdate((e) => {
			scale.value = savedScale.value * e.scale;
		})
		.onEnd(() => {
			const clampedScale = Math.min(Math.max(scale.value, 1), 3);
			scale.value = withSpring(clampedScale);
			savedScale.value = clampedScale;
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

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [
			{ translateX: translateX.value },
			{ translateY: translateY.value },
			{ scale: scale.value },
		],
	}));

	const renderGridItem = ({ item }) => {
		if (GRID_ITEM_SIZE === 0) return null;

		const itemStyle = {
			width: GRID_ITEM_SIZE,
			height: GRID_ITEM_SIZE,
			margin: ITEM_SPACING / 2,
		};

		if (item.id === "camera") {
			return (
				<TouchableOpacity
					onPress={launchCamera}
					style={[
						itemStyle,
						{
							backgroundColor: "#1f2937",
							justifyContent: "center",
							alignItems: "center",
						},
					]}
				>
					<Camera color="white" size={40} />
				</TouchableOpacity>
			);
		}

		const isSelected = selectedPhoto?.id === item.id;

		return (
			<TouchableOpacity onPress={() => selectPhoto(item)} style={itemStyle}>
				<Image
					source={{ uri: item.uri }}
					style={{ width: "100%", height: "100%" }}
				/>
				{isSelected && (
					<>
						<View className="absolute top-2 right-2 w-6 h-6 rounded-full bg-blue-500 justify-center items-center border-2 border-white" />
						<View className="absolute inset-0 bg-blue-500/30" />
					</>
				)}
			</TouchableOpacity>
		);
	};

	const renderHeader = () => (
		<View className="flex-row justify-between items-center px-4 py-3">
			<TouchableOpacity onPress={onCancel}>
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
	);

	const renderMainPhoto = () => (
		<View className="w-full items-center bg-black">
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
	);

	const renderPermissionDenied = () => (
		<View className="justify-center items-center px-6 mt-4">
			<Text className="text-base font-semibold text-gray-800 text-center mb-2">
				Photo Library Access Denied
			</Text>
			<Text className="text-sm text-gray-600 text-center mb-4">
				Please enable photo library access in settings.
			</Text>
			<TouchableOpacity
				onPress={Linking.openSettings}
				className="bg-blue-500 px-5 py-2.5 rounded-lg"
			>
				<Text className="text-white font-semibold text-sm">Open Settings</Text>
			</TouchableOpacity>
		</View>
	);

	const renderLimitedAccessBanner = () =>
		hasLimitedAccess && (
			<View className="px-4 mt-4 flex-row items-center justify-between">
				<Text className="text-sm text-gray-600 w-2/3">
					You gave access to a certain number of photos and videos.
				</Text>
				<Button onPress={addMorePhotos} variant="secondary">
					<Text className="text-sm font-medium ml-2">Manage</Text>
				</Button>
			</View>
		);

	const renderPhotoGrid = () => (
		<View className="mt-6 h-1/3" ref={gridRef} onLayout={onGridLayout}>
			<FlatList
				data={
					permissionDenied ? [{ id: "camera" }] : [{ id: "camera" }, ...photos]
				}
				renderItem={renderGridItem}
				keyExtractor={(item) => item.id}
				numColumns={NUM_COLUMNS}
				contentContainerStyle={{ paddingBottom: permissionDenied ? 20 : 80 }}
				onEndReached={permissionDenied ? undefined : loadMorePhotos}
				onEndReachedThreshold={0.5}
				ListFooterComponent={
					isLoadingMore ? (
						<View className="py-4 items-center">
							<Text className="text-gray-500">Loading more...</Text>
						</View>
					) : null
				}
			/>
			{permissionDenied && renderPermissionDenied()}
		</View>
	);

	return (
		<GestureHandlerRootView className="flex-1">
			<View className="flex-1">
				{renderHeader()}
				{renderMainPhoto()}
				{renderLimitedAccessBanner()}
				{renderPhotoGrid()}
			</View>
		</GestureHandlerRootView>
	);
};

export default PhotoPicker;
