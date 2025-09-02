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
	radius: number;
	snapPoints: string[];
	locked: boolean;
	hideHandle?: boolean;
	backgroundColor?: string;
}

export const BottomSheetComponent = forwardRef<
	BottomSheetComponentRef,
	BottomSheetComponentProps
>(
	(
		{
			bottomSheetContent,
			radius,
			snapPoints,
			locked,
			hideHandle,
			backgroundColor,
		},
		ref,
	) => {
		const snapPoint = useMemo(() => snapPoints, [snapPoints]);

		return (
			<BottomSheetModal
				ref={ref}
				index={0}
				snapPoints={snapPoint}
				enablePanDownToClose={!locked}
				enableHandlePanningGesture={!locked}
				enableContentPanningGesture={!locked}
				enableDynamicSizing={false}
				backdropComponent={(backdropProps) => (
					<BottomSheetBackdrop
						{...backdropProps}
						disappearsOnIndex={-1}
						appearsOnIndex={0}
						pressBehavior={locked ? "none" : "close"}
					/>
				)}
				backgroundStyle={{
					backgroundColor: backgroundColor ?? "#FFFFFF",
					borderTopLeftRadius: radius,
					borderTopRightRadius: radius,
				}}
				{...(hideHandle
					? { handleComponent: null }
					: {
							handleIndicatorStyle: {
								backgroundColor: "#E7E7E7",
								width: 36,
								height: 5,
								borderRadius: 3,
							},
						})}
			>
				<BottomSheetView style={{ padding: 16, gap: 12 }}>
					{bottomSheetContent}
				</BottomSheetView>
			</BottomSheetModal>
		);
	},
);
