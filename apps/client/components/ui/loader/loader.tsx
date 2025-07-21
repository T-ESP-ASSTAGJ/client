import LottieView from "lottie-react-native";

export const Loader = ({
	width,
	height,
}: { width: number; height: number }) => {
	return (
		<LottieView
			autoPlay
			loop
			style={{
				width: width,
				height: height,
			}}
			source={require("@/assets/animations/loader.json")}
		/>
	);
};
