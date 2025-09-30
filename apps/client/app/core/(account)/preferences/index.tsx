import { IconSymbol } from "@/components/ui/IconSymbol";
import { MainView } from "@/components/ui/MainView";
import { Header } from "@/components/ui/header/header";
import { Switch, Text, View } from "react-native";

export default function Page() {
	/*const { haptic_touch } = useUserPreferences();*/

	const options_user_notifications = [
		{
			id: "task_reminder",
			title: "Rappel des tâches",
			icon: (
				<IconSymbol name={"bell"} color={"black"} weight={"medium"} size={18} />
			),
			node: (
				<Switch
					trackColor={{ true: "#6C5F54" }}
					/*onValueChange={async (value) => {
                        updatePreferencesLocally({ haptic_touch: value })
                    }}
                    value={haptic_touch}*/
				/>
			),
		},
		{
			id: "habit_reminder",
			title: "Rappel des habitudes",
			icon: (
				<IconSymbol name={"bell"} color={"black"} weight={"medium"} size={18} />
			),
			node: (
				<Switch
					trackColor={{ true: "#6C5F54" }}
					/*onValueChange={async (value) => {
                        updatePreferencesLocally({ haptic_touch: value })
                    }}
                    value={haptic_touch}*/
				/>
			),
		},
	];

	const options_user_info = [
		{
			id: "wake_up_time",
			title: "Heure du levé",
			icon: (
				<IconSymbol
					name={"clock"}
					color={"black"}
					weight={"medium"}
					size={18}
				/>
			),
			node: (
				<View className={"bg-primary/5 px-4 py-2 rounded-md"}>
					<Text className={"text-lg"} style={{ fontFamily: "Urbanist-medium" }}>
						00
					</Text>
				</View>
			),
		},
		{
			id: "vacation_mode",
			title: "Mode vacances",
			icon: (
				<IconSymbol
					name={"sleep"}
					color={"black"}
					weight={"medium"}
					size={18}
				/>
			),
			node: (
				<Switch
					trackColor={{ true: "#6C5F54" }}
					/*onValueChange={async (value) => {
                        updatePreferencesLocally({ haptic_touch: value })
                    }}
                    value={haptic_touch}*/
				/>
			),
		},
	];

	const options_user_preferences = [
		{
			id: "haptic_touch",
			title: "Touché haptique",
			icon: (
				<IconSymbol
					name={"hand.tap"}
					color={"black"}
					weight={"medium"}
					size={18}
				/>
			),
			node: (
				<Switch
					trackColor={{ true: "#6C5F54" }}
					onValueChange={async (value) => {}}
				/>
			),
		},
	];

	return (
		<MainView>
			<Header title={"Preferences"} backButton />

			<View className={"flex items-center gap-y-2"}>
				<View
					className={
						"w-11/12 h-auto bg-white rounded-xl p-4 px-5 mx-auto mt-4 gap-y-4"
					}
				>
					{options_user_info.map((option, index) => (
						<View key={option.id} className={"w-full h-auto flex gap-y-2"}>
							<View
								className={"h-14 flex flex-row justify-between items-center"}
							>
								<View className={"flex flex-row items-center gap-x-3"}>
									<View
										className={
											"rounded-xl p-2 bg-primary/10 justify-center items-center"
										}
									>
										{option.icon}
									</View>
									<Text
										className={"text-lg text-foreground"}
										style={{ fontFamily: "Urbanist-semibold" }}
									>
										{option.title}
									</Text>
								</View>

								{option.node}
							</View>

							{index !== options_user_info.length - 1 && (
								<View className={"w-full flex items-end"}>
									<View className={"w-10/12 h-px bg-foreground/10"} />
								</View>
							)}
						</View>
					))}
				</View>

				<View
					className={
						"w-11/12 h-auto bg-white rounded-xl p-4 px-5 mx-auto mt-4 gap-y-4"
					}
				>
					{options_user_preferences.map((option, index) => (
						<View key={option.id} className={"w-full h-auto flex gap-y-2"}>
							<View
								className={"h-14 flex flex-row justify-between items-center"}
							>
								<View className={"flex flex-row items-center gap-x-3"}>
									<View
										className={
											"rounded-xl p-2 bg-primary/10 justify-center items-center"
										}
									>
										{option.icon}
									</View>
									<Text
										className={"text-lg text-foreground"}
										style={{ fontFamily: "Urbanist-semibold" }}
									>
										{option.title}
									</Text>
								</View>

								{option.node}
							</View>

							{index !== options_user_preferences.length - 1 && (
								<View className={"w-full flex items-end"}>
									<View className={"w-10/12 h-px bg-foreground/10"} />
								</View>
							)}
						</View>
					))}
				</View>

				<View
					className={
						"w-11/12 h-auto bg-white rounded-xl p-4 px-5 mx-auto mt-4 gap-y-4"
					}
				>
					{options_user_notifications.map((option, index) => (
						<View key={option.id} className={"w-full h-auto flex gap-y-2"}>
							<View
								className={"h-14 flex flex-row justify-between items-center"}
							>
								<View className={"flex flex-row items-center gap-x-3"}>
									<View
										className={
											"rounded-xl p-2 bg-primary/10 justify-center items-center"
										}
									>
										{option.icon}
									</View>
									<Text
										className={"text-lg text-foreground"}
										style={{ fontFamily: "Urbanist-semibold" }}
									>
										{option.title}
									</Text>
								</View>

								{option.node}
							</View>

							{index !== options_user_notifications.length - 1 && (
								<View className={"w-full flex items-end"}>
									<View className={"w-10/12 h-px bg-foreground/10"} />
								</View>
							)}
						</View>
					))}
				</View>
			</View>
		</MainView>
	);
}
