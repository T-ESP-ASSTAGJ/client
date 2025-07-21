import { useUserStore } from "@/stores/use-user-store";
import type { ReactNode } from "react";

type LimitedAccessProps = {
	limitReached: boolean;
	children: ReactNode;
	fallback?: ReactNode;
};

export function LimitedAccess({
	limitReached,
	children,
	fallback,
}: LimitedAccessProps) {
	const { user } = useUserStore();

	if (!user && limitReached) {
		return fallback || <></>;
	}

	return <>{children}</>;
}
