// apps/client/mocks/user-posts.mocks.ts
import type { IPost, IUserPostsResponse } from "@/types/post/post.types";

const MOCK_POSTS: IPost[] = [
	{
		id: 1,
		user: {
			id: 10,
			username: "lofi_artist",
			profilePicture:
				"https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
		},
		caption: "Vibes du soir 🌙",
		photoUrl:
			"https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg",
		track: {
			id: 101,
			title: "Midnight Breeze",
			coverUrl:
				"https://images.pexels.com/photos/164745/pexels-photo-164745.jpeg",
			metadata: {
				duration: 180,
				genre: "lofi",
			},
			artist: {
				id: 201,
				name: "Chill Master",
			},
		},
		location: "Paris, France",
		created_at: "2025-11-22T20:15:00.000Z",
		stats: {
			likes: 128,
			comments: 12,
		},
	},
	{
		id: 2,
		user: {
			id: 11,
			username: "house_lover",
			profilePicture:
				"https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
		},
		caption: "Petit drop maison 🧡",
		photoUrl:
			"https://images.pexels.com/photos/167404/pexels-photo-167404.jpeg",
		track: {
			id: 102,
			title: "Sunset Groove",
			coverUrl:
				"https://images.pexels.com/photos/164716/pexels-photo-164716.jpeg",
			metadata: {
				duration: 210,
				genre: "house",
			},
			artist: {
				id: 202,
				name: "DJ Sunset",
			},
		},
		location: "Lyon, France",
		created_at: "2025-11-20T18:42:00.000Z",
		stats: {
			likes: 342,
			comments: 48,
		},
	},
];

const MOCK_LIKED_POSTS: IPost[] = [
	{
		id: 3,
		user: {
			id: 12,
			username: "trap_kid",
			profilePicture:
				"https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg",
		},
		caption: "Boum 💥",
		photoUrl:
			"https://images.pexels.com/photos/164745/pexels-photo-164745.jpeg",
		track: {
			id: 103,
			title: "808 Dreams",
			coverUrl:
				"https://images.pexels.com/photos/1049622/pexels-photo-1049622.jpeg",
			metadata: {
				duration: 195,
				genre: "trap",
			},
			artist: {
				id: 203,
				name: "808God",
			},
		},
		location: "Marseille, France",
		created_at: "2025-11-15T21:10:00.000Z",
		stats: {
			likes: 890,
			comments: 102,
		},
	},
];

export const MOCK_USER_POSTS_RESPONSE: IUserPostsResponse = {
	posts: MOCK_POSTS,
	pagination: {
		page: 1,
		limit: 10,
		has_next: false,
		last_post_id: 2,
	},
};

export const MOCK_LIKED_POSTS_RESPONSE: IUserPostsResponse = {
	posts: MOCK_LIKED_POSTS,
	pagination: {
		page: 1,
		limit: 10,
		has_next: false,
		last_post_id: 3,
	},
};
