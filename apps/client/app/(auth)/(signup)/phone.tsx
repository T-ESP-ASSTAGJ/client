import ContinueButton from "@/app/(auth)/(signup)/_components/continue-button";
import { Text } from "@/components/rnr-ui/text";
import PhoneInput from "@/components/ui/inputs/phone/phone-input";
import { useRegistrationStore } from "@/stores/use-registry-store";
import { useEffect, useRef } from "react";
import { type TextInput, View } from "react-native";

export default function Phone() {
	const { formState, setFormState } = useRegistrationStore();
	const phoneInputRef = useRef<TextInput>(null);

	const onPhoneChange = ({ fullNumber }) => {
		setFormState((prev) => ({ ...prev, phoneNumber: fullNumber }));
	};

	useEffect(() => {
		phoneInputRef.current.focus();
	}, []);

	return (
		<View className="flex-1 items-center bg-background px-6 text-start">
			<Text className="mt-12 font-bold text-3xl text-primary-foreground">
				What's your phone number?
			</Text>
			<View className={"flex-1 justify-center"}>
				<PhoneInput
					phoneInputRef={phoneInputRef}
					onChange={onPhoneChange}
					initialValue={formState.phoneNumber}
				/>
			</View>
			<View className={"mb-16 w-full gap-y-4 pt-4"}>
				<View className="mb-4 rounded-2xl border border-primary-foreground/20 p-4">
					<Text className="text-center text-primary-foreground">
						By continuing, you agree to our{" "}
						<Text className="text-blue-500 underline">Terms of Service</Text>{" "}
						and <Text className="text-blue-500 underline">Privacy Policy</Text>
					</Text>
				</View>
				<ContinueButton />
			</View>
		</View>
	);
}
