import CircularProgress from "@/components/CircularProgress";
import { TouchableButton } from "@/components/ui/touchable-button";
import { getDaysTimeline } from "@/utils/functions";
import { useFocusEffect } from "@react-navigation/native";
import { isAfter, isBefore, isSameDay } from "date-fns";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import Animated, {
	scrollTo,
	useAnimatedRef,
	runOnUI,
} from "react-native-reanimated";

interface DaysTimelineItem {
	label: string;
	date: Date;
}

export const DaysTimeline = () => {
	const [days, setDays] = useState<DaysTimelineItem[]>([]);
	const [itemPositions, setItemPositions] = useState<Record<number, number>>(
		{},
	);
	const scrollRef = useAnimatedRef<Animated.ScrollView>();
	const screenWidth = Dimensions.get("window").width;
	const didScroll = useRef(false);

	const today = new Date();

	useFocusEffect(
		useCallback(() => {
			const loadedDays = getDaysTimeline();
			setDays(loadedDays);
			setItemPositions({}); // reset positions
			didScroll.current = false; // reset scroll flag
		}, []),
	);

	useEffect(() => {
		const indexToday = days.findIndex((d) => isSameDay(d.date, today));
		if (
			indexToday !== -1 &&
			itemPositions[indexToday] !== undefined &&
			scrollRef.current &&
			!didScroll.current
		) {
			const itemCenter = itemPositions[indexToday];
			const offsetX = Math.max(0, itemCenter - screenWidth / 2);

			runOnUI(() => {
				scrollTo(scrollRef, offsetX, 0, true);
			})();
			didScroll.current = true;
		}
	}, [itemPositions, days]);

	return (
		<View className="mx-auto flex h-fit w-full justify-center gap-y-12">
			<Animated.ScrollView
				horizontal
				ref={scrollRef}
				showsHorizontalScrollIndicator={false}
				decelerationRate="fast"
				scrollEventThrottle={16}
			>
				{days.length > 0 && (
					<View className="mx-5 flex h-28 w-auto flex-row items-center gap-x-8">
						{days.map((day, index) => {
							const isToday = isSameDay(day.date, today);
							const isFuture = isAfter(day.date, today);
							const isPast = isBefore(day.date, today);

							return (
								<View
									key={index}
									onLayout={(e) => {
										const layoutX =
											e.nativeEvent.layout.x + e.nativeEvent.layout.width / 2;
										setItemPositions((prev) => ({ ...prev, [index]: layoutX }));
									}}
								>
									{isToday ? (
										<TouchableButton
											sensory={"light"}
											className={"mt-4 flex items-center gap-y-2"}
										>
											<View className="items-center">
												<CircularProgress percentage={40} size={40} />
												<Text
													className="mt-1.5"
													style={{ fontFamily: "Urbanist-semibold" }}
												>
													{day.label}
												</Text>
											</View>
											<View className="size-2.5 rounded-full bg-primary/80" />
										</TouchableButton>
									) : isFuture ? (
										<View className="items-center">
											<CircularProgress percentage={0} size={32} />
											<Text
												className="mt-1.5"
												style={{ fontFamily: "Urbanist-semibold" }}
											>
												{day.label}
											</Text>
										</View>
									) : (
										<TouchableButton sensory={"light"} className="items-center">
											<CircularProgress
												percentage={Math.floor(Math.random() * 100)}
												size={32}
											/>
											<Text
												className="mt-1.5"
												style={{ fontFamily: "Urbanist-semibold" }}
											>
												{day.label}
											</Text>
										</TouchableButton>
									)}
								</View>
							);
						})}
					</View>
				)}
			</Animated.ScrollView>
		</View>
	);
};
