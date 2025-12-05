export interface IUser {
	id: number;
	username: string;
	email: string;
	roles: string[];
	phoneNumber: string;
	profilePicture: string;
	bio: string;
	isVerified: false;
	needsProfile: true;
	createdAt: Date;
	updatedAt: Date;
	followed: {
		id: string;
		username: string;
		profilePicture: string;
	}[];
	follower: {
		id: string;
		username: string;
		profilePicture: string;
	}[];
}
