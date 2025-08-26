import { Button } from "@/components/rnr-ui/button";
import { Input } from "@/components/rnr-ui/input";
import { Text } from "@/components/rnr-ui/text";
import { MainView } from "@/components/ui/MainView";
import { useRegistrationStore } from "@/stores/use-registry-store";
import { validateEmail } from "@/utils/validation";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import { Alert, KeyboardAvoidingView, Platform, View } from "react-native";

export default function Email() {
	const { formState, setFormState } = useRegistrationStore();
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

	const handleSubmit = async () => {
		if (!validateForm()) {
			return;
		}

		setIsLoading(true);

		try {
			// TODO: Replace with actual API call to check email availability
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// Mock email check - replace with actual API
			const existingEmails = ["test@example.com", "admin@test.com"];

			if (existingEmails.includes(email.toLowerCase())) {
				setEmailError("This email is already registered");
				return;
			}

			setFormState((prev) => ({ ...prev, email }));
			router.push("/(auth)/(signup)/email-confirmation");
		} catch (error) {
			Alert.alert("Error", "Something went wrong. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<MainView disableTouchableWrapper>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				className="flex-1"
			>
				<View className="flex-1 justify-center px-8">
					<View className="mb-12 items-center">
						<Text className="mb-4 text-center font-bold text-2xl">
							What's your email?
						</Text>
						<Text className="px-4 text-center text-gray-600">
							We'll send you a confirmation link to verify your email address
						</Text>
					</View>

					<View className="mb-8">
						<View className="mb-4">
							<Input
								label="Email Address"
								value={email}
								onChangeText={handleEmailChange}
								onFocus={() => setIsEmailFocused(true)}
								onBlur={() => setIsEmailFocused(false)}
								placeholder="Enter your email address"
								keyboardType="email-address"
								autoCapitalize="none"
								autoCorrect={false}
								textContentType="emailAddress"
								autoComplete="email"
								editable={!isLoading}
								className={`
                                    ${isEmailFocused ? "border-blue-500" : ""}
                                    ${emailError ? "border-red-500" : ""}
                                `}
							/>
							{emailError ? (
								<Text className="mt-2 ml-1 text-red-500 text-sm">
									{emailError}
								</Text>
							) : null}
						</View>

						<Button
							onPress={handleSubmit}
							disabled={!email.trim() || isLoading || !!emailError}
							className="mb-4 w-full"
							variant="default"
							size="lg"
						>
							<Text>{isLoading ? "Checking..." : "Continue"}</Text>
						</Button>
					</View>
				</View>
			</KeyboardAvoidingView>
		</MainView>
	);
}
