import { BackButton } from "@/components/ui/back-button";
import { fontFamily } from "@/dimensions/font-family";
import { cn } from "@/lib/utils";
import type { FC, ReactNode } from "react";
import { Text, View } from "react-native";

interface HeaderProps {
	withCross?: boolean;
	title?: string;
	headerLeft?: ReactNode;
	headerRight?: ReactNode;
	backButton?: boolean;
	className?: string;
}

export const Header: FC<HeaderProps> = ({
	withCross,
	title,
	headerRight,
	headerLeft,
	backButton,
	className,
}) => {
	return (
		<View
			className={cn(
				"flex h-[65px] w-screen flex-row items-center",
				(backButton || headerLeft) && "justify-between",
				headerLeft ? "px-6" : "",
				className,
			)}
		>
			{(backButton || headerLeft) && (
				<View className={"flex h-full w-1/6 justify-center"}>
					{backButton && <BackButton cross={withCross} />}
					{headerLeft}
				</View>
			)}

			{title && (
				<View className={"flex h-full w-4/6 justify-center"}>
					<Text
						className={"text-[24px] text-white"}
						style={{ fontFamily: fontFamily.semibold }}
					>
						{title}
					</Text>
				</View>
			)}

			<View
				className={"flex flex-row h-full items-center justify-center gap-6"}
			>
				{headerRight && headerRight}
			</View>
		</View>
	);
};
