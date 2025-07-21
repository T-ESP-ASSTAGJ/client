import { useUserStore } from "@/stores/use-user-store";
import { Redirect } from "expo-router";
import type { ComponentType } from "react";

export default function withAuth<T>(Component: ComponentType<T>) {
	return function AuthProtected(props: T) {
		const { isAuthenticated } = useUserStore();

		if (!isAuthenticated) {
			return <Redirect href="/(tabs)/home" />;
		}

		return <Component {...props} />;
	};
}
