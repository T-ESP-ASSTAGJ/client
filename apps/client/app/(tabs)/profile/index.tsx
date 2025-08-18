// import Level from "@/assets/svg/level.svg";
// import UpgradePlan from "@/assets/svg/upgrade-plan.svg";
// import {
// 	AlertDialog,
// 	AlertDialogContent,
// 	AlertDialogDescription,
// 	AlertDialogFooter,
// 	AlertDialogHeader,
// 	AlertDialogTitle,
// 	AlertDialogTrigger,
// } from "@/components/rnr-ui/alert-dialog";
// import { Progress } from "@/components/rnr-ui/progress";
// import { IconSymbol } from "@/components/ui/IconSymbol";
// import { MainView } from "@/components/ui/MainView";
// import { AccountButton } from "@/components/ui/account-button";
// import { Header } from "@/components/ui/header";
// import { TouchableButton } from "@/components/ui/touchable-button";
// import { useUserStore } from "@/stores/use-user-store";
// import type { Route } from "expo-router";
// import React, { type ReactNode, useEffect, useState } from "react";
// import {
// 	Pressable,
// 	ScrollView,
// 	Text,
// 	TouchableOpacity,
// 	View,
// } from "react-native";
//
// function ProfileScreen() {
// 	const { user } = useUserStore();
// 	const [isOpen, setIsOpen] = useState(false);
// 	const [isScrolling, setIsScrolling] = useState(false);
//
// 	return (
// 		<MainView className={"bg-[#F5F5F5]"} disableTouchableWrapper>
// 			<Header title={"Mon compte"} />
//
// 			<ScrollView
// 				className={"mt-3"}
// 				onScrollBeginDrag={() => setIsScrolling(true)}
// 				onScrollEndDrag={() => setIsScrolling(false)}
// 				onMomentumScrollEnd={() => setIsScrolling(false)}
// 			>
// 				<TouchableButton
// 					sensory={"heavy"}
// 					className={
// 						"mx-auto flex h-[7rem] w-11/12 flex-row items-center gap-x-2 rounded-2xl bg-primary px-6"
// 					}
// 				>
// 					<UpgradePlan width={77} height={77} />
//
// 					<View
// 						className={"flex h-full max-w-64 justify-center gap-y-1 pl-3.5"}
// 					>
// 						<Text
// 							className={"text-white text-xl"}
// 							style={{ fontFamily: "Urbanist-bold" }}
// 						>
// 							Passer à l'offre Premium !
// 						</Text>
// 						<Text
// 							className={"text-sm text-white leading-[160%] tracking-wide"}
// 							style={{ fontFamily: "Urbanist-medium" }}
// 						>
// 							Profitez de tous les avantages et explorez plus de possibilités
// 						</Text>
// 					</View>
// 				</TouchableButton>
//
// 				{/*<TouchableButton sensory={"heavy"} className={"w-11/12 h-[6rem] rounded-2xl bg-white mx-auto flex flex-row items-center gap-x-1 px-4 mt-4"}>
//                     <Level width={70} height={70}/>
//
//                     <View className={"w-4/5 h-full pl-3.5 flex justify-center gap-y-5 pr-4"}>
//                         <View className={"w-full flex flex-row justify-between items-center"}>
//                             <Text className={"text-xl"} style={{ fontFamily: "Urbanist-bold" }}>Level {user.user_data.level}</Text>
//
//                             <IconSymbol name={"arrow.up.right"} color={"black"} weight={"semibold"} size={16}/>
//                         </View>
//                         <View className={"flex items-center gap-y-1.5"}>
//                             <Progress className={"h-4"} value={user.user_data.experience_points / user.user_data.level}/>
//                             <Text className={"text-xs text-primary"} style={{ fontFamily: "Urbanist-medium" }}>250/1500 Tâches</Text>
//                         </View>
//                     </View>
//
//                     <IconSymbol name={"chevron.right"} color={"black"} weight={"medium"} size={18}/>
//                 </TouchableButton>*/}
//
// 				<View className={"mx-auto mt-5 flex h-fit w-11/12 gap-y-3 rounded-2xl"}>
// 					{navigation_item_list.map((item) => (
// 						<AccountButton key={item.label} item={item} />
// 					))}
//
// 					<ConfirmationLogoutDialog
// 						open={isOpen}
// 						setOpen={setIsOpen}
// 						onConfirm={() => {}}
// 					>
// 						<AccountButton
// 							item={{
// 								label: "Déconnexion",
// 								icon: (
// 									<IconSymbol
// 										name="arrow.right.square"
// 										color="#ef4444"
// 										weight="medium"
// 									/>
// 								),
// 								path: undefined,
// 							}}
// 						/>
// 					</ConfirmationLogoutDialog>
// 				</View>
//
// 				<View className={"h-20 w-px"} />
// 			</ScrollView>
// 		</MainView>
// 	);
// }
//
// const navigation_item_list = [
// 	{
// 		label: "Préférences",
// 		icon: <IconSymbol name={"gear"} color={"#6C5F54"} weight={"medium"} />,
// 		path: "/(tabs)/profile/preferences" as Route,
// 	},
// 	{
// 		label: "Informations Personnelles",
// 		icon: <IconSymbol name={"person"} color={"#6C5F54"} weight={"medium"} />,
// 		path: "/(tabs)/profile/personal-info" as Route,
// 	},
// 	{
// 		label: "Moyens de Paiement",
// 		icon: (
// 			<IconSymbol name={"creditcard"} color={"#6C5F54"} weight={"medium"} />
// 		),
// 		path: "/(tabs)/profile/payment-methods" as Route,
// 	},
// 	/*{
//         label: "Facturation & Abonnements",
//         icon: <IconSymbol name={"receipt"} color={"black"} weight={"medium"} />
//     },*/
// 	{
// 		label: "Compte & Sécurité",
// 		icon: <IconSymbol name={"shield"} color={"#6C5F54"} weight={"medium"} />,
// 		path: "/(tabs)/profile/account-security" as Route,
// 	},
// 	{
// 		label: "Données & Analyses",
// 		icon: (
// 			<IconSymbol
// 				name={"chart.bar.xaxis.ascending"}
// 				color={"#6C5F54"}
// 				weight={"medium"}
// 			/>
// 		),
// 		path: "/(tabs)/profile/data-analysis" as Route,
// 	},
// 	{
// 		label: "Aide & Support",
// 		icon: (
// 			<IconSymbol
// 				name={"info.circle.fill"}
// 				color={"#6C5F54"}
// 				weight={"medium"}
// 			/>
// 		),
// 		path: "/(tabs)/profile/help-support" as Route,
// 	},
// ];
//
// const ConfirmationLogoutDialog = ({
// 	open,
// 	setOpen,
// 	onConfirm,
// 	children,
// }: {
// 	open: boolean;
// 	setOpen: (open: boolean) => void;
// 	onConfirm: () => void;
// 	children: ReactNode;
// }) => {
// 	const { logout } = useUserStore();
//
// 	return (
// 		<AlertDialog open={open} onOpenChange={setOpen}>
// 			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
// 			<AlertDialogContent>
// 				<AlertDialogHeader>
// 					<AlertDialogTitle className={"text-center text-red-500"}>
// 						Déconnexion
// 					</AlertDialogTitle>
// 					<AlertDialogDescription className={"text-center"}>
// 						Es-tu sûr de vouloir te déconnecter ?
// 					</AlertDialogDescription>
// 				</AlertDialogHeader>
// 				<AlertDialogFooter
// 					className={"mt-2 flex flex-row justify-center gap-x-2"}
// 				>
// 					<View className={"w-40"}>
// 						<TouchableButton
// 							variant={"secondary"}
// 							sensory={"medium"}
// 							content={"Annuler"}
// 							onPress={() => setOpen(false)}
// 						/>
// 					</View>
// 					<View className={"w-40"}>
// 						<TouchableButton
// 							variant={"primary"}
// 							sensory={"medium"}
// 							content={"Déconnexion"}
// 							onPress={() => logout()}
// 						/>
// 					</View>
// 				</AlertDialogFooter>
// 			</AlertDialogContent>
// 		</AlertDialog>
// 	);
// };
//
// export default ProfileScreen;
