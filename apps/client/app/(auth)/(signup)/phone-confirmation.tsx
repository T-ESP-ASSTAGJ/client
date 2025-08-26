import { Button } from "@/components/rnr-ui/button";
import { Text } from "@/components/rnr-ui/text";
import { MainView } from "@/components/ui/MainView";
import PhoneOtpInput from "@/components/ui/inputs/phone/phone-otp-input";
import { useRegistrationStore } from "@/stores/use-registry-store";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import { Alert, TouchableOpacity, View } from "react-native";

export default function PhoneConfirmation() {
	const { formState } = useRegistrationStore();
	const [otp, setOtp] = useState("");
	const [error, setError] = useState("");
	const [isVerifying, setIsVerifying] = useState(false);
	const [countdown, setCountdown] = useState(30);
	const [canResend, setCanResend] = useState(false);

	useEffect(() => {
		if (!formState.phoneNumber) {
			router.replace("/(auth)/(signup)/phone");
			return;
		}

		const timer = setInterval(() => {
			setCountdown((prev) => {
				if (prev <= 1) {
					setCanResend(true);
					clearInterval(timer);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [formState.phoneNumber, router]);

	const handleOTPComplete = async (code: string) => {
		setError("");
		setIsVerifying(true);

		try {
			// filler pour le moment, call api nécéssaire, à définir dans une collection
			await new Promise((resolve) => setTimeout(resolve, 1500));

			//filler
			if (code === "123456") {
				Alert.alert("Success", "Phone number verified successfully!", [
					{ text: "OK", onPress: () => router.push("/(auth)/(signup)/email") },
				]);
			} else {
				setError("Invalid verification code. Please try again.");
			}
		} catch (err) {
			setError("Verification failed. Please try again.");
		} finally {
			setIsVerifying(false);
		}
	};

	const handleResendCode = async () => {
		if (!canResend) return;

		try {
			// filler pour le moment, call api nécéssaire, à définir dans une collection
			await new Promise((resolve) => setTimeout(resolve, 1000));

			setCountdown(30);
			setCanResend(false);
			setError("");
			Alert.alert(
				"Code Sent",
				"A new verification code has been sent to your phone.",
			);

			const timer = setInterval(() => {
				setCountdown((prev) => {
					if (prev <= 1) {
						setCanResend(true);
						clearInterval(timer);
						return 0;
					}
					return prev - 1;
				});
			}, 1000);
		} catch (err) {
			Alert.alert("Error", "Failed to resend code. Please try again.");
		}
	};

	const formatPhoneNumber = (phoneNumber: string) => {
		if (phoneNumber.length <= 4) return phoneNumber;
		return phoneNumber.slice(0, -4).replace(/./g, "*") + phoneNumber.slice(-4);
	};

	function onSubmit() {
		router.navigate("/(auth)/(signup)/email");
	}

	return (
		<MainView disableTouchableWrapper>
			<View className="flex-1 justify-center px-8">
				<View className="mb-8 items-center">
					<Text className="mb-4 text-center font-bold text-2xl">
						Verify Your Phone
					</Text>
					<Text className="mb-2 text-center text-gray-600">
						We've sent a 6-digit verification code to
					</Text>
					<Text className="text-center font-semibold text-black">
						{formatPhoneNumber(formState.phoneNumber)}
					</Text>
				</View>

				<View className="mb-8">
					<PhoneOtpInput
						length={6}
						onComplete={handleOTPComplete}
						onChangeText={setOtp}
						value={otp}
						error={error}
						autoFocus={true}
					/>
				</View>

				{isVerifying && (
					<Text className="mb-4 text-center text-gray-600">
						Verifying code...
					</Text>
				)}

				<View className="items-center">
					<Text className="mb-4 text-center text-gray-600">
						Didn't receive a code?
					</Text>

					{canResend ? (
						<TouchableOpacity
							onPress={handleResendCode}
							className="rounded-lg bg-blue-500 px-6 py-3"
						>
							<Text className="font-semibold text-white">Resend Code</Text>
						</TouchableOpacity>
					) : (
						<Text className="text-gray-500">Resend code in {countdown}s</Text>
					)}
				</View>

				<TouchableOpacity
					onPress={() => router.back()}
					className="mt-8 items-center"
				>
					<Text className="font-medium text-blue-500">Change Phone Number</Text>
				</TouchableOpacity>
				<Button onPress={onSubmit} className={"mt-6 w-full"} variant="default">
					<Text>{"Continue"}</Text>
				</Button>
			</View>
		</MainView>
	);
}
