import React, { useState, useRef, useEffect } from "react";
import { Text, TextInput, View } from "react-native";

interface OTPInputProps {
	length?: number;
	onComplete: (code: string) => void;
	onChangeText?: (text: string) => void;
	value?: string;
	error?: string;
	autoFocus?: boolean;
}

export default function PhoneOtpInput({
	length = 6,
	onComplete,
	onChangeText,
	value = "",
	error,
	autoFocus = true,
}: OTPInputProps) {
	const [digits, setDigits] = useState<string[]>(Array(length).fill(""));
	const inputRefs = useRef<TextInput[]>([]);

	useEffect(() => {
		// Initialize digits from value prop
		const newDigits = Array(length).fill("");
		for (let i = 0; i < Math.min(value.length, length); i++) {
			newDigits[i] = value[i];
		}
		setDigits(newDigits);
	}, [value, length]);

	useEffect(() => {
		if (autoFocus && inputRefs.current[0]) {
			inputRefs.current[0].focus();
		}
	}, [autoFocus]);

	const handleChangeText = (text: string, index: number) => {
		const digit = text.replace(/[^0-9]/g, "").slice(-1); // Only last digit

		const newDigits = [...digits];
		newDigits[index] = digit;
		setDigits(newDigits);

		const result = newDigits.join("");
		onChangeText?.(result);

		// Auto-focus next input
		if (digit && index < length - 1) {
			inputRefs.current[index + 1]?.focus();
		}

		// Check if complete
		if (newDigits.every((d) => d)) {
			onComplete(result);
		}
	};

	const handleKeyPress = (key: string, index: number) => {
		if (key === "Backspace") {
			const newDigits = [...digits];

			if (digits[index]) {
				// Clear current digit only
				newDigits[index] = "";
				setDigits(newDigits);
				onChangeText?.(newDigits.join(""));
			} else if (index > 0) {
				// Move to previous input if current is empty
				inputRefs.current[index - 1]?.focus();
			}
		}
	};

	return (
		<View className="w-full">
			<View className="mb-4 flex flex-row gap-8">
				{digits.map((digit, index) => (
					<TextInput
						inputMode={"numeric"}
						key={`otp-${index}`}
						ref={(ref) => {
							if (ref) inputRefs.current[index] = ref;
						}}
						value={digit}
						onChangeText={(text) => handleChangeText(text, index)}
						onKeyPress={({ nativeEvent }) =>
							handleKeyPress(nativeEvent.key, index)
						}
						keyboardType="number-pad"
						textContentType="oneTimeCode"
						autoComplete="sms-otp"
						selectTextOnFocus
						cursorColor={null}
						selectionColor={null}
						maxLength={1}
						caretHidden={true}
						textAlign={"center"}
						className={`h-6 w-6 transform rounded-2xl font-bold text-3xl text-primary-foreground transition-transform duration-300 ease-out ${digit ? "bg-transparent" : "bg-muted-foreground"}`}
					/>
				))}
			</View>
			{error && (
				<Text className="mt-2 text-center text-red-500 text-sm">{error}</Text>
			)}
		</View>
	);
}
