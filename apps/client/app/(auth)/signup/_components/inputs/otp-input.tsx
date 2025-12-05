import React, { useState, useRef, useEffect } from "react";
import { Text, TextInput, View } from "react-native";

interface OTPInputProps {
	length?: number;
	onComplete?: (code: string) => void;
	onChangeText?: (text: string) => void;
	value?: string;
	error?: string;
	autoFocus?: boolean;
}

export default function OtpInput({
	length = 6,
	onComplete,
	onChangeText,
	value = "",
	error,
	autoFocus = true,
}: OTPInputProps) {
	const [otp, setOtp] = useState(value);
	const [focusedIndex, setFocusedIndex] = useState(autoFocus ? 0 : -1);
	const inputRefs = useRef<TextInput[]>([]);

	useEffect(() => {
		setOtp(value);
	}, [value]);

	useEffect(() => {
		if (autoFocus && inputRefs.current[0]) {
			inputRefs.current[0].focus();
		}
	}, [autoFocus]);

	const handleChangeText = (input: string, index: number) => {
		const numericValue = input.replace(/[^0-9]/g, "");

		if (!numericValue) {
			const newOtp = otp.split("");
			newOtp[index] = "";
			const result = newOtp.join("");
			setOtp(result);
			onChangeText?.(result);
			return;
		}

		const newOtp = otp.split("");

		if (numericValue.length > 1) {
			const availableSlots = length - index;
			const textToInsert = numericValue.slice(0, availableSlots);

			for (let i = 0; i < textToInsert.length; i++) {
				newOtp[index + i] = textToInsert[i];
			}

			const nextIndex = Math.min(index + textToInsert.length, length - 1);
			inputRefs.current[nextIndex]?.focus();
		}

		if (numericValue.length === 1) {
			newOtp[index] = numericValue;
			if (index < length - 1) {
				inputRefs.current[index + 1]?.focus();
			}
		}

		const result = newOtp.join("");
		setOtp(result);
		onChangeText?.(result);

		if (result.length === length) {
			onComplete(result);
			if (numericValue.length > 1) inputRefs.current[length - 1]?.blur();
		}
	};

	const handleKeyPress = (key: string, index: number) => {
		if (key !== "Backspace") return;

		// 1. Si la case actuelle n'est PAS vide → on la vide
		if (otp[index]) {
			const newOtp = otp.split("");
			newOtp[index] = "";
			const result = newOtp.join("");
			setOtp(result);
			onChangeText?.(result);
			return;
		}

		// 2. Si la case actuelle est vide → on supprime et focus la précédente
		if (!otp[index] && index > 0) {
			const newOtp = otp.split("");
			newOtp[index - 1] = "";
			const result = newOtp.join("");
			setOtp(result);
			onChangeText?.(result);

			// Focus sur la case précédente
			inputRefs.current[index - 1]?.focus();
		}
	};

	const handleFocus = (index: number) => {
		setFocusedIndex(index);
	};

	const handleBlur = () => {
		setFocusedIndex(-1);
	};

	return (
		<View className="w-full">
			<View className="mb-4 flex flex-row justify-center gap-8">
				{Array.from({ length }, (_, index) => (
					<TextInput
						inputMode={"numeric"}
						key={`otp-${index}`}
						ref={(ref) => {
							if (ref) inputRefs.current[index] = ref;
						}}
						value={otp[index] || ""}
						onChangeText={(text) => handleChangeText(text, index)}
						onKeyPress={({ nativeEvent }) =>
							handleKeyPress(nativeEvent.key, index)
						}
						onFocus={() => handleFocus(index)}
						onBlur={handleBlur}
						keyboardType="number-pad"
						textContentType="oneTimeCode"
						autoComplete="sms-otp"
						maxLength={length}
						caretHidden={true}
						cursorColor="transparent"
						selectionColor="transparent"
						className={`h-6 w-6 transform rounded-2xl text-center font-bold text-3xl text-primary-foreground transition-transform duration-300 ease-out ${otp[index] ? "bg-transparent" : "bg-muted-foreground"}`}
					/>
				))}
			</View>
			{error && (
				<Text className="mt-2 text-center text-red-500 text-sm">{error}</Text>
			)}
		</View>
	);
}
