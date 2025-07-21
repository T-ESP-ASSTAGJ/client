import NoResult from "@/assets/svg/snippets/no-result.svg";
import { Text } from "@/components/rnr-ui/text";
import React, { type FC } from "react";
import { View } from "react-native";

interface NotConnectedSnippetProps {
	title: string;
	content: string;
}

export const NotConnectedSnippet: FC<NotConnectedSnippetProps> = ({
	title,
	content,
}) => {
	return (
		<View className={"flex flex-1 items-center justify-center gap-7"}>
			<NoResult width={300} height={225} />
			<View className={"gap-4"}>
				<Text
					className="text-center text-3xl"
					style={{ fontFamily: "Urbanist-semibold" }}
				>
					{title}
				</Text>
				<View className="gap-1">
					<Text
						className="max-w-xs px-4 text-center text-[#101010]/60"
						style={{ fontFamily: "Urbanist-medium" }}
					>
						{content}
					</Text>
					{/*<Text className="text-[#101010]/60 text-center" style={{ fontFamily: "Urbanist-medium" }}>
                        Jamais trop tard pour changé 😄
                    </Text>*/}
				</View>
			</View>
			{/*<Button
                className="native:h-[58px] mx-auto w-8/12 rounded-full mt-5"
                onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
                    router.push('/(authentication)/(sign-in)');
                }}
            >
                <Text style={{ fontFamily: "Gilroy-Semibold" }}>
                    Sign-in
                </Text>
            </Button>*/}
		</View>
	);
};
