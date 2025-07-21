import "../styles/globals.css";

import { useUserStore } from "@/stores/use-user-store";
import { PortalHost } from "@rn-primitives/portal";
import { type AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import { useFonts } from "expo-font"; // Importez useFonts
import { Redirect, Stack, router, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
	Animated,
	LogBox,
	StyleSheet,
	View,
	useWindowDimensions,
} from "react-native";
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
	// Chargez vos polices ici
	const [fontsLoaded, fontError] = useFonts({
		"Urbanist-Light": require("@/assets/fonts/Urbanist-Light.ttf"),
		"Urbanist-Regular": require("@/assets/fonts/Urbanist-Regular.ttf"),
		"Urbanist-Medium": require("@/assets/fonts/Urbanist-Medium.ttf"),
		"Urbanist-SemiBold": require("@/assets/fonts/Urbanist-SemiBold.ttf"),
		"Urbanist-Bold": require("@/assets/fonts/Urbanist-Bold.ttf"),
	});

	return (
		<AnimatedSplashScreen fontsLoaded={fontsLoaded} fontError={fontError}>
			<MainScreen />
		</AnimatedSplashScreen>
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
					pointerEvents="none"
					style={[
						StyleSheet.absoluteFill,
						{
							backgroundColor: "black",
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
	/* Hook automatique pour synchroniser l'utilisateur (5 minutes / fermeture ou mise en arrière plan | si "dirty")*/
	/*useUserSync();*/

	const initializeUser = useUserStore((state) => state.initializeUser);

	const hasRedirected = useRef(false);

	useEffect(() => {
		if (hasRedirected.current) return;

		const verify = async () => {
			await initializeUser();
			hasRedirected.current = true;
			router.replace("/(tabs)/home");
		};

		verify();
	}, []);

	/*useEffect(() => {
    console.log("Utilisateur connecté: ", user)
  }, [user]);*/

	configureReanimatedLogger({
		level: ReanimatedLogLevel.warn,
		strict: false,
	});

	LogBox.ignoreLogs([
		"Sending `onAnimatedValueUpdate` with no listeners registered.",
	]);

	return (
		<>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name={"(tabs)"} />
			</Stack>

			<PortalHost />
		</>
	);
}
