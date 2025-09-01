import ContinueButton from "@/app/(auth)/(signup)/_components/continue-button";
import { Text } from "@/components/rnr-ui/text";
import {
	useRegistrationStore,
} from "@/stores/use-registry-store";
import React, { useRef } from "react";
import { TextInput, View } from "react-native";

export default function Name() {
	const { formState, setFormState } = useRegistrationStore();
	const { username } = formState;

	const usernameInputRef = useRef<TextInput>(null);

	function onChange(e: string) {
		setFormState((prev) => ({ ...prev, username: e }));
	}

	return (
		<View className="flex-1 justify-center bg-background px-6">
			<View className="mt-12 w-full">
				<Text className="mb-4 font-bold text-3xl text-primary-foreground">
					What should we call you?
				</Text>
				<Text className="mb-2 text-lg text-muted">
					Please enter your username or how people should refer to
					you
				</Text>
			</View>

			<View className="flex-1 items-center justify-end gap-y-4">
				<View className="mb-4 w-full flex-1 justify-center gap-y-12">
					<TextInput
						ref={usernameInputRef}
						value={username}
						onChangeText={onChange}
						placeholder="username"
						keyboardType="default"
						placeholderTextColor={"#8E8E93"}
						autoCapitalize="words"
						autoCorrect={false}
						textContentType="username"
						autoComplete="username"
						textAlign={"center"}
						returnKeyType="done"
						className={
							"rounded-2xl border border-primary-foreground/20 bg-background p-6 text-center font-bold text-primary-foreground text-xl"
						}
					/>
				</View>
				<View className={"mb-16 w-full gap-y-4 pt-4"}>
					<ContinueButton />
				</View>
			</View>
		</View>
	);
}
