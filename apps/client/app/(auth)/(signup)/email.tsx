import { Input } from "@/components/rnr-ui/input";
import { Text } from "@/components/rnr-ui/text";
import { fontFamily } from "@/dimensions/font-family";
import { useRegistrationStore } from "@/stores/use-registry-store";
import { useState } from "react";
import { TextInput, View } from "react-native";

export default function Email() {
	const { formState, setFormState } = useRegistrationStore();
	const [email, setEmail] = useState(formState.email || "");

	const handleEmailChange = (text: string) => {
		setEmail(text);
		setFormState((prev) => ({ ...prev, email: text }));
	};

	return (
		<View className="flex-1 bg-background px-6">
			<View className="mt-10 w-full">
				<Text
					className="mb-2 font-bold text-3xl text-primary-foreground tracking-tighter"
					style={{ fontFamily: fontFamily.semibold }}
				>
					What's your email?
				</Text>
				<Text
					className="text-lg text-muted"
					style={{ fontFamily: fontFamily.regular }}
				>
					We'll send you a confirmation link to verify your email address
				</Text>
			</View>

			<View className="flex items-center justify-end gap-y-4 mt-8">
				<View className="w-full justify-center">
					<Input
						value={email}
						onChangeText={handleEmailChange}
						placeholder="john.doe@example.com"
						keyboardType="email-address"
						placeholderTextColor={"#8E8E93"}
						autoCapitalize="none"
						autoCorrect={false}
						textContentType="emailAddress"
						autoComplete="email"
						label={"E-mail"}
					/>
				</View>
			</View>
		</View>
	);
}
