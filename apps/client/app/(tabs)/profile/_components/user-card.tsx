import { follow, unfollow } from "@/actions/profile/follow/follow.action";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/rnr-ui/avatar";
import { TouchableButton } from "@/components/ui/touchable-button";
import { fontFamily } from "@/dimensions/font-family";
import type { IFollower } from "@/types/profile/follower/follower.types";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

interface IFollowerProps {
	follower: IFollower;
	isFollowersPage: boolean;
	isFollowing?: boolean;
	onFollowChange?: () => void;
}

export default function UserCard({
	follower,
	isFollowersPage,
	isFollowing,
	onFollowChange,
}: IFollowerProps) {
	const [loading, setLoading] = useState(false);
	const [localIsFollowing, setLocalIsFollowing] = useState(!!isFollowing);
	const [imageLoading, setImageLoading] = useState(true);
	const [imageError, setImageError] = useState(false);

	useEffect(() => {
		setLocalIsFollowing(!!isFollowing);
	}, [isFollowing]);

	const handleToggleFollow = async () => {
		if (loading) return;

		try {
			setLoading(true);

			if (localIsFollowing) {
				const response = await unfollow(follower.id);
				if (response.success) {
					setLocalIsFollowing(false);
					onFollowChange?.();
				}
			} else {
				const response = await follow(follower.id);
				if (response.success) {
					setLocalIsFollowing(true);
					onFollowChange?.();
				}
			}
		} catch (e) {
			console.log("follow/unfollow error", e);
		} finally {
			setLoading(false);
		}
	};

	const hasValidPicture = !!follower.profilePicture && !imageError;

	return (
		<View className={"flex flex-row justify-between"}>
			<Pressable className={"flex flex-row gap-4"}>
				<View className={"flex justify-center"}>
					<Avatar alt={"UserCard avatar"} style={{ width: 42, height: 42 }}>
						<View
							style={{
								width: 42,
								height: 42,
								borderRadius: 21,
								overflow: "hidden",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							{imageLoading && (
								<View
									style={{
										width: 42,
										height: 42,
										borderRadius: 21,
										backgroundColor: "#2a2a2a",
										position: "absolute",
									}}
								/>
							)}

							{hasValidPicture && (
								<AvatarImage
									source={{ uri: follower.profilePicture }}
									style={{ width: 42, height: 42 }}
									onLoad={() => setImageLoading(false)}
									onError={() => {
										setImageLoading(false);
										setImageError(true);
									}}
								/>
							)}

							{(!hasValidPicture || imageError) && !imageLoading && (
								<AvatarFallback>
									<Text
										style={{
											fontFamily: fontFamily.regular,
											color: "#fff",
										}}
									>
										{follower.username?.[0]?.toUpperCase() ?? "?"}
									</Text>
								</AvatarFallback>
							)}
						</View>
					</Avatar>
				</View>

				<View className={"flex flex-col gap-1 justify-center"}>
					<Text
						className={"flex text-white text-lg justify-center items-center"}
						style={{ fontFamily: fontFamily.medium }}
					>
						{follower.username}
					</Text>
				</View>
			</Pressable>

			<View className="flex flex-row items-center justify-center gap-3">
				{isFollowersPage ? (
					<TouchableButton
						content={
							loading ? "" : localIsFollowing ? "Unfollow" : "Follow back"
						}
						className={
							localIsFollowing
								? "native:h-10 w-[120px] bg-black border border-[#C8C8C8]"
								: "native:h-10 w-[120px] bg-white"
						}
						textClassName={localIsFollowing ? "text-sm text-white" : "text-sm"}
						onPress={handleToggleFollow}
						disabled={loading}
						icon={loading ? <ActivityIndicator size="small" /> : undefined}
					/>
				) : (
					<TouchableButton
						content={loading ? "" : localIsFollowing ? "Unfollow" : "Follow"}
						className={
							localIsFollowing
								? "native:h-10 w-[105px] bg-black border border-[#C8C8C8]"
								: "native:h-10 w-[105px] bg-white"
						}
						textClassName={localIsFollowing ? "text-sm text-white" : "text-sm"}
						onPress={handleToggleFollow}
						disabled={loading}
						icon={loading ? <ActivityIndicator size="small" /> : undefined}
					/>
				)}
			</View>
		</View>
	);
}
