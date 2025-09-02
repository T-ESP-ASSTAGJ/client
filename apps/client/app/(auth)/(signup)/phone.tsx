import RegisterFooter from "@/app/(auth)/(signup)/_components/register-footer";
import { Text } from "@/components/rnr-ui/text";
import PhoneInput from "@/app/(auth)/(signup)/_components/inputs/phone/phone-input";
import { useRegistrationStore } from "@/stores/use-registry-store";
import { useEffect, useRef } from "react";
import { type TextInput, View } from "react-native";
import {fontFamily} from "@/dimensions/font-family";

export default function Phone() {
	const { formState, setFormState } = useRegistrationStore();
	const phoneInputRef = useRef<TextInput>(null);

	const onPhoneChange = ({ fullNumber, phone }) => {
		setFormState((prev) => ({
			...prev,
			phoneNumber: phone.length > 0 ? fullNumber : phone,
			isPhoneConfirmed: false,
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
                    style={{ fontFamily: fontFamily.semibold}}
                >
                    What's your phone number?
                </Text>
                <Text>

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
