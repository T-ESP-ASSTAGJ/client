import { Input } from "@/components/rnr-ui/input";
import { MainView } from "@/components/ui/MainView";
import { Header } from "@/components/ui/header/header";
import { TouchableButton } from "@/components/ui/touchable-button";
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

export default function LoginPage() {
	const [account, setAccount] = useState("");
	const [isFocused, setFocused] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const inputRef = useRef<TextInput>(null);

	/*async function onLogin() {
        setIsLoading(true);

        function loginFail() {
            inputRef.current.focus();
            setIsLoading(false);
            return;
        }
        const req = await login(account);
        if (req.status !== 200) return loginFail();

        const getUserAccount = await getUserProfile();

        if (getUserAccount.status !== 200) return loginFail();
        setIsLoading(false);
        router.push("/(tabs)/home");
    }*/

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
						"flex justify-between items-center w-3/4 h-3/5 mx-auto mt-12"
					}
				>
					<Input
						className={"transition delay-150 duration-300 ease-in-out"}
						ref={inputRef}
						value={account}
						onChangeText={setAccount}
						placeholder={"user@example.com"}
						label={"Email"}
						onFocus={() => setFocused(true)}
						onBlur={() => setFocused(false)}
					/>

					<TouchableButton
						variant={"primary"}
						disabled={account.length === 0}
						onPress={() => setIsLoading(true)}
						content={"Log in"}
						isLoading={isLoading}
					/>
				</View>
			</KeyboardAvoidingView>
		</MainView>
	);
}
