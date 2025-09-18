import PhoneInput from "@/app/core/(auth)/(signup)/_components/inputs/phone/phone-input";
import { Text } from "@/components/rnr-ui/text";
import { fontFamily } from "@/dimensions/font-family";
import { useRegistrationStore } from "@/stores/use-registry-store";
import { useEffect, useRef } from "react";
import { type TextInput, View } from "react-native";

export default function Phone() {
	const { formState, setFormState } = useRegistrationStore();
	const phoneInputRef = useRef<TextInput>(null);

	const onPhoneChange = ({ fullNumber, phone }) => {
		setFormState((prev) => ({
			...prev,
			phoneNumber: phone.length > 0 ? fullNumber : phone,
		}));
	};

	useEffect(() => {
		phoneInputRef.current.focus();
	}, []);

	return (
		<View className="flex-1 items-center bg-background px-6 text-start">
			<View>
				<Text
					className="mt-10 text-3xl text-primary-foreground tracking-tighter"
					style={{ fontFamily: fontFamily.semibold }}
				>
					What's your phone number?
				</Text>
			</View>
			<View className={"mt-10 justify-center"}>
				<PhoneInput
					phoneInputRef={phoneInputRef}
					onChange={onPhoneChange}
					initialValue={formState.phoneNumber}
				/>
			</View>
		</View>
	);
}
