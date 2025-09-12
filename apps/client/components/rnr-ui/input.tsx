import { IconSymbol } from "@/components/ui/IconSymbol";
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
			<>
				<View
					className={cn(
						"w-full rounded-2xl bg-input py-1",
						props.error
							? "border border-red-500"
							: "border border-muted-foreground/20",
						label ? "pb-1.5" : "",
						containerClassName,
					)}
				>
					{label ? (
						<Text
							className={"px-3 pt-2 text-base font-bold text-muted-foreground"}
							style={{ fontFamily: "Urbanist-semibold" }}
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
							className={cn(
								"text-primary-foreground flex-1 web:flex h-10 native:h-11 web:w-full px-3 web:py-2 native:text-xl text-base native:leading-[1.25] web:ring-offset-background transition-all duration-300 file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 lg:text-sm",
								props.editable === false && "web:cursor-not-allowed opacity-50",
								label ? "" : "p-2 mx-4",
								className,
							)}
							placeholderTextColor={"#6B7280"}
							selectionColor={"#6B7280"}
							{...props}
						/>
					</View>
				</View>
				{props.error ? (
					<Text className={"text-red-500 mx-2 mt-2"}>{props.errorMessage}</Text>
				) : (
					""
				)}
			</>
		);
	},
);

Input.displayName = "Input";

export { Input };
