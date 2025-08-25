export interface IUserPostsResponse {
    posts: IPost[];
    pagination: IPagination;
}

export interface IPost {
    id: number;
    user_post: IUserPost;
    music: IMusic;
    description: string;
    photo: string;
    location: string;
    created_at: string;
    stats: IStats;
}

export interface IUserPost {
    id: number;
    username: string;
    profile_picture: string;
}

export interface IMusic {
    title: string;
    artist: string;
    music_cover: string;
    release_date: string;
    preview_url: string;
    streaming_links: Record<string, string>; // dynamic key (spotify, apple_music, deezer, etc.)
}

export interface IStats {
    likes: number;
    comments: number;
}

export interface IPagination {
    page: number;
    limit: number;
    has_next: boolean;
    last_post_id: number;
}
