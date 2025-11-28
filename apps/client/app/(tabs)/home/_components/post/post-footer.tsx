import CommentsList from "@/app/(tabs)/home/_components/comment/comments-list";
import type { IMusic, IStats } from "@/app/(tabs)/home/_types/post.types";
import AlertComponent from "@/components/ui/bottom-sheet/alert";
import {
	BottomSheetComponent,
	type BottomSheetComponentRef,
} from "@/components/ui/bottom-sheet/bottom-sheet-component";
import { getYearFromDate } from "@/helpers/format-date-helper";
import type { ICommentResponse } from "@/types/comments/comment.types";
import {
	Dot,
	LucideCircleCheck,
	MessageCircle,
	LucideThumbsUp as ThumbUp,
} from "lucide-react-native";
import { useCallback, useRef } from "react";
import { Pressable, Text, View } from "react-native";
type PostFooterProps = {
	music: IMusic;
	stats: IStats;
	comments: ICommentResponse;
};

export default function PostFooter({
	music,
	stats,
	comments,
}: PostFooterProps) {
	// const sheetRef = useRef<BottomSheetComponentRef>(null);
	//
	// const openComments = useCallback(() => {
	// 	sheetRef.current?.present();
	// }, []);
	//
	// const handlePrimaryButtonPress = () => {
	// 	console.log("action primaire exécutée");
	// 	sheetRef.current?.dismiss();
	// };
	//
	// const handleSecondaryButtonPress = () => {
	// 	sheetRef.current?.dismiss();
	// };
	//
	// const alertComponent = (
	// 	<AlertComponent
	// 		alertIcon={<LucideCircleCheck size={36} color={"#8D8D8D"} />}
	// 		title={"Where are you at?"}
	// 		description={
	// 			"To view restaurants nearby, please allow Blackbird to use your location."
	// 		}
	// 		primaryButton={{
	// 			label: "test primary",
	// 			onPress: handlePrimaryButtonPress,
	// 		}}
	// 		secondaryButton={{
	// 			label: "test secondary",
	// 			onPress: handleSecondaryButtonPress,
	// 		}}
	// 	/>
	// );

	const sheetRef = useRef<BottomSheetComponentRef>(null);

	const commentComponent = <CommentsList music={music} comments={comments} />;

	const openComments = useCallback(() => {
		sheetRef.current?.present();
	}, []);

	return (
		<>
			<Pressable onPress={openComments} className={"flex flex-col"} hitSlop={8}>
				<View className="flex flex-row items-center justify-between pt-2.5 pr-1 pl-1">
					<View className="flex flex-row items-center">
						<Text className="items-center pb-1 font-semibold text-2xl text-white">
							{music.artist}
						</Text>
						<Dot className={"items-center"} color="white" size={30} />
						<Text className="font-medium text-white">{music.title}</Text>
					</View>

					<Text className="text-muted-foreground">
						{getYearFromDate(music.release_date)}
					</Text>
				</View>
				<View>
					<View
						className={"flex flex-row items-center gap-2 pt-3 pr-1 pb-5 pl-1"}
					>
						<View className={"flex flex-row items-center gap-2"}>
							<ThumbUp color="#8D8D8D" size={14} />
							<Text className="text-muted-foreground text-sm">
								{stats.likes}
							</Text>
						</View>
						<View className={"flex flex-row items-center gap-2"}>
							<MessageCircle color="#8D8D8D" size={14} />
							<Text className="text-muted-foreground text-sm">
								{stats.comments}
							</Text>
						</View>
					</View>
				</View>
			</Pressable>
			{/*<BottomSheetComponent*/}
			{/*    bottomSheetContent={alertComponent}*/}
			{/*    ref={sheetRef}*/}
			{/*    radius={64}*/}
			{/*    snapPoints={["40%"]}*/}
			{/*    locked={true}*/}
			{/*    hideHandle={true}*/}
			{/*/>*/}
			<BottomSheetComponent
				bottomSheetContent={commentComponent}
				ref={sheetRef}
				radius={23}
				snapPoints={["80%"]}
				locked={false}
				backgroundColor={"#181818"}
			/>
		</>
	);
}
