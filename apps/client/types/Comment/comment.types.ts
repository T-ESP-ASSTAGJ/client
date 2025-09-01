export interface IAuthor {
	id: number;
	username: string;
	profile_picture: string;
}

export interface IComment {
	id: number;
	author: IAuthor;
	content: string;
	created_at: string;
}

export interface ICommentResponse {
	comments: IComment[];
	total_comments: number;
}
