import { fontFamily } from "@/dimensions/font-family";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { Bookmark, Eye, Grid3X3, Heart } from "lucide-react-native";
import * as React from "react";
import {
	Animated,
	Dimensions,
	FlatList,
	Modal,
	Pressable,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from "react-native";
import { Easing } from "react-native-reanimated";
import { TabView } from "react-native-tab-view";

import Post from "@/app/(tabs)/home/_components/post/post";
import type { ICommentResponse } from "@/types/comments/comment.types";
import type { IPost } from "@/types/post/post.types";

type RouteKey = "posts" | "liked" | "saved";

type Route = {
	key: RouteKey;
	title: string;
};

// ---------- MOCKS POUR TESTER ----------

const MOCK_POSTS: IPost[] = [
	{
		id: 1,
		user: {
			id: 10,
			username: "lofi_artist",
			profilePicture:
				"https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
		},
		caption: "Vibes du soir 🌙",
		photoUrl:
			"https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg",
		track: {
			id: 101,
			title: "Midnight Breeze",
			coverUrl:
				"https://images.pexels.com/photos/164745/pexels-photo-164745.jpeg",
			metadata: { duration: 180, genre: "lofi" },
			artist: { id: 201, name: "Chill Master" },
		},
		location: "Paris, France",
		created_at: "2025-11-22T20:15:00.000Z",
		stats: { likes: 128, comments: 12 },
	},
	{
		id: 2,
		user: {
			id: 11,
			username: "house_lover",
			profilePicture:
				"https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
		},
		caption: "Petit drop maison 🧡",
		photoUrl:
			"https://images.pexels.com/photos/34422211/pexels-photo-34422211/free-photo-of-vue-panoramique-sur-la-ville-cotiere-de-kotor-montenegro.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
		track: {
			id: 102,
			title: "Sunset Groove",
			coverUrl:
				"https://images.pexels.com/photos/164716/pexels-photo-164716.jpeg",
			metadata: { duration: 210, genre: "house" },
			artist: { id: 202, name: "DJ Sunset" },
		},
		location: "Lyon, France",
		created_at: "2025-11-20T18:42:00.000Z",
		stats: { likes: 342, comments: 48 },
	},
	{
		id: 3,
		user: {
			id: 12,
			username: "trap_master",
			profilePicture:
				"https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
		},
		caption: "808s bumping hard 🔥",
		photoUrl:
			"https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg",
		track: {
			id: 103,
			title: "Skrrt Dreams",
			coverUrl:
				"https://images.pexels.com/photos/1049622/pexels-photo-1049622.jpeg",
			metadata: { duration: 190, genre: "trap" },
			artist: { id: 203, name: "808God" },
		},
		location: "Marseille, France",
		created_at: "2025-11-18T16:10:00.000Z",
		stats: { likes: 890, comments: 102 },
	},
	{
		id: 4,
		user: {
			id: 13,
			username: "ambient_dreamer",
			profilePicture:
				"https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg",
		},
		caption: "Floating away ☁️",
		photoUrl:
			"https://images.pexels.com/photos/2081121/pexels-photo-2081121.jpeg",
		track: {
			id: 104,
			title: "Cloud Patterns",
			coverUrl:
				"https://images.pexels.com/photos/733852/pexels-photo-733852.jpeg",
			metadata: { duration: 240, genre: "ambient" },
			artist: { id: 204, name: "Soft Horizon" },
		},
		location: "Bordeaux, France",
		created_at: "2025-11-15T11:12:00.000Z",
		stats: { likes: 452, comments: 33 },
	},
	{
		id: 5,
		user: {
			id: 14,
			username: "edm_vibes",
			profilePicture:
				"https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg",
		},
		caption: "Festival energy ⚡️",
		photoUrl:
			"https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg",
		track: {
			id: 105,
			title: "Rave Pulse",
			coverUrl:
				"https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg",
			metadata: { duration: 200, genre: "edm" },
			artist: { id: 205, name: "Pulse Rider" },
		},
		location: "Nice, France",
		created_at: "2025-11-10T19:00:00.000Z",
		stats: { likes: 1023, comments: 77 },
	},
	{
		id: 6,
		user: {
			id: 15,
			username: "hiphop_soul",
			profilePicture:
				"https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
		},
		caption: "Old school never dies 🎤",
		photoUrl:
			"https://images.pexels.com/photos/1183261/pexels-photo-1183261.jpeg",
		track: {
			id: 106,
			title: "Golden Era",
			coverUrl:
				"https://images.pexels.com/photos/704767/pexels-photo-704767.jpeg",
			metadata: { duration: 170, genre: "hip-hop" },
			artist: { id: 206, name: "Retro Flow" },
		},
		location: "Toulouse, France",
		created_at: "2025-11-08T09:45:00.000Z",
		stats: { likes: 560, comments: 29 },
	},
	{
		id: 7,
		user: {
			id: 16,
			username: "chill_cafe",
			profilePicture:
				"https://images.pexels.com/photos/1819644/pexels-photo-1819644.jpeg",
		},
		caption: "Morning latte + vibes ☕🎶",
		photoUrl:
			"https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg",
		track: {
			id: 107,
			title: "Warm Mornings",
			coverUrl:
				"https://images.pexels.com/photos/373076/pexels-photo-373076.jpeg",
			metadata: { duration: 165, genre: "lofi" },
			artist: { id: 207, name: "Lazy Beats" },
		},
		location: "Montpellier, France",
		created_at: "2025-11-05T14:21:00.000Z",
		stats: { likes: 210, comments: 14 },
	},
	{
		id: 8,
		user: {
			id: 17,
			username: "techno_addict",
			profilePicture:
				"https://images.pexels.com/photos/1036627/pexels-photo-1036627.jpeg",
		},
		caption: "Warehouse night 🖤",
		photoUrl:
			"https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg",
		track: {
			id: 108,
			title: "Dark Pulse",
			coverUrl:
				"https://images.pexels.com/photos/167404/pexels-photo-167404.jpeg",
			metadata: { duration: 230, genre: "techno" },
			artist: { id: 208, name: "Nocturne" },
		},
		location: "Berlin, Allemagne",
		created_at: "2025-11-04T22:30:00.000Z",
		stats: { likes: 1310, comments: 89 },
	},
	{
		id: 9,
		user: {
			id: 18,
			username: "nature_feels",
			profilePicture:
				"https://images.pexels.com/photos/912388/pexels-photo-912388.jpeg",
		},
		caption: "Just breathe 🍃",
		photoUrl:
			"https://images.pexels.com/photos/1671325/pexels-photo-1671325.jpeg",
		track: {
			id: 109,
			title: "Forest Echoes",
			coverUrl:
				"https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg",
			metadata: { duration: 250, genre: "ambient" },
			artist: { id: 209, name: "Leaf Whisper" },
		},
		location: "Annecy, France",
		created_at: "2025-11-02T15:42:00.000Z",
		stats: { likes: 780, comments: 25 },
	},
	{
		id: 10,
		user: {
			id: 19,
			username: "vintage_soul",
			profilePicture:
				"https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg",
		},
		caption: "Retro vibes forever 📼",
		photoUrl:
			"https://images.pexels.com/photos/1415131/pexels-photo-1415131.jpeg",
		track: {
			id: 110,
			title: "Old Movie Love",
			coverUrl:
				"https://images.pexels.com/photos/1619319/pexels-photo-1619319.jpeg",
			metadata: { duration: 185, genre: "indie" },
			artist: { id: 210, name: "Soft Tapes" },
		},
		location: "Strasbourg, France",
		created_at: "2025-11-01T17:05:00.000Z",
		stats: { likes: 345, comments: 19 },
	},
];

const MOCK_COMMENTS: ICommentResponse = {
	comments: [],
	total: 0,
} as unknown as ICommentResponse;

const DATA = MOCK_POSTS.map((post) => ({
	id: `post-${post.id}`,
	thumbnail: post.photoUrl,
	views: post.stats?.likes ?? 0,
}));

const NUM_COLUMNS = 3;
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const ITEM_SPACING = 2;
const ITEM_SIZE =
	(SCREEN_WIDTH - ITEM_SPACING * (NUM_COLUMNS + 1)) / NUM_COLUMNS;

// ---------- MODALE DETAIL TIKTOK (FlatList verticale) ----------

type PostDetailPagerProps = {
	visible: boolean;
	initialIndex: number;
	onClose: () => void;
};

const PostDetailPager: React.FC<PostDetailPagerProps> = ({
	visible,
	initialIndex,
	onClose,
}) => {
	const listRef = React.useRef<FlatList<IPost>>(null);

	React.useEffect(() => {
		if (!visible) return;

		setTimeout(() => {
			if (
				listRef.current &&
				initialIndex >= 0 &&
				initialIndex < MOCK_POSTS.length
			) {
				listRef.current.scrollToIndex({
					index: initialIndex,
					animated: false,
				});
			}
		}, 0);
	}, [visible, initialIndex]);

	return (
		<Modal
			visible={visible}
			animationType="slide"
			onRequestClose={onClose}
			presentationStyle="fullScreen"
		>
			<View style={{ flex: 1, backgroundColor: "#000" }}>
				<Pressable
					onPress={onClose}
					style={{
						position: "absolute",
						top: 60,
						right: 16,
						zIndex: 10,
						width: 32,
						height: 32,
						borderRadius: 16,
						alignItems: "center",
						justifyContent: "center",
						backgroundColor: "#181818",
					}}
					hitSlop={10}
				>
					<Text
						style={{
							color: "#fff",
							fontSize: 18,
							fontWeight: "700",
						}}
					>
						✕
					</Text>
				</Pressable>

				<FlatList
					ref={listRef}
					data={MOCK_POSTS}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<View
							style={{
								width: SCREEN_WIDTH,
								height: SCREEN_HEIGHT,
								justifyContent: "center",
								paddingHorizontal: 12,
							}}
						>
							<Post post={item} comments={MOCK_COMMENTS} />
						</View>
					)}
					pagingEnabled
					showsVerticalScrollIndicator={false}
					getItemLayout={(_, index) => ({
						length: SCREEN_HEIGHT,
						offset: SCREEN_HEIGHT * index,
						index,
					})}
				/>
			</View>
		</Modal>
	);
};

