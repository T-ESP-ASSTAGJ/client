export interface ICurrentUser {
	id: number;
	email: string;
	roles: string[];
	isVerified: boolean;
	needsProfile: boolean;
	createdAt: string;
	updatedAt: string;
	userIdentifier: string;
	followed: IUser[];
	follower: IUser[];
}

interface IUser {
	id: number;
	username: string;
}
