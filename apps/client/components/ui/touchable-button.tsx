import TouchableBounce from "@/components/ui/TouchableBounce";
import { Loader } from "@/components/ui/loader/loader";
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
	"relative w-full self-start native:h-[4.5rem] rounded-full transition-all duration-300 flex-row items-center justify-center",
	{
		variants: {
			variant: {
				primary: "bg-white",
				secondary: "bg-primary/10",
				icon: "bg-white !size-14 px-0",
				transparent: "bg-transparent",
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
}

export const TouchableButton = forwardRef<any, TouchableButtonProps>(
	(
		{
			sensory = "light",
			variant = "primary",
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
					className={cn(buttonVariants({ variant, state, block }), className)}
				>
					{isLoading ? (
						<ActivityIndicator />
					) : variant === "icon" ? (
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
											"text-[16.5px]",
										)}
										style={{
											fontFamily: "Jakarta",
											fontWeight: "600",
											textAlign: "center",
										}}
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
