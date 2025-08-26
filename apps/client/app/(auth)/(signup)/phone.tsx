import { Button } from "@/components/rnr-ui/button";
import { Text } from "@/components/rnr-ui/text";
import { MainView } from "@/components/ui/MainView";
import PhoneInput from "@/components/ui/inputs/phone/phone-input";
import { useRegistrationStore } from "@/stores/use-registry-store";
import { router } from "expo-router";
import { View } from "react-native";

export default function PhonePage() {
	const { formState, setFormState } = useRegistrationStore();

	const onPhoneChange = ({ fullNumber }) => {
		setFormState((prev) => ({ ...prev, phoneNumber: fullNumber }));
	};

	function onSubmit() {
		console.log(formState.phoneNumber);
		router.navigate("/(auth)/(signup)/phone-confirmation");
	}

	return (
		<MainView disableTouchableWrapper>
			<View className="flex h-full w-full items-center justify-between">
				<View className={"flex h-1/3 justify-end gap-y-4 px-6"}>
					<Text className="mb-8 text-center font-bold text-3xl">
						Phone Number
					</Text>
					<PhoneInput
						onChange={onPhoneChange}
						initialValue={formState.phoneNumber}
					/>
				</View>
				<View className={"flex h-1/2 w-full justify-center px-8"}>
					<View className="mb-6 rounded-lg bg-gray-50 p-4">
						<Text className="text-center text-gray-600 text-sm leading-5">
							By continuing, you agree to our{" "}
							<Text className="text-blue-500 underline">Terms of Service</Text>{" "}
							and{" "}
							<Text className="text-blue-500 underline">Privacy Policy</Text>
						</Text>
					</View>
					<Button onPress={onSubmit} className={"w-full"} variant="default">
						<Text>{"Continue"}</Text>
					</Button>
				</View>
			</View>
		</MainView>
	);
}
