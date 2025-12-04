import { IconSymbol } from "@/components/ui/IconSymbol";
import { fontFamily } from "@/dimensions/font-family";
import { cn } from "@/lib/utils";
import type { SFSymbol } from "expo-symbols";
import * as React from "react";
import { Text, TextInput, type TextInputProps, View } from "react-native";

interface InputProps extends TextInputProps {
	label?: string;
	containerClassName?: string;
	error?: boolean;
	errorMessage?: string;
	iconLeft?: SFSymbol;
	iconLeftColor?: string;
}

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
	(
		{ className, containerClassName, placeholderClassName, label, ...props },
		ref,
	) => {
		return (
			<View className={"h-fit w-full"}>
				<View
					className={cn(
						"w-full rounded-2xl bg-input py-px",
						props.error
							? "border border-red-500"
							: "border border-muted-foreground/20",
						containerClassName,
					)}
				>
					{label ? (
						<Text
							className={cn(
								"px-3 pt-1.5 text-base font-bold text-muted-foreground",
								label ? "max-h-10 opacity-100" : "max-h-0 opacity-0",
							)}
							style={{ fontFamily: fontFamily.semibold }}
						>
							{label}
						</Text>
					) : null}
					<View
						className={cn(
							"flex flex-row items-center gap-x-2",
							props.iconLeft ? "mx-4" : "",
						)}
					>
						{props.iconLeft ? (
							<IconSymbol
								name={props.iconLeft}
								color={props.iconLeftColor ?? ""}
							/>
						) : null}

						<TextInput
							ref={ref}
							style={{ fontFamily: fontFamily.medium }}
							className={cn(
								"text-primary-foreground flex-1 web:flex h-12 px-3 web:w-full native:text-lg native:leading-[1.25] transition-all duration-300 file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2",
								props.editable === false && "web:cursor-not-allowed opacity-50",
								className,
							)}
							placeholderTextColor={"#6B7280"}
							selectionColor={"#6B7280"}
							{...props}
						/>
					</View>
				</View>
				{props.error && (
					<Text className={"text-red-500 mx-2 mt-2"}>{props.errorMessage}</Text>
				)}
			</View>
		);
	},
);

Input.displayName = "Input";

export { Input };
