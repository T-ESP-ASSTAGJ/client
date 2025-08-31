import { Input } from "@/components/rnr-ui/input";
import { IconSymbol } from "@/components/ui/IconSymbol";
import PhoneInputCountryItem from "@/components/ui/inputs/phone/phone-input-country-item";
import { type Country, countries } from "@/constants/countries";
import { Portal } from "@rn-primitives/portal";
import { type RefObject, useEffect, useRef, useState } from "react";
import {
	Animated,
	FlatList,
	Pressable,
	Text,
	type TextInput,
	TouchableOpacity,
	View,
} from "react-native";

export default function PhoneInput({
	onChange,
	initialValue,
	phoneInputRef,
}: {
	onChange: (data: {
		phone: string;
		country: Country;
		fullNumber: string;
	}) => void;
	initialValue?: string;
	phoneInputRef?: RefObject<TextInput>;
}) {
	const parseInitialValue = (fullNumber: string) => {
		if (!fullNumber) return { phone: "", country: countries[0] };

		const matchingCountry = countries.find((c) =>
			fullNumber.startsWith(c.dialCode),
		);
		if (matchingCountry) {
			const phoneOnly = fullNumber.substring(matchingCountry.dialCode.length);
			return { phone: phoneOnly, country: matchingCountry };
		}

		return { phone: fullNumber, country: countries[0] };
	};

	const { phone: initialPhone, country: initialCountry } = parseInitialValue(
		initialValue || "",
	);

	const [phone, setPhone] = useState(initialPhone);
	const [country, setCountry] = useState<Country>(initialCountry);
	const [isOpen, setIsOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [displayedCountries, setDisplayedCountries] = useState<Country[]>([]);

	const slideAnim = useRef(new Animated.Value(0)).current;
	const backdropAnim = useRef(new Animated.Value(0)).current;
	const listOpacity = useRef(new Animated.Value(1)).current;

	const filteredCountries = countries.filter(
		(country) =>
			country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			country.code.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	useEffect(() => {
		if (searchQuery === "") {
			setDisplayedCountries(filteredCountries);
			return;
		}

		Animated.timing(listOpacity, {
			toValue: 0,
			duration: 150,
			useNativeDriver: true,
		}).start(() => {
			setDisplayedCountries(filteredCountries);
			Animated.timing(listOpacity, {
				toValue: 1,
				duration: 200,
				useNativeDriver: true,
			}).start();
		});
	}, [searchQuery]);

	useEffect(() => {
		setDisplayedCountries(countries);
	}, []);

	const openBottomSheet = () => {
		phoneInputRef.current?.blur();
		setIsOpen(true);
		setDisplayedCountries(countries);
		Animated.parallel([
			Animated.timing(backdropAnim, {
				toValue: 1,
				duration: 250,
				useNativeDriver: true,
			}),
			Animated.timing(slideAnim, {
				toValue: 1,
				duration: 250,
				useNativeDriver: true,
			}),
		]).start();
	};

	const closeBottomSheet = () => {
		Animated.parallel([
			Animated.timing(backdropAnim, {
				toValue: 0,
				duration: 200,
				useNativeDriver: true,
			}),
			Animated.timing(slideAnim, {
				toValue: 0,
				duration: 200,
				useNativeDriver: true,
			}),
		]).start(() => {
			setIsOpen(false);
			setSearchQuery("");
			listOpacity.setValue(1);
		});
	};

	const handlePhoneChange = (text: string) => {
		const numericValue = text.replace(/[^0-9]/g, "");
		setPhone(numericValue);
	};

	const handleCountryChange = (newCountry: Country) => {
		setCountry(newCountry);
	};

	useEffect(() => {
		onChange({
			phone: phone,
			country,
			fullNumber: country.dialCode + phone,
		});
		phoneInputRef.current?.focus();
	}, [phone, country]);

	return (
		<>
			<View className="flex w-full flex-row items-center justify-center rounded-2xl border border-primary-foreground/30">
				<TouchableOpacity
					onPress={openBottomSheet}
					className={
						"flex h-full flex-row items-center justify-center gap-x-2 rounded-full border p-2 px-4"
					}
				>
					<Text className="text-lg">{country.flag}</Text>
					<IconSymbol size={12} name={"chevron.down"} color={"white"} />
				</TouchableOpacity>
				<View
					className={
						"flex w-3/4 flex-row items-center justify-center px-2 py-2"
					}
				>
					<Input
						keyboardType={"phone-pad"}
						placeholder="Your phone number"
						value={`(${country.dialCode})`}
						className={
							"pointer-events-none rounded-r-none border-0 border-b-gray-950 bg-background font-extrabold text-muted-foreground"
						}
					/>
					<Input
						ref={phoneInputRef}
						keyboardType={"phone-pad"}
						placeholderTextColor={"#8E8E93"}
						inputMode={"numeric"}
						placeholder="Your phone number"
						value={phone}
						onChangeText={handlePhoneChange}
						className={
							"flex-1 border-0 bg-background font-extrabold text-lg text-primary-foreground"
						}
					/>
				</View>
			</View>

			{isOpen && (
				<Portal name="country-selector">
					<Animated.View
						className="absolute inset-0 justify-end"
						style={{
							backgroundColor: "rgba(0,0,0,0.5)",
							opacity: backdropAnim,
						}}
					>
						<Pressable className="flex-1" onPress={closeBottomSheet} />
						<Animated.View
							className="flex-1 rounded-t-3xl bg-white pt-5"
							style={{
								height: "70%",
								transform: [
									{
										translateY: slideAnim.interpolate({
											inputRange: [0, 1],
											outputRange: [500, 0],
										}),
									},
								],
							}}
						>
							<Text className="mb-4 text-center font-semibold text-lg">
								Select Country
							</Text>
							<View className="mb-4 px-4">
								<View>
									<Input
										placeholder="Search countries..."
										value={searchQuery}
										onChangeText={setSearchQuery}
										className={"relative rounded-lg border pl-10"}
									/>
									<View
										className="absolute bottom-0 left-3"
										style={{ transform: [{ translateY: -12 }] }}
									>
										<IconSymbol
											name={"magnifyingglass"}
											color={"#A5A5A5"}
											size={16}
										/>
									</View>
								</View>
							</View>

							<Animated.View
								className="flex-1"
								style={{ opacity: listOpacity }}
							>
								<FlatList
									data={displayedCountries}
									keyExtractor={(item) => item.code}
									showsVerticalScrollIndicator={true}
									indicatorStyle="default"
									contentContainerStyle={{ paddingBottom: 20 }}
									style={{
										flex: 1,
										marginRight: 0,
									}}
									renderItem={({ item }) => (
										<PhoneInputCountryItem
											item={item}
											isSelected={country.code === item.code}
											onPress={() => {
												handleCountryChange(item);
												closeBottomSheet();
											}}
										/>
									)}
								/>
							</Animated.View>
						</Animated.View>
					</Animated.View>
				</Portal>
			)}
		</>
	);
}
