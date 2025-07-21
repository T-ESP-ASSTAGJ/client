import { cn } from "@/lib/utils";
import * as React from "react";
import { Text, TextInput, type TextInputProps, View } from "react-native";

// Étendre l'interface TextInputProps pour inclure notre prop label
interface InputProps extends TextInputProps {
	label?: string;
	placeholderClassName?: string;
}

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
	({ className, placeholderClassName, label, ...props }, ref) => {
		return label ? (
			<View
				className={
					"w-full rounded-2xl border border-[#FAFAFA] bg-[#FAFAFA] pb-2"
				}
			>
				<Text
					className={"px-3 pt-2 text-base text-foreground/45"}
					style={{ fontFamily: "Urbanist-semibold" }}
				>
					{label}
				</Text>

				<TextInput
					ref={ref}
					className={cn(
						"web:flex h-10 native:h-11 web:w-full px-3 web:py-2 native:text-xl text-base text-foreground native:leading-[1.25] web:ring-offset-background transition-all duration-300 file:border-0 file:bg-transparent file:font-medium focus:border-primary/70 web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 lg:text-sm",
						props.editable === false && "web:cursor-not-allowed opacity-50",
						className,
					)}
					{...props}
					selectionColor={"#6C5F54"}
				/>
			</View>
		) : (
			<TextInput
				ref={ref}
				className={cn(
					"web:flex h-10 native:h-11 web:w-full rounded-lg border border-[#FAFAFA] bg-[#FAFAFA] px-3 web:py-2 native:text-xl text-base text-foreground native:leading-[1.25] web:ring-offset-background transition-all duration-300 file:border-0 file:bg-transparent file:font-medium placeholder:text-[#A5A5A5]/50 focus:border-primary/70 web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 lg:text-sm",
					props.editable === false && "web:cursor-not-allowed opacity-50",
					className,
				)}
				{...props}
			/>
		);
	},
);

Input.displayName = "Input";

export { Input };
