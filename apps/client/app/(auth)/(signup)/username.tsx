import RegisterFooter from "@/app/(auth)/(signup)/_components/register-footer";
import { Input } from "@/components/rnr-ui/input";
import { Text } from "@/components/rnr-ui/text";
import { fontFamily } from "@/dimensions/font-family";
import { useRegistrationStore } from "@/stores/use-registry-store";
import React, { useRef } from "react";
import { type TextInput, View } from "react-native";

export default function Username() {
	const { formState, setFormState } = useRegistrationStore();
	const { username } = formState;

	const usernameInputRef = useRef<TextInput>(null);

	function onChange(e: string) {
		setFormState((prev) => ({ ...prev, username: e }));
	}

	return (
		<View className="flex-1 bg-background px-6">
			<View className="mt-10 w-full">
				<Text
					className="mb-3 font-bold text-3xl text-primary-foreground tracking-tighter"
					style={{ fontFamily: fontFamily.semibold }}
				>
					What should we call you?
				</Text>
				<Text
					className="text-lg text-muted"
					style={{ fontFamily: fontFamily.regular }}
				>
					Please enter your username or how people should refer to you
				</Text>
			</View>

			<View className="mt-8 flex items-center justify-end gap-y-4">
				<View className="mb-4 w-full justify-center gap-y-12">
					<Input
						ref={usernameInputRef}
						value={username}
						onChangeText={onChange}
						placeholder="john_doe"
						keyboardType="default"
						placeholderTextColor={"#8E8E93"}
						autoCapitalize="words"
						autoCorrect={false}
						returnKeyType="done"
						label={"Username"}
						style={{ fontFamily: fontFamily.medium }}
					/>
				</View>
			</View>
		</View>
	);
}
