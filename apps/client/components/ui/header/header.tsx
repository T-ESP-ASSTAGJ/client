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
				backButton ? "px-1" : headerLeft ? "px-6" : "",
				className,
			)}
		>
			<View className="flex h-full w-1/6 justify-center">
				{backButton && <BackButton cross={withCross} />}
				{headerLeft}
			</View>

			<View className="flex h-full flex-1 items-center justify-center">
				{title && (
					<Text
						className="text-[24px] text-white"
						style={{ fontFamily: fontFamily.semibold }}
					>
						{title}
					</Text>
				)}
			</View>

			<View className="flex h-full w-1/6 flex-row items-center justify-end gap-6">
				{headerRight}
			</View>
		</View>
	);
};
