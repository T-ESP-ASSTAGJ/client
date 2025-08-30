import ContinueButton from "@/app/(auth)/(signup)/_components/continue_button";
import { Text } from "@/components/rnr-ui/text";
import PhoneOtpInput from "@/components/ui/inputs/phone/phone-otp-input";
import { useRegistrationStore } from "@/stores/use-registry-store";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";

export default function PhoneConfirmation() {
	const { formState } = useRegistrationStore();
	const [otp, setOtp] = useState("");
	const [error, setError] = useState("");
	const [isVerifying, setIsVerifying] = useState(false);
	const [countdown, setCountdown] = useState(30);
	const [canResend, setCanResend] = useState(false);

	useEffect(() => {
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
			await new Promise((resolve) => setTimeout(resolve, 1500));
			if (code === "123456") {
				router.push("/(auth)/(signup)/email");
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

	return (
		<View className="flex-1 items-center bg-background px-6">
			<View className="mt-12 w-full">
				<Text className="mb-4 font-bold text-3xl text-primary-foreground">
					Verify Your Phone
				</Text>
				<Text className="mb-2 text-lg text-muted">
					We've sent a 6-digit verification code to
				</Text>
				<Text className="text-center font-semibold text-black">
					{formatPhoneNumber(formState.phoneNumber)}
				</Text>
			</View>

			<View className="mb-8 flex-1 items-center justify-end gap-y-4">
				<PhoneOtpInput
					length={6}
					onComplete={handleOTPComplete}
					onChangeText={setOtp}
					value={otp}
					error={error}
					autoFocus={true}
				/>
			</View>
			<View className="flex-1 items-center justify-center ">
				<Text className="mb-4 text-center text-muted">
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
					<Text className="text-muted">Resend code in {countdown}s</Text>
				)}
			</View>

			{isVerifying && (
				<Text className="mb-4 text-center text-muted">Verifying code...</Text>
			)}

			<View className={"mb-16 w-full gap-y-4 pt-4"}>
				<ContinueButton />
			</View>
		</View>
	);
}
