import PhoneOtpInput from "@/app/core/(auth)/(signup)/_components/inputs/phone/phone-otp-input";
import RegisterFooter from "@/app/core/(auth)/(signup)/_components/register-footer";
import RegisterTimer from "@/app/core/(auth)/(signup)/_components/register-timer";
import { Text } from "@/components/rnr-ui/text";
import { fontFamily } from "@/dimensions/font-family";
import { useRegistrationStore } from "@/stores/use-registry-store";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, View } from "react-native";
export default function PhoneConfirmation() {
	const { formState, setFormState, nextStep } = useRegistrationStore();
	const [otp, setOtp] = useState("");
	const [error, setError] = useState("");
	const [isVerifying, setIsVerifying] = useState(false);
	const phoneNumber = formState.phoneNumber;

	const handleOTPComplete = async (code: string) => {
		setError("");
		setIsVerifying(true);

		try {
			await new Promise((resolve) => setTimeout(resolve, 1500));
			if (code === "123456") {
				setFormState((prev) => ({ ...prev, isPhoneConfirmed: true }));
				const next = nextStep();
				if (next) router.push(next);
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
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setError("");
			Alert.alert(
				"Code Sent",
				"A new verification code has been sent to your phone.",
			);
		} catch (err) {
			Alert.alert("Error", "Failed to resend code. Please try again.");
		}
	};

	return (
		<View className="flex-1 items-center bg-background px-6">
			<View className="mt-10 w-full">
				<Text
					className="mb-2 font-bold text-3xl text-primary-foreground tracking-tighter"
					style={{ fontFamily: fontFamily.semibold }}
				>
					Verify Your Phone
				</Text>
				<Text
					className="text-lg text-muted"
					style={{ fontFamily: fontFamily.regular }}
				>
					We've sent a 6-digit verification code to number finishing by{" "}
					<Text
						className={"text-white text-lg"}
						style={{ fontFamily: fontFamily.bold }}
					>
						{phoneNumber}
					</Text>
				</Text>
				{/*<Text className="mt-12 rounded-full border bg-primary p-4 text-center font-bold text-2xl text-primary-foreground">
					{phoneNumber}
				</Text>*/}
			</View>

			<View className="mt-16 flex items-center justify-end gap-y-4">
				<PhoneOtpInput
					length={6}
					onComplete={handleOTPComplete}
					onChangeText={setOtp}
					value={otp}
					error={error}
					autoFocus={true}
				/>
			</View>

			<View className="w-full items-center justify-center mt-8">
				<RegisterTimer
					onResendCode={handleResendCode}
					promptMessage="Didn't receive a code?"
					resendButtonText="Resend Code"
					countdownMessage="Resend code in {countdown}s"
				/>
			</View>

			{isVerifying && (
				<Text className="mb-4 text-center text-muted">Verifying code...</Text>
			)}
		</View>
	);
}
