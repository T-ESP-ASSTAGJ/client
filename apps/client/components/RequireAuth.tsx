import { useUserStore } from "@/stores/use-user-store";
import { Redirect } from "expo-router";
import { type ReactNode, useEffect } from "react";

type RequireAuthProps = {
	children: ReactNode;
	fallback?: ReactNode;
};

export function RequireAuth({ children, fallback }: RequireAuthProps) {
	const { user } = useUserStore();

	if (!user) {
		return fallback || <Redirect href="/(auth)/sign-in" />;
	}

	return <>{children}</>;
}
