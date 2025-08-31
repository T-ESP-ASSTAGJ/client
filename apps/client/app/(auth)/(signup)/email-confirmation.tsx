import ContinueButton from "@/app/(auth)/(signup)/_components/continue-button";
import { Button } from "@/components/rnr-ui/button";
import { Text } from "@/components/rnr-ui/text";
import { useRegistrationStore } from "@/stores/use-registry-store";
import React, { useState, useEffect } from "react";
import { Alert, Linking, View } from "react-native";

export default function EmailConfirmation() {
	const { formState } = useRegistrationStore();
	const email = formState.email;
	const [isLoading, setIsLoading] = useState(false);
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
		//TODO: fonction à tester sur mobile, app mail pas dispo sur simulateur
		try {
			const supported = await Linking.canOpenURL("mailto:");
			if (supported) {
				await Linking.openURL("mailto:");
			} else {
				//TODO: remplacer par le modal inférieur
				Alert.alert(
					"Unable to open email app",
					"Please check your email manually.",
				);
			}
		} catch (error) {
			Alert.alert("Error", "Unable to open email app.");
		}
	};

	return (
		<View className="flex-1 items-center bg-background px-6 text-start">
			<View className={"mt-12 w-full flex-1 justify-between "}>
				<Text className="w-full font-bold text-3xl text-primary-foreground">
					Check your email
				</Text>
				<View className="mt-12">
					<Text className="mb-2 text-lg text-muted">
						We've sent a confirmation link to :
					</Text>
					<Text className="mt-12 rounded-full border bg-primary p-4 text-center font-extrabold text-primary-foreground">
						{email}
					</Text>
					<Text className="mt-12 text-lg text-muted">
						Click the link in the email to verify your account. If you don't see
						it, check your spam folder.
					</Text>
				</View>
				<View className="mt-6 flex-1 justify-center gap-y-12 ">
					<Button
						onPress={handleCheckEmail}
						className="mb-4 w-full border border-primary-foreground bg-primary"
						variant="default"
						size="lg"
					>
						<Text className={"text-muted"}>Open Email App</Text>
					</Button>

					<View className="mb-6 items-center">
						<Text className="mb-4 text-center text-primary-foreground">
							Didn't receive an email?
						</Text>

						{canResend ? (
							<Button
								onPress={handleResendEmail}
								disabled={isLoading}
								className="w-full border-muted bg-muted"
								variant="outline"
							>
								<Text className={"text-primary"}>
									{isLoading ? "Sending..." : "Resend Email"}
								</Text>
							</Button>
						) : (
							<Text className="text-muted">Resend email in {countdown}s</Text>
						)}
					</View>
				</View>
			</View>
			<View className={"mb-16 w-full gap-y-4 pt-4"}>
				<ContinueButton />
			</View>
		</View>
	);
}
