import { ProfileTabs } from "@/app/(tabs)/profile/_components/profile-tabs";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/rnr-ui/alert-dialog";
import { Separator } from "@/components/rnr-ui/separator";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { MainView } from "@/components/ui/MainView";
import { AvatarPicker } from "@/components/ui/avatar-picker";
import { Header } from "@/components/ui/header/header";
import { TouchableButton } from "@/components/ui/touchable-button";
import { fontFamily } from "@/dimensions/font-family";
import { useUserStore } from "@/stores/use-user-store";
import { type Route, router } from "expo-router";
import { Menu, Share2, UserPlus } from "lucide-react-native";
import type { ReactNode } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

function ProfilePage() {
	const { user } = useUserStore();

	return (
		<MainView disableTouchableWrapper>
			<Header
				headerLeft={<UserPlus size={24} color={"white"} />}
				headerRight={<Menu size={24} color={"white"} />}
			/>

			{/* Ajoute flex-1 ici pour donner la hauteur au contenu */}
			<View className={"w-full px-4 flex-1"}>
				<View className={"w-full flex flex-row justify-between items-center"}>
					<View className={"flex flex-row items-center gap-3"}>
						<AvatarPicker />
						<View>
							<Text
								className={"text-lg text-white"}
								style={{ fontFamily: fontFamily.bold }}
							>
								REVERSS
							</Text>
							<Text className={"text-sm text-muted font-semibold"}>
								@REVERSS
							</Text>
						</View>
					</View>

					<TouchableButton
						className={"size-[2.8rem] bg-foreground"}
						size={"icon"}
						icon={
							<IconSymbol
								name="pencil"
								color="#FFF"
								weight="medium"
								size={15}
							/>
						}
					/>
				</View>

				<View className={"flex flex-row items-center gap-4 mt-6 px-2"}>
					<Pressable
						className={"gap-1"}
						onPress={() => router.push("/profile/follows/follows")}
					>
						<Text
							className={"text-white text-xl"}
							style={{ fontFamily: fontFamily.extrabold }}
						>
							441
						</Text>
						<Text
							className={"text-muted"}
							style={{ fontFamily: fontFamily.medium }}
						>
							Followed
						</Text>
					</Pressable>
					<Separator className={"h-5"} orientation={"vertical"} />
					<Pressable
						className={"gap-1"}
						onPress={() => router.push("/profile/followers/followers")}
					>
						<Text
							className={"text-white text-xl"}
							style={{ fontFamily: fontFamily.extrabold }}
						>
							164,6 K
						</Text>
						<Text
							className={"text-muted"}
							style={{ fontFamily: fontFamily.medium }}
						>
							Followers
						</Text>
					</Pressable>
					<Separator className={"h-5"} orientation={"vertical"} />
					<View className={"gap-1"}>
						<Text
							className={"text-white text-xl"}
							style={{ fontFamily: fontFamily.extrabold }}
						>
							10,6 M
						</Text>
						<Text
							className={"text-muted"}
							style={{ fontFamily: fontFamily.medium }}
						>
							Likes
						</Text>
					</View>
				</View>

				<View className={"flex-1 mt-4"}>
					<ProfileTabs />
				</View>
			</View>

			{/*<View className={"w-11/12 h-fit flex mx-auto mt-4 rounded-2xl gap-y-3"}>
                {navigation_item_list.map((item) => (
                    <AccountButton key={item.label} item={item}/>
                ))}

                <ConfirmationLogoutDialog open={isOpen} setOpen={setIsOpen} onConfirm={() => {}}>
                    <AccountButton item={{label: "Déconnexion", icon: <IconSymbol name="arrow.right.square" color="#ef4444" weight="medium" />, path: undefined}}/>
                </ConfirmationLogoutDialog>
            </View>*/}
		</MainView>
	);
}

const navigation_item_list = [
	{
		label: "Informations",
		icon: <IconSymbol name={"person"} color={"#FFF"} weight={"medium"} />,
		path: "/profile/personal-info" as Route,
	},
	{
		label: "Preferences",
		icon: <IconSymbol name={"gear"} color={"#FFF"} weight={"medium"} />,
		path: "/profile/preferences" as Route,
	},
	/*{
        label: "Facturation & Abonnements",
        icon: <IconSymbol name={"receipt"} color={"black"} weight={"medium"} />
    },*/
	{
		label: "Confidentiality & Security",
		icon: <IconSymbol name={"shield"} color={"#FFF"} weight={"medium"} />,
		path: "/(tabs)/profile/account-security" as Route,
	},
	{
		label: "Help & support",
		icon: (
			<IconSymbol name={"info.circle.fill"} color={"#FFF"} weight={"medium"} />
		),
		path: "/(tabs)/profile/help-support" as Route,
	},
];

const ConfirmationLogoutDialog = ({
	open,
	setOpen,
	onConfirm,
	children,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
	onConfirm: () => void;
	children: ReactNode;
}) => {
	const { logout } = useUserStore();

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className={"text-red-500 text-center"}>
						Déconnexion
					</AlertDialogTitle>
					<AlertDialogDescription className={"text-center"}>
						Es-tu sûr de vouloir te déconnecter ?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter
					className={"flex flex-row gap-x-2 justify-center mt-2"}
				>
					<View className={"w-40"}>
						<TouchableButton
							variant={"secondary"}
							sensory={"medium"}
							content={"Annuler"}
							onPress={() => setOpen(false)}
						/>
					</View>
					<View className={"w-40"}>
						<TouchableButton
							variant={"primary"}
							sensory={"medium"}
							content={"Déconnexion"}
							onPress={() => logout()}
						/>
					</View>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default ProfilePage;
