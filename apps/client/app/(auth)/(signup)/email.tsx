import ContinueButton from "@/app/(auth)/(signup)/_components/continue_button";
import { Input } from "@/components/rnr-ui/input";
import { Text } from "@/components/rnr-ui/text";
import { useRegistrationStore } from "@/stores/use-registry-store";
import { validateEmail } from "@/utils/validation";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import { View } from "react-native";

export default function Email() {
	const { formState, setFormState, nextStep } = useRegistrationStore();
	const [email, setEmail] = useState(formState.email || "");
	const [emailError, setEmailError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isEmailFocused, setIsEmailFocused] = useState(false);

	useEffect(() => {
		if (!formState.phoneNumber) {
			router.replace("/(auth)/(signup)/phone");
		}
	}, [formState.phoneNumber]);

	useEffect(() => {
		setEmail(formState.email || "");
	}, [formState.email]);

	const handleEmailChange = (text: string) => {
		setEmail(text);
		setEmailError("");

		setFormState((prev) => ({ ...prev, email: text }));
	};

	const validateForm = (): boolean => {
		const emailValidation = validateEmail(email);

		if (!emailValidation.isValid) {
			setEmailError(emailValidation.error || "");
			return false;
		}

		return true;
	};

	// const handleSubmit = async () => {
	// 	if (!validateForm()) {
	// 		return;
	// 	}
	//
	// 	setIsLoading(true);
	//
	// 	try {
	// 		// TODO: Replace with actual API call to check email availability
	// 		await new Promise((resolve) => setTimeout(resolve, 1500));
	//
	// 		// Mock email check - replace with actual API
	// 		const existingEmails = ["test@example.com", "admin@test.com"];
	//
	// 		if (existingEmails.includes(email.toLowerCase())) {
	// 			setEmailError("This email is already registered");
	// 			return;
	// 		}
	//
	// 		setFormState((prev) => ({ ...prev, email }));
	// 		router.push("/(auth)/(signup)/email-confirmation");
	// 	} catch (error) {
	// 		Alert.alert("Error", "Something went wrong. Please try again.");
	// 	} finally {
	// 		setIsLoading(false);
	// 	}
	// };

	return (
		<View className="flex-1 justify-center bg-background px-8">
			<View className="mt-12 w-full">
				<Text className="mb-4 font-bold text-3xl text-primary-foreground">
					What's your email?
				</Text>
				<Text className="mb-2 text-lg text-muted">
					We'll send you a confirmation link to verify your email address
				</Text>
			</View>

			<View className="mb-8 flex-1 items-center justify-end gap-y-4">
				<View className="mb-4 flex-1 justify-center">
					<Input
						value={email}
						onChangeText={handleEmailChange}
						onFocus={() => setIsEmailFocused(true)}
						onBlur={() => setIsEmailFocused(false)}
						placeholder="john.doe@example.com"
						keyboardType="email-address"
						placeholderTextColor={"#8E8E93"}
						autoCapitalize="none"
						autoCorrect={false}
						textContentType="emailAddress"
						autoComplete="email"
						editable={!isLoading}
						className={
							"border border-primary-foreground bg-background font-bold text-primary-foreground"
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
