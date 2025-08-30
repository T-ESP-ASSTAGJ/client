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
		const newOtp = otp.split("");
		const text = input[input.length - 1];

		if (text.length === length) {
			const pastedCode = text.slice(0, length);
			setOtp(pastedCode);
			onChangeText?.(pastedCode);

			if (pastedCode.length === length) {
				onComplete(pastedCode);
				inputRefs.current[length - 1]?.blur();
			}
			return;
		}

		if (text.length > 1) {
			const pastedText = text.slice(0, length - index);
			for (let i = 0; i < pastedText.length && index + i < length; i++) {
				newOtp[index + i] = pastedText[i];
			}
			const newOtpString = newOtp.join("");
			setOtp(newOtpString);
			onChangeText?.(newOtpString);

			const nextIndex = Math.min(index + pastedText.length, length - 1);
			inputRefs.current[nextIndex]?.focus();

			if (newOtpString.length === length) {
				onComplete(newOtpString);
			}
		} else {
			newOtp[index] = text;
			const newOtpString = newOtp.join("");
			setOtp(newOtpString);
			onChangeText?.(newOtpString);

			if (text && index < length - 1) {
				inputRefs.current[index + 1]?.focus();
			}

			if (newOtpString.replace(/\s/g, "").length === length) {
				onComplete(newOtpString);
			}
		}
	};

	const handleKeyPress = (key: string, index: number) => {
		if (key === "Backspace" && !otp[index] && index > 0) {
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
						className={`h-8 w-8 transform rounded-full text-center font-bold text-3xl text-primary-foreground transition-transform duration-300 ease-out ${otp[index] ? "bg-transparent" : "border-4 bg-muted-foreground"} ${focusedIndex === index ? "scale-125 border-0" : "scale-100"}`}
					/>
				))}
			</View>
			{error && (
				<Text className="mt-2 text-center text-red-500 text-sm">{error}</Text>
			)}
		</View>
	);
}
