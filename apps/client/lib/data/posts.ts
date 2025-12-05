export function initPost() {
	return {
		id: null,
		user: {
			id: null,
			username: "",
			profilePicture: "",
		},
		caption: "",
		track: {
			id: null,
			title: "",
			coverUrl: "",
			artist: {
				id: null,
				name: "",
			},
			length: 0,
			metadata: {
				album: "",
				duration: 0,
				genre: "",
				platform: "",
				platformId: "",
				externalUrl: "",
				isrc: "",
				previewUrl: "",
				release: "",
			},
			createdAt: "",
			updatedAt: "",
		},
		photoUrl: "",
		location: "",
		stats: {
			likes: 0,
			comments: 0,
		},
		createdAt: "",
		updatedAt: "",
	};
}
