import { Audio } from "expo-av";
import type React from "react";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";

interface AudioContextType {
	currentPostId: number | null;
	isCurrentlyPlaying: boolean;
	playPost: (postId: number, musicUrl: string) => Promise<void>;
	pausePost: (postId: number) => Promise<void>;
	stopCurrentPost: () => Promise<void>;
	isPlaying: (postId: number) => boolean;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [currentPostId, setCurrentPostId] = useState<number | null>(null);
	const [isCurrentlyPlaying, setIsCurrentlyPlaying] = useState(false);
	const soundRef = useRef<Audio.Sound | null>(null);
	const currentUrlRef = useRef<string | null>(null);
	const isLoadingRef = useRef<boolean>(false);

	useEffect(() => {
		Audio.setAudioModeAsync({
			playsInSilentModeIOS: true,
			staysActiveInBackground: false,
			shouldDuckAndroid: true,
		});
	}, []);

	const stopCurrentPost = useCallback(async () => {
		if (soundRef.current) {
			try {
				await soundRef.current.stopAsync();
				await soundRef.current.unloadAsync();
			} catch (e) {
				console.error("Error stopping audio:", e);
			}
			soundRef.current = null;
			currentUrlRef.current = null;
		}
		setCurrentPostId(null);
		setIsCurrentlyPlaying(false);
	}, []);

	const playPost = useCallback(async (postId: number, musicUrl: string) => {
		if (isLoadingRef.current) {
			return;
		}

		const currentId = currentPostId;
		const currentUrl = currentUrlRef.current;

		if (currentId === postId && isCurrentlyPlaying && currentUrl === musicUrl) {
			return;
		}

		if (currentId === postId && currentUrl === musicUrl && soundRef.current) {
			try {
				const status = await soundRef.current.getStatusAsync();
				if (status.isLoaded && !status.isPlaying) {
					await soundRef.current.playAsync();
					setIsCurrentlyPlaying(true);
				}
				return;
			} catch (e) {
				console.error("Error resuming:", e);
			}
		}

		isLoadingRef.current = true;

		await stopCurrentPost();

		try {
			const { sound } = await Audio.Sound.createAsync(
				{ uri: musicUrl },
				{ shouldPlay: true },
				(status) => {
					if (status.isLoaded) {
						setIsCurrentlyPlaying(status.isPlaying);
					}
				},
			);

			soundRef.current = sound;
			currentUrlRef.current = musicUrl;
			setCurrentPostId(postId);
			setIsCurrentlyPlaying(true);
		} catch (e) {
			console.error("Error loading new audio:", e);
		} finally {
			isLoadingRef.current = false;
		}
	}, []);

	const pausePost = useCallback(
		async (postId: number) => {
			if (currentPostId === postId && soundRef.current) {
				try {
					await soundRef.current.pauseAsync();
					setIsCurrentlyPlaying(false);
				} catch (e) {
					console.error("Error pausing:", e);
				}
			}
		},
		[currentPostId],
	);

	const isPlaying = useCallback(
		(postId: number) => {
			return currentPostId === postId && isCurrentlyPlaying;
		},
		[currentPostId, isCurrentlyPlaying],
	);

	return (
		<AudioContext.Provider
			value={{
				currentPostId,
				isCurrentlyPlaying,
				playPost,
				pausePost,
				stopCurrentPost,
				isPlaying,
			}}
		>
			{children}
		</AudioContext.Provider>
	);
};

export const useAudio = () => {
	const context = useContext(AudioContext);
	if (!context) {
		throw new Error("useAudio must be used within AudioProvider");
	}
	return context;
};
