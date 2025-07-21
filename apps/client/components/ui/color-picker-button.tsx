import { IconSymbol } from "@/components/ui/IconSymbol";
import { TouchableButton } from "@/components/ui/touchable-button";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
	useAnimatedStyle,
	withSpring,
} from "react-native-reanimated";
import ColorPicker, {
	HueSlider,
	OpacitySlider,
	Panel1,
	PreviewText,
} from "reanimated-color-picker";

export const ColorPickerButton = ({
	selectedColor,
	setSelectedColor,
}: { selectedColor: string; setSelectedColor: (color: string) => void }) => {
	const [showModal, setShowModal] = useState(false);

	const animStyle = useAnimatedStyle(() => {
		return {
			opacity: withSpring(selectedColor ? 1 : 0),
			transform: [{ scale: withSpring(selectedColor ? 1 : 0.8) }],
		};
	});

	return (
		<>
			<TouchableOpacity
				onPress={() => setShowModal(true)}
				className="relative flex size-[60px] items-center justify-center"
				activeOpacity={0.8}
			>
				{/* Conteneur du cercle coloré */}
				<LinearGradient
					// Background Linear Gradient
					colors={["rgba(0,0,0,0.8)", "transparent"]}
					style={styles.background}
				/>

				{/* Overlay avec checkmark si sélectionné */}
				{selectedColor && (
					<Animated.View
						className="absolute inset-0 flex items-center justify-center rounded-full bg-black/30"
						style={animStyle}
					>
						<IconSymbol
							name="checkmark"
							color="white"
							size={28}
							weight="bold"
						/>
					</Animated.View>
				)}
			</TouchableOpacity>

			<Modal
				onRequestClose={() => setShowModal(false)}
				visible={showModal}
				transparent
				animationType="slide"
			>
				<BlurView
					intensity={10} // Ajustez l'intensité du flou (0-100)
					tint="dark" // Options: 'light', 'dark', 'default'
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "rgba(9, 16, 29, 0.6)",
					}}
				>
					<Animated.View style={[styles.container]}>
						<View style={styles.pickerContainer}>
							<ColorPicker
								value={selectedColor}
								sliderThickness={25}
								thumbSize={24}
								thumbShape="circle"
								boundedThumb
								onChangeJS={(color) => setSelectedColor(color.hex)}
							>
								<Panel1 style={styles.panelStyle} />
								<HueSlider style={styles.sliderStyle} />
								<OpacitySlider style={styles.sliderStyle} />
								<View style={styles.previewTxtContainer}>
									<PreviewText style={{ color: "#707070" }} />
								</View>
							</ColorPicker>
						</View>

						<View className={"mx-auto mt-5 w-[300px]"}>
							<TouchableButton
								sensory={"medium"}
								variant={"primary"}
								content={"Valider"}
								onPress={() => {
									setSelectedColor(selectedColor);
									setShowModal(false);
								}}
							/>
						</View>
					</Animated.View>
				</BlurView>
			</Modal>
		</>
	);
};

const styles = StyleSheet.create({
	background: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		height: 300,
	},
	container: {
		flex: 1,
		justifyContent: "center",
		alignContent: "center",
	},
	pickerContainer: {
		alignSelf: "center",
		width: 300,
		backgroundColor: "#fff",
		padding: 20,
		borderRadius: 20,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.34,
		shadowRadius: 6.27,

		elevation: 10,
	},
	panelStyle: {
		borderRadius: 16,

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
	},
	sliderStyle: {
		borderRadius: 20,
		marginTop: 20,

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
	},
	previewTxtContainer: {
		paddingTop: 20,
		marginTop: 20,
		borderTopWidth: 1,
		borderColor: "#bebdbe",
	},
	swatchesContainer: {
		paddingTop: 20,
		marginTop: 20,
		borderTopWidth: 1,
		borderColor: "#bebdbe",
		alignItems: "center",
		flexWrap: "nowrap",
		gap: 10,
	},
	swatchStyle: {
		borderRadius: 20,
		height: 30,
		width: 30,
		margin: 0,
		marginBottom: 0,
		marginHorizontal: 0,
		marginVertical: 0,
	},
	openButton: {
		width: "100%",
		borderRadius: 20,
		paddingHorizontal: 40,
		paddingVertical: 10,
		backgroundColor: "#fff",

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
	},
	closeButton: {
		position: "absolute",
		bottom: 10,
		borderRadius: 20,
		paddingHorizontal: 40,
		paddingVertical: 10,
		alignSelf: "center",
		backgroundColor: "#fff",

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
	},
});
