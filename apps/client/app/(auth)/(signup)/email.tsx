import ContinueButton from "@/app/(auth)/(signup)/_components/continue-button";
import { Text } from "@/components/rnr-ui/text";
import { useRegistrationStore } from "@/stores/use-registry-store";
import React, { useState, useEffect } from "react";
import { TextInput, View } from "react-native";

export default function Email() {
	const { formState, setFormState } = useRegistrationStore();
	const [email, setEmail] = useState(formState.email || "");
	const [emailError, setEmailError] = useState("");

	useEffect(() => {
		setEmail(formState.email || "");
	}, [formState.email]);

	const handleEmailChange = (text: string) => {
		setEmail(text);
		setEmailError("");

		setFormState((prev) => ({ ...prev, email: text }));
	};

	return (
		<View className="flex-1 justify-center bg-background px-6">
			<View className="mt-12 w-full">
				<Text className="mb-4 font-bold text-3xl text-primary-foreground">
					What's your email?
				</Text>
				<Text className="mb-2 text-lg text-muted">
					We'll send you a confirmation link to verify your email address
				</Text>
			</View>

			<View className="flex-1 items-center justify-end gap-y-4">
				<View className="mb-4 w-full flex-1 justify-center">
					<TextInput
						value={email}
						onChangeText={handleEmailChange}
						placeholder="john.doe@example.com"
						keyboardType="email-address"
						placeholderTextColor={"#8E8E93"}
						autoCapitalize="none"
						autoCorrect={false}
						textContentType="emailAddress"
						autoComplete="email"
						textAlign={"center"}
						className={
							"rounded-2xl border border-primary-foreground/20 bg-background p-6 text-center font-bold text-primary-foreground text-xl"
						}
					/>
					{emailError ? (
						<Text className="mt-2 ml-1 text-red-500 text-sm">{emailError}</Text>
					) : null}
				</View>
				<View className={"mb-16 w-full gap-y-4 pt-4"}>
					<ContinueButton />
				</View>
			</View>
		</View>
	);
}
