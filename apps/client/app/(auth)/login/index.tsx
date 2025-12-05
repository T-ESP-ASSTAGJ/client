import { login } from "@/actions/auth/auth.action";
import { Input } from "@/components/rnr-ui/input";
import { MainView } from "@/components/ui/MainView";
import { Header } from "@/components/ui/header/header";
import { TouchableButton } from "@/components/ui/touchable-button";
import { useAuth } from "@/contexts/auth-context";
import { fontFamily } from "@/dimensions/font-family";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	Text,
	type TextInput,
	View,
} from "react-native";
import { z } from "zod";

const Email = z.email();

export default function LoginPage() {
	const { email, setEmail } = useAuth();
	const [errorMessage, setErrorMessage] = useState("");
	const [isFocused, setFocused] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const inputRef = useRef<TextInput>(null);

	const handleLogin = async () => {
		setIsLoading(true);

		const res = await login(email);

		if (res.success) {
			setIsLoading(false);
			router.push("/login/otp-login");
		} else if (res.error) {
			setIsLoading(false);
			setErrorMessage(res.error);
		}
	};

	return (
		<MainView safeArea={false}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				className={"w-full flex-1 transition-all duration-200"} // Ajout de w-full ici
				keyboardVerticalOffset={150}
			>
				<Header className={"px-0"} backButton />

				<View className={"flex items-center justify-center mt-20"}>
					{/*TODO: Remplacer par le logo*/}
					<Text
						style={{ fontFamily: fontFamily.extrabold }}
						className={"text-primary-foreground text-5xl"}
					>
						{"JAMLY."}
					</Text>
				</View>
				<View
					className={
						"flex justify-between items-center w-5/6 h-3/5 mx-auto mt-12"
					}
				>
					<Input
						className={"mx-auto transition delay-150 duration-300 ease-in-out"}
						ref={inputRef}
						value={email}
						onChangeText={setEmail}
						placeholder={"user@example.com"}
						label={"Email"}
						onFocus={() => setFocused(true)}
						onBlur={() => setFocused(false)}
						error={errorMessage !== ""}
						errorMessage={errorMessage}
						keyboardType={"email-address"}
						inputMode={"email"}
						autoCapitalize={"none"}
					/>

					<TouchableButton
						variant={"primary"}
						disabled={!Email.safeParse(email).success}
						onPress={handleLogin}
						content={"Log in"}
						isLoading={isLoading}
					/>
				</View>
			</KeyboardAvoidingView>
		</MainView>
	);
}
