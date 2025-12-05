import { verifyOtp } from "@/actions/auth/auth.action";
import OtpInput from "@/app/(auth)/signup/_components/inputs/otp-input";
import { Text } from "@/components/rnr-ui/text";
import { MainView } from "@/components/ui/MainView";
import { TouchableButton } from "@/components/ui/touchable-button";
import { useAuth } from "@/contexts/auth-context";
import { fontFamily } from "@/dimensions/font-family";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";
import { Alert, View } from "react-native";

export default function OtpLogin() {
	const { email, setEmail } = useAuth();
	const [otp, setOtp] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleOTPComplete = async () => {
		try {
			setIsLoading(true);
			const res = await verifyOtp({ email, code: otp });
			if (res.status === 201) {
				SecureStore.setItem("token", res.data.token);

				setIsLoading(false);
				router.replace("/home");
			} else {
				setError("Invalid verification code. Please try again.");
				setIsLoading(false);
			}
		} catch (err) {
			setError("Verification failed. Please try again.");
			setIsLoading(false);
		}
	};

	/*const handleResendEmail = async () => {
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
        }
    };*/

	return (
		<MainView>
			<View className="flex-1 items-center bg-background px-6 text-start">
				<View className="mt-10 w-full">
					<Text
						className="mb-2 font-bold text-3xl text-primary-foreground tracking-tighter -ml-1"
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
					<View className="mt-14 w-full">
						<OtpInput
							length={6}
							onChangeText={setOtp}
							value={otp}
							error={error}
							autoFocus={true}
						/>
					</View>
				</View>
			</View>

			<View className={"w-11/12 mx-auto mb-5"}>
				<TouchableButton
					variant={"primary"}
					disabled={otp.length !== 6}
					onPress={handleOTPComplete}
					content={"Continue"}
					isLoading={isLoading}
				/>
			</View>
		</MainView>
	);
}
