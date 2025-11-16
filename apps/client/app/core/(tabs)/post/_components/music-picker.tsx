import type { IMusic } from "@/app/core/(tabs)/home/_types/post.types";
import { Input } from "@/components/rnr-ui/input";
import { useState } from "react";
import {
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface MusicPickerProps {
    onMusicSelect: (music: IMusic) => void;
    onCancel?: () => void;
}

const MOCK_MUSIC_DATA: IMusic[] = [
    {
        title: "A.C. Milan",
        artist: "Booba",
        music_cover: "https://picsum.photos/seed/acmilan1/400/400",
        release_date: "2023-01-15",
        preview_url: "https://example.com/preview1.mp3",
        streaming_links: {
            spotify: "https://open.spotify.com/track/example1",
            apple_music: "https://music.apple.com/track/example1",
        },
    },
    {
        title: "A.C. Milan",
        artist: "Booba",
        music_cover: "https://picsum.photos/seed/acmilan2/400/400",
        release_date: "2023-02-20",
        preview_url: "https://example.com/preview2.mp3",
        streaming_links: {
            spotify: "https://open.spotify.com/track/example2",
            apple_music: "https://music.apple.com/track/example2",
        },
    },
    {
        title: "A.C. Milan",
        artist: "Booba",
        music_cover: "https://picsum.photos/seed/acmilan3/400/400",
        release_date: "2023-03-10",
        preview_url: "https://example.com/preview3.mp3",
        streaming_links: {
            spotify: "https://open.spotify.com/track/example3",
            apple_music: "https://music.apple.com/track/example3",
        },
    },
    {
        title: "A.C. Milan",
        artist: "Booba",
        music_cover: "https://picsum.photos/seed/acmilan4/400/400",
        release_date: "2023-04-05",
        preview_url: "https://example.com/preview4.mp3",
        streaming_links: {
            spotify: "https://open.spotify.com/track/example4",
            apple_music: "https://music.apple.com/track/example4",
        },
    },
    {
        title: "A.C. Milan",
        artist: "Booba",
        music_cover: "https://picsum.photos/seed/acmilan5/400/400",
        release_date: "2023-05-12",
        preview_url: "https://example.com/preview5.mp3",
        streaming_links: {
            spotify: "https://open.spotify.com/track/example5",
            apple_music: "https://music.apple.com/track/example5",
        },
    },
    {
        title: "Blinding Lights",
        artist: "The Weeknd",
        music_cover: "https://picsum.photos/seed/blinding/400/400",
        release_date: "2019-11-29",
        preview_url: "https://example.com/preview6.mp3",
        streaming_links: {
            spotify: "https://open.spotify.com/track/example6",
            apple_music: "https://music.apple.com/track/example6",
        },
    },
    {
        title: "Save Your Tears",
        artist: "The Weeknd",
        music_cover: "https://picsum.photos/seed/tears/400/400",
        release_date: "2020-03-03",
        preview_url: "https://example.com/preview7.mp3",
        streaming_links: {
            spotify: "https://open.spotify.com/track/example7",
            apple_music: "https://music.apple.com/track/example7",
        },
    },
    {
        title: "Starboy",
        artist: "The Weeknd",
        music_cover: "https://picsum.photos/seed/starboy/400/400",
        release_date: "2016-09-21",
        preview_url: "https://example.com/preview8.mp3",
        streaming_links: {
            spotify: "https://open.spotify.com/track/example8",
            apple_music: "https://music.apple.com/track/example8",
        },
    },
    {
        title: "DKR",
        artist: "Booba",
        music_cover: "https://picsum.photos/seed/dkr/400/400",
        release_date: "2022-06-10",
        preview_url: "https://example.com/preview9.mp3",
        streaming_links: {
            spotify: "https://open.spotify.com/track/example9",
            apple_music: "https://music.apple.com/track/example9",
        },
    },
    {
        title: "Ultra",
        artist: "Booba",
        music_cover: "https://picsum.photos/seed/ultra/400/400",
        release_date: "2021-03-05",
        preview_url: "https://example.com/preview10.mp3",
        streaming_links: {
            spotify: "https://open.spotify.com/track/example10",
            apple_music: "https://music.apple.com/track/example10",
        },
    },
];

export default function MusicPicker({
                                          onMusicSelect,
                                      }: MusicPickerProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState<"search" | "collection">("collection");

    const filteredMusic = MOCK_MUSIC_DATA.filter(
        (music) =>
            music.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            music.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderMusicItem = ({ item }: { item: IMusic; index: number }) => (
        <TouchableOpacity
            onPress={() => onMusicSelect(item)}
            className="flex-row items-center px-4 py-3 active:bg-white/5"
        >
            <View className="w-12 h-12 rounded-md overflow-hidden mr-3 bg-red-600">
                <Image
                    source={{ uri: item.music_cover }}
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
                <Text className="text-gray-400 text-sm mt-0.5">{item.artist}</Text>
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
                        iconLeft={'magnifyingglass'}
                        iconLeftColor={'white'}
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