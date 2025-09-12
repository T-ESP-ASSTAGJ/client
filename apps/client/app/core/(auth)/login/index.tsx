import { Input } from "@/components/rnr-ui/input";
import { MainView } from "@/components/ui/MainView";
import { useState } from "react";
import { View } from "react-native";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<MainView disableTouchableWrapper>
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
