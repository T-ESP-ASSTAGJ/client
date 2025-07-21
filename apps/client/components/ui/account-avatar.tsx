import { Avatar as RNAvatar } from "@/components/rnr-ui/avatar";
import { Image } from "expo-image";

export const AccountAvatar = () => {
	return (
		<RNAvatar
			alt={"Account icon"}
			className={"size-11"}
			style={{
				borderRadius: 99,
				aspectRatio: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Image
				source={require("@/assets/images/avatar.png")}
				className={"size-11 rounded-full"}
			/>
		</RNAvatar>
	);
};
