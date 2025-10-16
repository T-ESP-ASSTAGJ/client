import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/rnr-ui/avatar";
import { Button } from "@/components/rnr-ui/button";
import { TouchableButton } from "@/components/ui/touchable-button";
import { fontFamily } from "@/dimensions/font-family";
import type { IFriend } from "@/types/friends/friend.types";
import { Pressable, Text, View } from "react-native";

interface IFriendProps {
	friend: IFriend;
}

export default function Friend({ friend }: IFriendProps) {
	return (
		<View className={"flex flex-row justify-between"}>
			<Pressable className={"flex flex-row gap-4"}>
				<View className={"flex justify-center"}>
					<Avatar
						alt={"User avatar"}
						style={{
							width: 42,
							height: 42,
						}}
					>
						<AvatarImage
							source={{ uri: friend.avatar }}
							style={{
								width: 42,
								height: 42,
							}}
						/>
						<AvatarFallback>
							<Text style={{ fontFamily: fontFamily.regular }}>Avatar</Text>
						</AvatarFallback>
					</Avatar>
				</View>
				<View className={"flex flex-col gap-1"}>
					<View className={"flex flex-row gap-2"}>
						<Text
							className={"text-white text-xl"}
							style={{ fontFamily: fontFamily.semibold }}
						>
							{friend.first_name}
						</Text>
						<Text
							className={"text-white text-xl"}
							style={{ fontFamily: fontFamily.semibold }}
						>
							{friend.last_name}
						</Text>
					</View>
					<Text
						className={"text-muted text-lg"}
						style={{ fontFamily: fontFamily.regular }}
					>
						@{friend.username}
					</Text>
				</View>
			</Pressable>
			<View className={"flex justify-center"}>
				{friend.is_following ? (
					<TouchableButton
						content={"Follow"}
						className={"native:h-10 w-[105px] bg-white"}
						textClassName={"text-sm"}
					/>
				) : (
					<TouchableButton
						content={"Following"}
						className={
							"native:h-11 w-[105px] bg-black border-[1px] border-[#C8C8C8]"
						}
						textClassName={"text-sm text-white"}
					/>
				)}
			</View>
		</View>
	);
}
