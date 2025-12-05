import { fontFamily } from "@/dimensions/font-family";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { Bookmark, Eye, Grid3X3, Heart } from "lucide-react-native";
import * as React from "react";
import {
	Animated,
	Dimensions,
	Pressable,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from "react-native";
import { Easing } from "react-native-reanimated";
import { TabView } from "react-native-tab-view";

type RouteKey = "posts" | "liked" | "saved";

type Route = {
	key: RouteKey;
	title: string;
};

const DATA = Array.from({ length: 30 }).map((_, i) => ({
	id: `post-${i}`,
	thumbnail: `https://picsum.photos/400?random=${i}`,
	views: Math.floor(Math.random() * 1000),
}));

const NUM_COLUMNS = 3;
const SCREEN_WIDTH = Dimensions.get("window").width;
const ITEM_SPACING = 2;
const ITEM_SIZE =
	(SCREEN_WIDTH - ITEM_SPACING * (NUM_COLUMNS + 1)) / NUM_COLUMNS;

// ---------- SCENE POSTS (FlashList en grid) ----------

export const PostsRoute = () => {
	return (
		<FlashList
			data={DATA}
			numColumns={NUM_COLUMNS}
			keyExtractor={(item) => item.id}
			estimatedItemSize={ITEM_SIZE}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={styles.gridContent}
			renderItem={({ item }) => (
				<View className="relative" style={styles.gridItem}>
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
				</View>
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

	// Animated index pour faire glisser l’indicateur
	const animatedIndex = React.useRef(
		new Animated.Value(navigationState.index),
	).current;

	React.useEffect(() => {
		Animated.timing(animatedIndex, {
			toValue: navigationState.index,
			duration: 180, // durée (TikTok ~150ms)
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

			{/* indicateur qui glisse */}
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

	const renderScene = ({ route }: { route: Route }) => {
		switch (route.key) {
			case "posts":
				return <PostsRoute />;
			// ajoute LikedRoute / SavedRoute ici plus tard
			default:
				return null;
		}
	};

	return (
		<View style={styles.container}>
			<TabView
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={setIndex}
				initialLayout={{ width: layout.width }}
				renderTabBar={(props) => <CustomTabBar {...props} />}
			/>
		</View>
	);
};

// ---------- STYLES ----------

const styles = StyleSheet.create({
	container: { flex: 1 },
	// Tab bar custom
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
