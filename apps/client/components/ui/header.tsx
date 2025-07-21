import { BackButton } from "@/components/ui/back-button";
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
				"flex h-20 w-screen flex-row items-center justify-between px-2.5",
				className,
			)}
		>
			<View className={"flex h-full w-1/6 justify-center"}>
				{backButton && <BackButton cross={withCross} />}

				{headerLeft && headerLeft}
			</View>

			<View className={"flex h-full w-4/6 items-center justify-center"}>
				<Text
					className={"text-[27px]"}
					style={{ fontFamily: "Urbanist-Medium" }}
				>
					{title}
				</Text>
			</View>

			<View className={"flex h-full w-1/6 items-center justify-center"}>
				{headerRight && headerRight}
			</View>
		</View>
	);
};