// ---------- SCENE POSTS (FlashList en grid) ----------

type PostsRouteProps = {
	onPressPost: (index: number) => void;
};

export const PostsRoute: React.FC<PostsRouteProps> = ({ onPressPost }) => {
	return (
		<FlashList
			data={DATA}
			numColumns={NUM_COLUMNS}
			keyExtractor={(item) => item.id}
			estimatedItemSize={ITEM_SIZE}
			horizontal={false}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={styles.gridContent}
			renderItem={({ item, index }) => (
				<Pressable
					className="relative"
					style={styles.gridItem}
					onPress={() => onPressPost(index)}
				>
					<Image source={{ uri: item.thumbnail }} style={styles.gridImage} />

					<View className="absolute w-full bottom-0 h-auto py-px">
						<View className="flex flex-row items-center gap-1">
							<Eye size={14} color="white" style={{ marginLeft: 4 }} />
							<Text
								className="text-white text-sm"
								style={{ fontFamily: fontFamily.bold }}
							>
								{item.views} K
							</Text>
						</View>
					</View>
				</Pressable>
			)}
		/>
	);
};

// ---------- ICÔNES POUR LES TABS ----------

const getIconForRoute = (key: RouteKey) => {
	switch (key) {
		case "posts":
			return Grid3X3;
		case "liked":
			return Heart;
		case "saved":
			return Bookmark;
		default:
			return Grid3X3;
	}
};

