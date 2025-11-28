interface IUserPostsResponse {
	posts: IPost[];
	pagination: IPagination;
}

interface IPost {
	id: number;
	user_post: IUserPost;
	music: IMusic;
	description: string;
	photo: string;
	location: string;
	created_at: string;
	stats: IStats;
}

interface IUserPost {
	id: number;
	username: string;
	profile_picture: string;
}

interface IMusic {
	title: string;
	artist: string;
	music_cover: string;
	release_date: string;
	preview_url: string | null;
	streaming_links: Record<string, string>; // dynamic key (spotify, apple_music, deezer, etc.)
}

interface IStats {
	likes: number;
	comments: number;
}

interface IPagination {
	page: number;
	limit: number;
	has_next: boolean;
	last_post_id: number;
}

export type {
	IUserPostsResponse,
	IPost,
	IUserPost,
	IMusic,
	IStats,
	IPagination,
};
