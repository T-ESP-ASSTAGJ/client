import { getTracks } from "@/actions/post/post.action";
import type { ITrack } from "@/app/(tabs)/home/_types/post.types";
import { Input } from "@/components/rnr-ui/input";
import { useAudio } from "@/contexts/audio-context";
import { PauseCircle, PlayCircle } from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	Image,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

interface MusicPickerProps {
	onMusicSelect: (music: ITrack) => void;
	onCancel?: () => void;
}

export default function MusicPicker({ onMusicSelect }: MusicPickerProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [activeTab, setActiveTab] = useState<"search" | "collection">(
		"collection",
	);
	const [tracks, setTracks] = useState<ITrack[]>([]);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const [hasNextPage, setHasNextPage] = useState(true);
	const { pausePost, playPost, isPlaying, isCurrentlyPlaying, currentPostId } =
		useAudio();

	const fetchTracksData = useCallback(
		async (pageNum: number, isLoadMore = false) => {
			if (isLoadMore && (!hasNextPage || isLoadingMore)) return;
			try {
				if (isLoadMore) {
					setIsLoadingMore(true);
				} else {
					setIsLoading(true);
				}

				const response = await getTracks(pageNum);

				if (response.success) {
					const newTracks = response.data;

					if (newTracks.length === 0) {
						setHasNextPage(false);
					} else {
						setTracks((prev) =>
							isLoadMore ? [...prev, ...newTracks] : newTracks,
						);
						setPage(pageNum);
					}
				}
			} catch (err) {
				console.error("Failed to fetch tracks:", err);
			} finally {
				setIsLoading(false);
				setIsLoadingMore(false);
			}
		},
		[hasNextPage, isLoadingMore],
	);

	async function playTrack(item: ITrack) {
		if (isPlaying(item.id)) {
			await pausePost(item.id);
			return;
		}
		if (isCurrentlyPlaying) {
			await pausePost(currentPostId);
		}
		await playPost(item.id, item.metadata.previewUrl);
	}

	useEffect(() => {
		fetchTracksData(1);
	}, []);

	const loadMoreTracks = () => {
		if (!isLoadingMore && hasNextPage) {
			fetchTracksData(page + 1, true);
		}
	};

	const filteredMusic = tracks.filter(
		(music) =>
			music.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			music.artist.name.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	const renderMusicItem = ({ item }: { item: ITrack }) => (
		<TouchableOpacity
			onPress={() => onMusicSelect(item)}
			className="flex-row items-center px-4 py-3 active:bg-white/5"
		>
			<View className="w-12 h-12 rounded-md overflow-hidden mr-3 bg-red-600">
				<Image
					source={{ uri: item.coverUrl }}
					className="w-full h-full"
					resizeMode="cover"
				/>
			</View>

			<View className="flex-1">
				<View className="flex-row items-center gap-x-2">
					<Text className="text-white font-semibold text-base">
						{item.title}
					</Text>
					<View className="bg-white/20 px-1.5 py-0.5 rounded">
						<Text className="text-white text-[10px] font-bold">E</Text>
					</View>
				</View>
				<Text className="text-gray-400 text-sm mt-0.5">{item.artist.name}</Text>
			</View>

			<TouchableOpacity className="w-8 h-8" onPress={() => playTrack(item)}>
				{isPlaying(item.id) ? (
					<PauseCircle size={24} color="#BDBDBD" />
				) : (
					<PlayCircle size={24} color="#BDBDBD" />
				)}
			</TouchableOpacity>
		</TouchableOpacity>
	);

	const renderFooter = () => {
		if (!isLoadingMore) return null;

		return (
			<View className="py-4 items-center">
				<ActivityIndicator size="small" color="#ffffff" />
				<Text className="text-gray-500 mt-2">Loading more...</Text>
			</View>
		);
	};

	const renderEmpty = () => {
		if (isLoading) {
			return (
				<View className="flex-1 items-center justify-center py-10">
					<ActivityIndicator size="large" color="#ffffff" />
				</View>
			);
		}

		return (
			<View className="flex-1 items-center justify-center py-10">
				<Text className="text-gray-500">No tracks found</Text>
			</View>
		);
	};

	return (
		<View className="flex-1 bg-[#181818]">
			<View className="border-b border-gray-800">
				<View className="flex-row px-4 pt-4">
					<TouchableOpacity
						onPress={() => setActiveTab("search")}
						className="flex-1 pb-3"
					>
						<Text
							className={`text-center text-base ${
								activeTab === "search"
									? "text-white font-semibold"
									: "text-gray-500"
							}`}
						>
							Recherche
						</Text>
						{activeTab === "search" && (
							<View className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
						)}
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => setActiveTab("collection")}
						className="flex-1 pb-3"
					>
						<Text
							className={`text-center text-base ${
								activeTab === "collection"
									? "text-white font-semibold"
									: "text-gray-500"
							}`}
						>
							Collection
						</Text>
						{activeTab === "collection" && (
							<View className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
						)}
					</TouchableOpacity>
				</View>
			</View>

			<View className="px-4 py-3 border-b border-gray-800">
				<View className="flex-row items-center rounded-lg px-3 py-2">
					<Input
						value={searchQuery}
						iconLeft={"magnifyingglass"}
						iconLeftColor={"white"}
						onChangeText={setSearchQuery}
						placeholder="Search for a music..."
						placeholderTextColor="#666"
						className="flex-1 ml-2 text-base p-0 border-0"
					/>
				</View>
			</View>

			<View className="h-2/3">
				<FlatList
					data={filteredMusic}
					renderItem={renderMusicItem}
					keyExtractor={(item, index) => `${item.id || item.title}-${index}`}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingBottom: 80 }}
					ItemSeparatorComponent={() => (
						<View className="h-[1px] bg-gray-800/50 ml-16" />
					)}
					onEndReached={loadMoreTracks}
					onEndReachedThreshold={0.5}
					ListFooterComponent={renderFooter}
					ListEmptyComponent={renderEmpty}
				/>
			</View>
		</View>
	);
}
