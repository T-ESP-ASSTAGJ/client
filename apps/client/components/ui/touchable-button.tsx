import TouchableBounce from "@/components/ui/TouchableBounce";
import { Loader } from "@/components/ui/loader/loader";
import { cn } from "@/lib/utils";
import React, { type FC, type ReactNode, useEffect } from "react";
import { type StyleProp, Text, View, type ViewStyle } from "react-native";
import type { GestureResponderEvent } from "react-native/Libraries/Types/CoreEventTypes";

interface TouchableButtonProps {
	disabled?: boolean;
	onPress?: (event: GestureResponderEvent) => void;
	sensory?:
		| boolean
		| "success"
		| "error"
		| "warning"
		| "light"
		| "medium"
		| "heavy";
	children?: ReactNode;
	variant?: "primary" | "secondary";
	className?: string;
	content?: string;
	style?: StyleProp<ViewStyle>;
	isLoading?: boolean;
}

export const TouchableButton: FC<TouchableButtonProps> = ({
	sensory,
	...props
}) => {
	/*const { user } = useUserStore();*/

	return (
		<TouchableBounce
			/*sensory={user?.preferences?.haptic_touch ? sensory : false}*/
			onPress={props.onPress}
			disabled={props.disabled}
		>
			{props.variant === "primary" ? (
				<View
					className={cn(
						`mt-1 flex native:h-[4.5rem] items-center justify-center rounded-3xl bg-primary transition-all duration-300 ${props.disabled || props.isLoading ? "opacity-25" : "opacity-100"}`,
						props.className,
					)}
				>
					{!props.isLoading ? (
						<Text
							className={"text-[16px] text-white"}
							style={{ fontFamily: "Urbanist-Bold" }}
						>
							{props.content}
						</Text>
					) : (
						<Loader width={72} height={72} />
					)}
				</View>
			) : props.variant === "secondary" ? (
				<View
					className={cn(
						`mt-1 flex native:h-[4.5rem] items-center justify-center rounded-3xl bg-primary/10 transition-all duration-300 ${props.disabled ? "opacity-25" : "opacity-100"}`,
						props.className,
					)}
				>
					<Text
						className={"text-[16px] text-primary"}
						style={{ fontFamily: "Urbanist-Bold" }}
					>
						{props.content}
					</Text>
				</View>
			) : (
				<View className={props.className} style={props.style}>
					{props.children}
				</View>
			)}
		</TouchableBounce>
	);
};
