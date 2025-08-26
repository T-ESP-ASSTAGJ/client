import { Input } from "@/components/rnr-ui/input";
import { MainView } from "@/components/ui/MainView";
import { Header } from "@/components/ui/header";
import { useState } from "react";
import { View } from "react-native";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<MainView disableTouchableWrapper>
			<Header backButton={true} />
			<View className={""}>
				<Input value={email} placeholder={"Email"} onChangeText={setEmail} />
				<Input
					value={password}
					placeholder={"Password"}
					onChangeText={setPassword}
				/>
			</View>
		</MainView>
	);
}
