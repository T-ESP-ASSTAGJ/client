import { Text } from "@/components/rnr-ui/text";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";

interface RegisterTimerProps {
	onResendCode: () => Promise<void>;
	initialCountdown?: number;
	promptMessage?: string;
	resendButtonText?: string;
	countdownMessage?: string;
}

export default function RegisterTimer({
	onResendCode,
	initialCountdown = 30,
	promptMessage = "Didn't receive a code?",
	resendButtonText = "Resend Code",
	countdownMessage = "Resend code in {countdown}s",
}: RegisterTimerProps) {
	const [countdown, setCountdown] = useState(initialCountdown);
	const [canResend, setCanResend] = useState(false);

	useEffect(() => {
		if (countdown > 0) {
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
		}
	}, [countdown]);

	const handleResend = async () => {
		if (!canResend) return;

		await onResendCode();
		setCountdown(initialCountdown);
		setCanResend(false);
	};

	return (
		<>
			<Text className="mb-4 text-center text-muted">{promptMessage}</Text>
			{canResend ? (
				<TouchableOpacity
					onPress={handleResend}
					className="rounded-full bg-muted px-6 py-3"
				>
					<Text className="font-semibold text-primary text-center">
						{resendButtonText}
					</Text>
				</TouchableOpacity>
			) : (
				<Text className="text-muted text-center">
					{countdownMessage.replace("{countdown}", countdown.toString())}
				</Text>
			)}
		</>
	);
}
