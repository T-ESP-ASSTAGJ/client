import { getTracks } from "@/actions/post/post.action";
import type { ITrack } from "@/app/(tabs)/home/_types/post.types";
import { Input } from "@/components/rnr-ui/input";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

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

	const fetchTracksData = async () => {
		try {
			const response = await getTracks();
			setTracks(response.data);
		} catch (err) {}
	};

	useEffect(() => {
		fetchTracksData();
	}, []);

	const filteredMusic = tracks.filter(
		(music) =>
			music.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			music.artist.name.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	const renderMusicItem = ({ item }: { item: ITrack; index: number }) => (
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

			<TouchableOpacity className="w-8 h-8 rounded-full border border-gray-600 items-center justify-center">
				<View className="w-0 h-0 ml-0.5 border-l-8 border-l-gray-400 border-t-4 border-t-transparent border-b-4 border-b-transparent" />
			</TouchableOpacity>
		</TouchableOpacity>
	);

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
				<View className="flex-row items-center  rounded-lg px-3 py-2">
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

			<FlatList
				data={filteredMusic}
				renderItem={renderMusicItem}
				keyExtractor={(item, index) => `${item.title}-${item.artist}-${index}`}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 20 }}
				ItemSeparatorComponent={() => (
					<View className="h-[1px] bg-gray-800/50 ml-16" />
				)}
			/>
		</View>
	);
}
