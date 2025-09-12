import RegisterFooter from "@/app/(auth)/(signup)/_components/register-footer";
import RegisterTimer from "@/app/(auth)/(signup)/_components/register-timer";
import { Button } from "@/components/rnr-ui/button";
import { Text } from "@/components/rnr-ui/text";
import { fontFamily } from "@/dimensions/font-family";
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

	return (
		<View className="flex-1 items-center bg-background px-6 text-start">
			<View className="mt-10 w-full">
				<Text
					className="mb-2 font-bold text-3xl text-primary-foreground tracking-tighter"
					style={{ fontFamily: fontFamily.semibold }}
				>
					Check your email
				</Text>
				<View>
					<Text
						className="text-lg text-muted"
						style={{ fontFamily: fontFamily.regular }}
					>
						We've sent a confirmation link to :
					</Text>
					<Text
						className="mt-px text-lg text-primary-foreground"
						style={{ fontFamily: fontFamily.semibold }}
					>
						{email}
					</Text>
				</View>
			</View>

			<View className={"mt-10 w-full flex-1 justify-between "}>
				<View className="mt-6 flex-1 justify-center gap-y-12 ">
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
