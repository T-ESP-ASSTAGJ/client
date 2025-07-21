import { IconSymbol, type IconSymbolName } from "@/components/ui/IconSymbol";
import type {
	BottomTabBarButtonProps,
	BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";
// Better transitions on web, no changes on native.
import { PlatformPressable } from "@react-navigation/elements";
import * as Haptics from "expo-haptics";
import { Tabs as NativeTabs } from "expo-router";
import React from "react";
import BlurTabBarBackground from "./TabBarBackground";

// These are the default tab options for iOS, they disable on other platforms.
const DEFAULT_TABS: BottomTabNavigationOptions =
	process.env.EXPO_OS !== "ios"
		? {
				headerShown: false,
			}
		: {
				headerShown: false,
				tabBarButton: HapticTab,
				tabBarActiveTintColor: "#E7E7E7",
				tabBarStyle: {
					// Use a transparent background on iOS to show the blur effect
					position: "absolute",
					backgroundColor: "#090909",
					height: 100,
					paddingTop: 18,
				},
			};

export default function Tabs({
	screenOptions,
	children,
	...props
}: React.ComponentProps<typeof NativeTabs>) {
	const processedChildren = React.Children.map(children, (child) => {
		if (React.isValidElement(child)) {
			const { systemImage, title, ...props } = child.props;
			if (systemImage || title != null) {
				return React.cloneElement(child, {
					...props,
					options: {
						tabBarIcon: !systemImage
							? undefined
							: (props: any) => <IconSymbol {...props} name={systemImage} />,
						title,
						...props.options,
					},
				});
			}
		}
		return child;
	});

	return (
		<NativeTabs
			screenOptions={{
				...DEFAULT_TABS,
				...screenOptions,
			}}
			{...props}
			children={processedChildren}
		/>
	);
}

Tabs.Screen = NativeTabs.Screen as React.FC<
	React.ComponentProps<typeof NativeTabs.Screen> & {
		/** Add a system image for the tab icon. */
		systemImage?: IconSymbolName;
		/** Set the title of the icon. */
		title?: string;
	}
>;

function HapticTab(props: BottomTabBarButtonProps) {
	return (
		<PlatformPressable
			{...props}
			onPressIn={(ev) => {
				if (process.env.EXPO_OS === "ios") {
					// Add a soft haptic feedback when pressing down on the tabs.
					Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
				}
				props.onPressIn?.(ev);
			}}
		/>
	);
}
