import {
	BottomSheetBackdrop,
	BottomSheetModal,
	type BottomSheetModalProps,
	BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, type ReactNode, useMemo } from "react";

export type BottomSheetComponentRef = BottomSheetModal;

export interface BottomSheetComponentProps
	extends Omit<BottomSheetModalProps, "children"> {
	bottomSheetContent?: ReactNode;
}

export const BottomSheetComponent = forwardRef<
	BottomSheetComponentRef,
	BottomSheetComponentProps
>(({ bottomSheetContent, ...props }, ref) => {
	const snapPoints = useMemo(() => ["40%"], []);

	return (
		<BottomSheetModal
			ref={ref}
			index={1}
			snapPoints={snapPoints}
			enablePanDownToClose={false}
			enableHandlePanningGesture={false}
			enableContentPanningGesture={false}
			backdropComponent={(backdropProps) => (
				<BottomSheetBackdrop
					{...backdropProps}
					disappearsOnIndex={-1}
					appearsOnIndex={0}
					pressBehavior={"none"}
				/>
			)}
			backgroundStyle={{
				borderTopLeftRadius: 64,
				borderTopRightRadius: 64,
			}}
			handleIndicatorStyle={{
				backgroundColor: "#E7E7E7",
				width: 36,
				height: 5,
				borderRadius: 3,
			}}
			{...props}
		>
			<BottomSheetView>
				<BottomSheetView style={{ padding: 16, gap: 12 }}>
					{bottomSheetContent}
				</BottomSheetView>
			</BottomSheetView>
		</BottomSheetModal>
	);
});
