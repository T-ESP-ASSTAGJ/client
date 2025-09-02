import RegisterFooter from "@/app/(auth)/(signup)/_components/register-footer";
import RegisterTimer from "@/app/(auth)/(signup)/_components/register-timer";
import { Button } from "@/components/rnr-ui/button";
import { Text } from "@/components/rnr-ui/text";
import { useRegistrationStore } from "@/stores/use-registry-store";
import React, { useState } from "react";
import { Alert, Linking, View } from "react-native";

export default function EmailConfirmation() {
	const { formState } = useRegistrationStore();
	const email = formState.email;
	const [isLoading, setIsLoading] = useState(false);

	const handleResendEmail = async () => {
		setIsLoading(true);

		try {
			// TODO: Replace with actual API call
			await new Promise((resolve) => setTimeout(resolve, 1500));

			Alert.alert(
				"Email Sent",
				"A new confirmation email has been sent to your email address.",
			);
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

					<RegisterTimer
						onResendCode={handleResendEmail}
						promptMessage="Didn't receive an email?"
						resendButtonText="Resend Email"
						countdownMessage="Resend email in {countdown}s"
					/>
				</View>
			</View>
		</View>
	);
}
