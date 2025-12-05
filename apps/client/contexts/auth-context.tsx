"use client";

import { type ReactNode, createContext, useContext, useState } from "react";

type AuthContextType = {
	email: string;
	setEmail: (email: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [email, setEmail] = useState("");

	return (
		<AuthContext.Provider value={{ email, setEmail }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth doit être utilisé dans un AuthProvider");
	}
	return context;
};
