import { MainView } from "@/components/ui/MainView";
import {useCallback, useEffect, useState} from "react";
import {Platform, RefreshControl, View} from "react-native";
import { IUserPostsResponse, IPost } from "@/types/posts/post";
import Post from "@/app/(tabs)/home/_components/post";
import { FlashList } from "@shopify/flash-list";
import {HeaderAuth} from "@/components/ui/header/header-auth";

export default function HomePage() {
    const [posts, setPosts] = useState<IUserPostsResponse>();
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        setPosts({
            posts: [
                {
                    id: 201,
                    user_post: {
                        id: 501,
                        username: "melody_life",
                        profile_picture: "https://github.com/shadcn.png"
                    },
                    music: {
                        title: "Midnight Vibes",
                        artist: "Luna Waves",
                        music_cover: require("@/assets/mock-data/post/music_cover1.png"),
                        release_date: "2009-12-04T00:00:00Z",
                        preview_url: "https://example.com/preview1.mp3",
                        streaming_links: {
                            spotify: "https://open.spotify.com/track/abc123",
                            apple_music: "https://music.apple.com/track/xyz456"
                        }
                    },
                    description: "Soirée chill au bord de la Seine ✨",
                    photo: require("@/assets/mock-data/post/photo1.png"),
                    location: "Paris, France",
                    created_at: "2024-02-10T20:45:00Z",
                    stats: {
                        likes: 134,
                        comments: 18
                    }
                },
                {
                    id: 202,
                    user_post: {
                        id: 502,
                        username: "travel_guru",
                        profile_picture: "https://github.com/evilrabbit.png"
                    },
                    music: {
                        title: "Wanderlust",
                        artist: "Nomad Beats",
                        music_cover: require("@/assets/mock-data/post/music_cover2.png"),
                        release_date: "2023-02-13T00:00:00Z",
                        preview_url: "https://example.com/preview2.mp3",
                        streaming_links: {
                            deezer: "https://www.deezer.com/track/def789"
                        }
                    },
                    description: "Vue imprenable depuis les montagnes suisses 🏔️",
                    photo: require("@/assets/mock-data/post/photo2.png"),
                    location: "Zermatt, Switzerland",
                    created_at: "2024-03-22T09:15:00Z",
                    stats: {
                        likes: 89,
                        comments: 7
                    }
                }
            ],
            pagination: {
                page: 1,
                limit: 20,
                has_next: true,
                last_post_id: 202
            }
        })
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        console.log("🔄 refresh feed…");
        setTimeout(() => {
            setRefreshing(false);
            console.log("✅ refresh terminé");
        }, 1000);
    }, []);

	return (
		<MainView safeArea={false}>
            <HeaderAuth searchIcon />
            <View className={"w-full h-full"}>
                <FlashList<IPost>
                    data={posts?.posts ?? []}
                    numColumns={1}
                    renderItem={({ item } ) => (
                        <View className="m-auto">
                            <Post
                                key={item.id}
                                post={item}
                            />
                        </View>
                    )}
                    contentContainerStyle={{ paddingBottom: 180 }}
                    estimatedItemSize={60}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            tintColor="#000000"
                            titleColor="#000000"
                            colors={["#ffffff"]}
                            progressBackgroundColor="#ffffff"
                            progressViewOffset={Platform.select({ ios: 24, android: 16 })}
                        />
                    }
                />
            </View>
		</MainView>
	);
}
