interface IUserPostsResponse {
	posts: IPost[];
	pagination: IPagination;
}

interface IPostTrack {
	id: number;
	title: string;
	coverUrl: string | null;
	metadata: {
		duration: number;
		genre: string;
	};
	artist: {
		id: number;
		name: string;
	};
}

interface IPost {
	id: number;
	user: IUserPost;
	caption: string;
	photoUrl: string;
	track: IPostTrack;
	location: string;
	created_at: string | null;
	stats: IStats | null;
	stats: IPostStats;
	createdAt: string;
	updatedAt: string;
}

interface IPostStats {
	likes: number;
	comments: number;
}

interface ITrack {
	id: number;
	title: string;
	coverUrl: string;
	metadata: ITrackMetadata;
	artist: IPostArtist;
	length: number;
	createdAt: string;
	updatedAt: string;
}

interface ITrackMetadata {
	album: string;
	duration: number;
	genre: string;
	platform: string;
	platformId: string;
	externalUrl: string;
	isrc: string;
	previewUrl: string;
	release: string;
}

interface IPostArtist {
	id: number;
	name: string;
}

interface IUserPost {
	id: number;
	username: string;
	profilePicture: string;
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
	ITrack,
	IPostTrack,
	IStats,
	IPagination,
};
