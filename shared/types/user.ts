export interface UserInfo {
	wake_up_time: string;
	goals: string[];
	interest_tags: string[];
	starter: boolean;
	default_habits: string[]; // Si ce sont des ObjectId sous forme de string
	new_user: boolean;
}

export interface UserData {
	level: number;
	experience_points: number;
	streak_count: number;
}

export interface UserPreferences {
	theme_color: string;
	haptic_touch: boolean;
}

export interface User {
	id: string;
	username: string;
	email: string;
	password?: string;

	user_info: UserInfo;
	user_data: UserData;
	preferences: UserPreferences;

	created_at: Date;
	updated_at: Date;
	last_login?: Date;
}
