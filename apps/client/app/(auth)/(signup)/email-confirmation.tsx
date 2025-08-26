import { Button } from "@/components/rnr-ui/button";
import { Text } from "@/components/rnr-ui/text";
import { MainView } from "@/components/ui/MainView";
import { useRegistrationStore } from "@/stores/use-registry-store";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import { Alert, Linking, TouchableOpacity, View } from "react-native";

export default function EmailConfirmation() {
	const { formState } = useRegistrationStore();
	const [isLoading, setIsLoading] = useState(false);
	const [countdown, setCountdown] = useState(30);
	const [canResend, setCanResend] = useState(false);

	useEffect(() => {
		if (!formState.email) {
			router.replace("/(auth)/(signup)/email");
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
	}, [formState.email]);

	const handleResendEmail = async () => {
		if (!canResend) return;

		setIsLoading(true);

		try {
			// TODO: Replace with actual API call
			await new Promise((resolve) => setTimeout(resolve, 1500));

			setCountdown(30);
			setCanResend(false);
			Alert.alert(
				"Email Sent",
				"A new confirmation email has been sent to your email address.",
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
		} catch (error) {
			Alert.alert(
				"Error",
				"Failed to resend confirmation email. Please try again.",
			);
		} finally {
			setIsLoading(false);
		}
	};

	const handleCheckEmail = async () => {
		try {
			// Try to open default email app
			const supported = await Linking.canOpenURL("mailto:");
			if (supported) {
				await Linking.openURL("mailto:");
			} else {
				Alert.alert(
					"Unable to open email app",
					"Please check your email manually.",
				);
			}
		} catch (error) {
			Alert.alert("Error", "Unable to open email app.");
		}
	};

	const handleContinue = () => {
		// TODO: Add actual email verification check
		Alert.alert(
			"Email Verified",
			"Great! Your email has been verified successfully.",
			[
				{
					text: "Continue",
					onPress: () => router.push("/(auth)/(signup)/names"),
				},
			],
		);
	};

	const maskEmail = (email: string) => {
		const [localPart, domain] = email.split("@");
		if (localPart.length <= 3) {
			return `${localPart[0]}***@${domain}`;
		}
		return `${localPart.slice(0, 2)}${"*".repeat(localPart.length - 2)}@${domain}`;
	};

	return (
		<MainView disableTouchableWrapper>
			<View className="flex-1 justify-center px-8">
				<View className="mb-8 items-center">
					<View className="mb-6 h-16 w-16 items-center justify-center rounded-full bg-blue-100">
						<Text className="text-2xl">=�</Text>
					</View>

					<Text className="mb-4 text-center font-bold text-2xl">
						Check your email
					</Text>

					<Text className="mb-4 text-center text-gray-600">
						We've sent a confirmation link to
					</Text>

					<Text className="mb-6 text-center font-semibold text-black">
						{maskEmail(formState.email)}
					</Text>

					<Text className="text-center text-gray-500 text-sm leading-5">
						Click the link in the email to verify your account. If you don't see
						it, check your spam folder.
					</Text>
				</View>

				<View className="space-y-4">
					<Button
						onPress={handleCheckEmail}
						className="mb-4 w-full"
						variant="default"
						size="lg"
					>
						<Text>Open Email App</Text>
					</Button>

					<View className="mb-6 items-center">
						<Text className="mb-4 text-center text-gray-600">
							Didn't receive an email?
						</Text>

						{canResend ? (
							<Button
								onPress={handleResendEmail}
								disabled={isLoading}
								className="w-full"
								variant="outline"
							>
								<Text>{isLoading ? "Sending..." : "Resend Email"}</Text>
							</Button>
						) : (
							<Text className="text-gray-500">
								Resend email in {countdown}s
							</Text>
						)}
					</View>
				</View>

				<View className="mt-8 items-center">
					<TouchableOpacity onPress={() => router.back()} className="py-2">
						<Text className="font-medium text-blue-500">
							Change Email Address
						</Text>
					</TouchableOpacity>
				</View>

				{/* Mock verification button - remove in production */}
				<View className="mt-8 border-gray-200 border-t pt-6">
					<Button
						onPress={handleContinue}
						className="w-full"
						variant="secondary"
					>
						<Text>Continue (Mock Verification)</Text>
					</Button>
				</View>
			</View>
		</MainView>
	);
}
