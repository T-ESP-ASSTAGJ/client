import { getUserProfile } from "@/actions/account/user.action";
import { login } from "@/actions/auth/logins.action";
import { Input } from "@/components/rnr-ui/input";
import { MainView } from "@/components/ui/MainView";
import { TouchableButton } from "@/components/ui/touchable-button";
import { fontFamily } from "@/dimensions/font-family";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Text, type TextInput, View } from "react-native";

export default function LoginPage() {
	const [account, setAccount] = useState("");
	const [isFocused, setFocused] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const inputRef = useRef<TextInput>(null);

	async function onLogin() {
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
	}

	return (
		<MainView safeArea={false}>
			<View className={"flex flex-1 items-center justify-center "}>
				{/*TODO: Remplacer par le logo*/}
				<Text
					style={{ fontFamily: fontFamily.extrabold }}
					className={"text-primary-foreground text-5xl"}
				>
					{"JAMLY."}
				</Text>
			</View>
			<View className={"flex items-center h-3/5"}>
				<View className={"flex flex-col w-3/4 gap-y-4"}>
					<Input
						className={"transition delay-150 duration-300 ease-in-out"}
						ref={inputRef}
						value={account}
						onChangeText={setAccount}
						placeholder={
							!isFocused && account.length === 0
								? "Username, phone number, email"
								: ""
						}
						label={
							isFocused || account.length > 0
								? "Username, phone number, email"
								: ""
						}
						onFocus={() => setFocused(true)}
						onBlur={() => setFocused(false)}
					/>
					<TouchableButton
						variant={"primary"}
						disabled={account.length === 0}
						onPress={onLogin}
						content={"Log in"}
						isLoading={isLoading}
					/>
				</View>
			</View>
		</MainView>
	);
}
