import "../styles/globals.css";

import { useUserStore } from "@/stores/use-user-store";

import {
	DarkTheme,
	DefaultTheme,
	Theme,
	ThemeProvider,
} from "@react-navigation/native";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import { AudioProvider } from "@/contexts/audio-context";
import { fontFamily } from "@/dimensions/font-family";
import { PortalHost } from "@rn-primitives/portal";
import { type AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import { useFonts } from "expo-font"; // Importez useFonts
import { Stack, router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
	Animated,
	LogBox,
	Platform,
	StyleSheet,
	View,
	useColorScheme,
	useWindowDimensions,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
	ReanimatedLogLevel,
	configureReanimatedLogger,
} from "react-native-reanimated";

// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHideAsync().catch(() => {
	/* reloading the app might trigger some race conditions, ignore them */
});

export function SplashVideo({ onLoaded, onFinish }) {
	const video = useRef(null);

	// @ts-ignore
	const [lastStatus, setStatus] = useState<AVPlaybackStatus>({});

	const { width } = useWindowDimensions();
	const isTablet = width >= 768;

	return (
		<Video
			ref={video}
			style={StyleSheet.absoluteFill}
			source={require("../assets/videos/splash.mp4")}
			shouldPlay={!(lastStatus.isLoaded && lastStatus.didJustFinish)}
			isLooping={false}
			resizeMode={ResizeMode.COVER}
			onPlaybackStatusUpdate={(status) => {
				if (status.isLoaded) {
					if (lastStatus.isLoaded !== status.isLoaded) {
						onLoaded();
					}
					if (status.didJustFinish) {
						onFinish();
					}
				}
				setStatus(() => status);
			}}
		/>
	);
}

export default function App() {
	const [fontsLoaded, fontError] = useFonts({
		[fontFamily.regular]: require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
		[fontFamily.medium]: require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
		[fontFamily.semibold]: require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
		[fontFamily.bold]: require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
		[fontFamily.extrabold]: require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
	});

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<AnimatedSplashScreen fontsLoaded={fontsLoaded} fontError={fontError}>
				<MainScreen />
			</AnimatedSplashScreen>
		</GestureHandlerRootView>
	);
}

function AnimatedSplashScreen({ children, fontsLoaded, fontError }) {
	const animation = useMemo(() => new Animated.Value(1), []);
	const [isAppReady, setAppReady] = useState(false);
	const [isSplashVideoComplete, setSplashVideoComplete] = useState(false);
	const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

	// Gérer le chargement des polices
	useEffect(() => {
		if (fontsLoaded || fontError) {
			setAppReady(true);
		}
	}, [fontsLoaded, fontError]);

	useEffect(() => {
		if (isAppReady && isSplashVideoComplete) {
			Animated.timing(animation, {
				toValue: 0,
				duration: 200,
				useNativeDriver: true,
			}).start(() => setAnimationComplete(true));
		}
	}, [isAppReady, isSplashVideoComplete]);

	const onImageLoaded = useCallback(async () => {
		try {
			await SplashScreen.hideAsync();
			// Autres chargements si nécessaire
			await Promise.all([]);
		} catch (e) {
			// handle errors
		} finally {
			// Ne pas appeler setAppReady ici, c'est géré par l'effet des polices
		}
	}, []);

	const videoElement = useMemo(() => {
		return (
			<SplashVideo
				onLoaded={onImageLoaded}
				onFinish={() => {
					setSplashVideoComplete(true);
				}}
			/>
		);
	}, [onImageLoaded, setSplashVideoComplete]);

	return (
		<View style={{ flex: 1 }}>
			{children}
			{!isSplashAnimationComplete && (
				<Animated.View
					pointerEvents="auto"
					style={[
						StyleSheet.absoluteFill,
						{
							backgroundColor: "white",
							opacity: animation,
						},
					]}
				>
					{videoElement}
				</Animated.View>
			)}
		</View>
	);
}

function MainScreen() {
	const { user } = useUserStore();
	const colorScheme = useColorScheme();
	/* Hook automatique pour synchroniser l'utilisateur (5 minutes / fermeture ou mise en arrière plan | si "dirty")*/
	/*useUserSync();*/

	const initializeUser = useUserStore((state) => state.initializeUser);

	const hasRedirected = useRef(false);

	useEffect(() => {
		let isMounted = true;

		const bootstrap = async () => {
			if (hasRedirected.current || !isMounted) return;

			const token = await SecureStore.getItemAsync("token");
			console.log("Token value:", token);

			if (!isMounted) return;

			try {
				if (token) {
					// éventuellement : await initializeUser();
					router.replace("/home"); // utilisateur déjà logué
				} else {
					router.replace("/branding"); // pas de token → login
				}
				hasRedirected.current = true;
			} catch (e) {
				console.log("Redirect error", e);
			}
		};

		bootstrap();

		return () => {
			isMounted = false;
		};
	}, []);
	configureReanimatedLogger({
		level: ReanimatedLogLevel.error,
		strict: false,
	});

	LogBox.ignoreLogs([
		"Sending `onAnimatedValueUpdate` with no listeners registered",
	]);

	return (
		<AudioProvider>
			<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
				<GestureHandlerRootView>
					<BottomSheetModalProvider>
						<Stack screenOptions={{ headerShown: false }} />
						<PortalHost />
					</BottomSheetModalProvider>
				</GestureHandlerRootView>
			</ThemeProvider>
		</AudioProvider>
	);
}