// ---------- NOTRE TAB BAR CUSTOM ----------

const CustomTabBar = (props: any) => {
	const { navigationState, jumpTo } = props;
	const layout = useWindowDimensions();

	const tabWidth = layout.width / navigationState.routes.length;

	const animatedIndex = React.useRef(
		new Animated.Value(navigationState.index),
	).current;

	React.useEffect(() => {
		Animated.timing(animatedIndex, {
			toValue: navigationState.index,
			duration: 180,
			easing: Easing.out(Easing.ease),
			useNativeDriver: true,
		}).start();
	}, [navigationState.index]);

	const translateX = animatedIndex.interpolate({
		inputRange: navigationState.routes.map((_: Route, i: number) => i),
		outputRange: navigationState.routes.map((_: Route, i: number) => i * 125),
	});

	return (
		<View style={styles.customTabBarContainer}>
			<View style={styles.customTabBarInner}>
				{navigationState.routes.map((route: Route, index: number) => {
					const Icon = getIconForRoute(route.key);
					const focused = navigationState.index === index;

					return (
						<Pressable
							key={route.key}
							style={styles.tabItem}
							onPress={() => jumpTo(route.key)}
						>
							<Icon
								size={20}
								color={focused ? "#FFF" : "#666"}
								strokeWidth={focused ? 2.4 : 2}
							/>
						</Pressable>
					);
				})}
			</View>

			<Animated.View
				style={[
					styles.tabIndicator,
					{
						width: 118,
						marginLeft: 2,
						transform: [{ translateX }],
					},
				]}
			/>
		</View>
	);
};

// ---------- COMPOSANT PRINCIPAL ----------

export const ProfileTabs: React.FC = () => {
	const layout = useWindowDimensions();

	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState<Route[]>([
		{ key: "posts", title: "Posts" },
		{ key: "liked", title: "Liked" },
		{ key: "saved", title: "Saved" },
	]);

	const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

	const renderScene = ({ route }: { route: Route }) => {
		switch (route.key) {
			case "posts":
				return (
					<PostsRoute
						onPressPost={(idx) => {
							setSelectedIndex(idx);
						}}
					/>
				);
			default:
				return null;
		}
	};

	const isDetailVisible = selectedIndex !== null;
	const initialIndex = selectedIndex ?? 0;

	return (
		<View style={styles.container}>
			<TabView
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={setIndex}
				initialLayout={{ width: layout.width }}
				renderTabBar={(props) => <CustomTabBar {...props} />}
			/>

			<PostDetailPager
				visible={isDetailVisible}
				initialIndex={initialIndex}
				onClose={() => setSelectedIndex(null)}
			/>
		</View>
	);
};

// ---------- STYLES ----------

const styles = StyleSheet.create({
	container: { flex: 1 },
	customTabBarContainer: {
		position: "relative",
		backgroundColor: "#000",
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: "#222",
	},
	customTabBarInner: {
		flexDirection: "row",
	},
	tabItem: {
		flex: 1,
		alignItems: "center",
		paddingVertical: 10,
	},
	tabIndicator: {
		position: "absolute",
		bottom: 0,
		left: 0,
		height: 2.5,
		borderRadius: 999,
		backgroundColor: "#FFF",
	},
	gridContent: {
		paddingTop: 4,
		paddingBottom: 80,
	},
	gridItem: {
		width: ITEM_SIZE,
		height: ITEM_SIZE,
		overflow: "hidden",
		borderWidth: 1.5,
		borderColor: "#111",
	},
	gridImage: {
		width: "100%",
		height: "100%",
	},
});
