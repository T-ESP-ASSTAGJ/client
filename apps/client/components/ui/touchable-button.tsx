import TouchableBounce from "@/components/ui/TouchableBounce";
import { Loader } from "@/components/ui/loader/loader";
import { fontFamily } from "@/dimensions/font-family";
import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import React, { forwardRef, type ReactNode } from "react";
import {
	type AccessibilityState,
	ActivityIndicator,
	type PressableProps,
	Text,
	View,
} from "react-native";
import type { GestureResponderEvent } from "react-native/Libraries/Types/CoreEventTypes";

const buttonVariants = cva(
	// Shrink-to-content by default; keep row layout and center.
	// Add `relative` to allow centered overlay label.
	"relative self-start rounded-full transition-all duration-300 flex-row items-center justify-center",
	{
		variants: {
			variant: {
				primary: "bg-white",
				secondary: "border border-white/10 bg-primary",
				transparent: "bg-transparent rounded-none",
			},
			size: {
				default: "w-full native:h-[4rem]",
				icon: "size-[4rem]",
			},
			state: {
				default: "opacity-100",
				disabled: "opacity-25",
			},
			block: {
				true: "w-full self-stretch",
			},
		},
		defaultVariants: {
			variant: "primary",
			state: "default",
		},
	},
);

export interface TouchableButtonProps
	extends VariantProps<typeof buttonVariants>,
		PressableProps {
	sensory?:
		| boolean
		| "success"
		| "error"
		| "warning"
		| "light"
		| "medium"
		| "heavy";
	content?: string;
	isLoading?: boolean;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	icon?: ReactNode; // for icon variant
	children?: ReactNode; // custom label content
	onPress?: (event: GestureResponderEvent) => void;
	className?: string;
	textClassName?: string;
}

export const TouchableButton = forwardRef<any, TouchableButtonProps>(
	(
		{
			sensory = "light",
			variant = "primary",
			size = "default",
			block,
			isLoading = false,
			disabled: disabledProp,
			className,
			content,
			children,
			leftIcon,
			rightIcon,
			icon,
			onPress,
			role,
			textClassName,
			...rest
		},
		ref,
	) => {
		const disabled = !!disabledProp || isLoading;
		const state: VariantProps<typeof buttonVariants>["state"] = disabled
			? "disabled"
			: "default";

		const accessibilityState: AccessibilityState = {
			disabled,
			busy: isLoading ? true : undefined,
		};

		return (
			<TouchableBounce
				sensory={sensory}
				onPress={onPress as any}
				disabled={disabled}
				role={role ?? ("button" as any)}
				accessibilityRole={(role as any) ?? ("button" as any)}
				accessibilityState={accessibilityState}
			>
				<View
					className={cn(
						buttonVariants({ variant, state, size, block }),
						className,
					)}
				>
					{isLoading ? (
						<View className={"w-full flex justify-center items-center"}>
							<ActivityIndicator />
						</View>
					) : size === "icon" ? (
						icon
					) : (
						<View className="w-full flex flex-row items-center">
							{/* Left slot (or ghost of right icon to preserve center) */}
							<View className="ml-6 items-center justify-center">
								{leftIcon ??
									(rightIcon ? (
										<View style={{ opacity: 0 }}>{rightIcon}</View>
									) : null)}
							</View>

							{/* Center label */}
							<View className="flex-1 items-center justify-center">
								{children ?? (
									<Text
										className={cn(
											variant === "primary" ? "text-primary" : "text-white",
											"text-xl",
											textClassName,
										)}
										style={{ fontFamily: fontFamily.semibold }}
									>
										{content}
									</Text>
								)}
							</View>

							{/* Right slot (or ghost of left icon to preserve center) */}
							<View className="mr-6 flex flex-row items-center justify-center">
								{rightIcon ??
									(leftIcon ? (
										<View style={{ opacity: 0 }}>{leftIcon}</View>
									) : null)}
							</View>
						</View>
					)}
				</View>
			</TouchableBounce>
		);
	},
);

TouchableButton.displayName = "TouchableButton";
