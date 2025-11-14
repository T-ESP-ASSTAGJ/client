export const mock_posts = [
	{
		id: 1,
		user_post: {
			id: 501,
			username: "melody_life",
			profile_picture: "https://github.com/shadcn.png",
		},
		music: {
			title: "Midnight Vibes",
			artist: "Luna Waves",
			music_cover:
				"https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop", // casque/cover chill
			release_date: "2009-12-04T00:00:00Z",
			preview_url:
				"https://cdn.pixabay.com/audio/2025/06/09/audio_ce7b7c1612.mp3",
			streaming_links: {
				spotify: "https://open.spotify.com/track/abc123",
				apple_music: "https://music.apple.com/track/xyz456",
			},
		},
		description: "Soirée chill au bord de la Seine ✨",
		photo:
			"https://images.unsplash.com/photo-1757383747743-03d28fe8004a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		location: "Paris, France",
		created_at: "2024-02-10T20:45:00Z",
		stats: { likes: 134, comments: 18 },
	},
	{
		id: 2,
		user_post: {
			id: 502,
			username: "travel_guru",
			profile_picture: "https://github.com/evilrabbit.png",
		},
		music: {
			title: "Wanderlust",
			artist: "Nomad Beats",
			music_cover:
				"https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?q=80&w=1200&auto=format&fit=crop", // cover route/voyage
			release_date: "2023-02-13T00:00:00Z",
			preview_url: null,
			streaming_links: {
				deezer: "https://www.deezer.com/track/def789",
			},
		},
		description: "Vue imprenable depuis les montagnes suisses 🏔️",
		photo:
			"https://images.unsplash.com/photo-1755868679492-a708c7626971?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		location: "Zermatt, Switzerland",
		created_at: "2024-03-22T09:15:00Z",
		stats: { likes: 89, comments: 7 },
	},
	{
		id: 3,
		user_post: {
			id: 503,
			username: "cafe_addict",
			profile_picture: "https://avatars.githubusercontent.com/u/9919?v=4",
		},
		music: {
			title: "Latte Lo-Fi",
			artist: "Bean Tape",
			music_cover:
				"https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop", // pochette douce/bois
			release_date: "2021-06-20T00:00:00Z",
			preview_url: null,
			streaming_links: { spotify: "https://open.spotify.com/track/lofi001" },
		},
		description: "Matin studieux, cappuccino à la main ☕",
		photo:
			"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1600&auto=format&fit=crop",
		location: "Lyon, France",
		created_at: "2024-04-01T08:10:00Z",
		stats: { likes: 52, comments: 5 },
	},
	{
		id: 4,
		user_post: {
			id: 504,
			username: "surf_n_sun",
			profile_picture: "https://avatars.githubusercontent.com/u/583231?v=4",
		},
		music: {
			title: "Ocean Drive",
			artist: "The Tides",
			music_cover:
				"https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop", // vague/bleu
			release_date: "2018-07-12T00:00:00Z",
			preview_url: null,
			streaming_links: {
				apple_music: "https://music.apple.com/track/ocean456",
			},
		},
		description: "Coucher de soleil après une bonne session 🌊",
		photo:
			"https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1600&auto=format&fit=crop",
		location: "Biarritz, France",
		created_at: "2024-05-05T21:02:00Z",
		stats: { likes: 201, comments: 24 },
	},
	{
		id: 5,
		user_post: {
			id: 505,
			username: "cityrunner",
			profile_picture: "https://avatars.githubusercontent.com/u/92890716?v=4",
		},
		music: {
			title: "Neon Pulse",
			artist: "Skyline",
			music_cover:
				"https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?q=80&w=1200&auto=format&fit=crop", // néons/city pop
			release_date: "2020-10-10T00:00:00Z",
			preview_url: null,
			streaming_links: { spotify: "https://open.spotify.com/track/neon789" },
		},
		description: "Run nocturne au bord du fleuve 🏃‍♂️",
		photo:
			"https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1600&auto=format&fit=crop",
		location: "Nantes, France",
		created_at: "2024-06-11T22:20:00Z",
		stats: { likes: 73, comments: 3 },
	},
	{
		id: 6,
		user_post: {
			id: 506,
			username: "artsy_soul",
			profile_picture: "https://avatars.githubusercontent.com/u/139395?v=4",
		},
		music: {
			title: "Gallery Echoes",
			artist: "Ambient Frames",
			music_cover:
				"https://images.unsplash.com/photo-1495567720989-cebdbdd97913?q=80&w=1200&auto=format&fit=crop", // abstrait/galerie
			release_date: "2017-03-14T00:00:00Z",
			preview_url: null,
			streaming_links: { deezer: "https://www.deezer.com/track/gallery001" },
		},
		description: "Expo immersive 🔮",
		photo:
			"https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=1600&auto=format&fit=crop",
		location: "Berlin, Germany",
		created_at: "2024-06-25T18:30:00Z",
		stats: { likes: 61, comments: 9 },
	},
	{
		id: 7,
		user_post: {
			id: 507,
			username: "foodstories",
			profile_picture: "https://avatars.githubusercontent.com/u/6154722?v=4",
		},
		music: {
			title: "Stir Fry Beats",
			artist: "Kitchen Jam",
			music_cover:
				"https://images.unsplash.com/photo-1758005533981-a37616a64a5f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			release_date: "2019-05-02T00:00:00Z",
			preview_url: null,
			streaming_links: { spotify: "https://open.spotify.com/track/kitchen007" },
		},
		description: "Noodles maison (et playlist qui tue) 🍜",
		photo:
			"https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1600&auto=format&fit=crop",
		location: "Marseille, France",
		created_at: "2024-07-03T12:40:00Z",
		stats: { likes: 98, comments: 12 },
	},
	{
		id: 8,
		user_post: {
			id: 508,
			username: "vinylhunter",
			profile_picture: "https://avatars.githubusercontent.com/u/25792?v=4",
		},
		music: {
			title: "Dusty Grooves",
			artist: "Crate Diggers",
			music_cover:
				"https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop", // platine/vinyle
			release_date: "2001-04-17T00:00:00Z",
			preview_url: "https://example.com/preview8.mp3",
			streaming_links: {
				apple_music: "https://music.apple.com/track/dusty888",
			},
		},
		description: "Trouvaille du week-end chez le disquaire 🎶",
		photo:
			"https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=80&w=1600&auto=format&fit=crop",
		location: "Brussels, Belgium",
		created_at: "2024-07-15T16:05:00Z",
		stats: { likes: 210, comments: 31 },
	},
	{
		id: 9,
		user_post: {
			id: 509,
			username: "code_n_sound",
			profile_picture: "https://avatars.githubusercontent.com/u/810438?v=4",
		},
		music: {
			title: "Focus Flow",
			artist: "Dev Beats",
			music_cover:
				"https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop", // synth/tech
			release_date: "2022-09-09T00:00:00Z",
			preview_url: "https://example.com/preview9.mp3",
			streaming_links: { spotify: "https://open.spotify.com/track/focus999" },
		},
		description: "Refacto + lo-fi = ❤️",
		photo:
			"https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop",
		location: "Remote",
		created_at: "2024-08-01T14:22:00Z",
		stats: { likes: 64, comments: 4 },
	},
	{
		id: 10,
		user_post: {
			id: 510,
			username: "streetframes",
			profile_picture: "https://avatars.githubusercontent.com/u/3369400?v=4",
		},
		music: {
			title: "Concrete Rhythms",
			artist: "Metro Loop",
			music_cover:
				"https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1200&auto=format&fit=crop", // urbain/rythme
			release_date: "2016-11-18T00:00:00Z",
			preview_url: "https://example.com/preview10.mp3",
			streaming_links: { deezer: "https://www.deezer.com/track/metro010" },
		},
		description: "Longues expos dans les ruelles ✨",
		photo:
			"https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=80&w=1600&auto=format&fit=crop",
		location: "Lisbon, Portugal",
		created_at: "2024-08-12T23:50:00Z",
		stats: { likes: 112, comments: 15 },
	},
	{
		id: 11,
		user_post: {
			id: 511,
			username: "yogazen",
			profile_picture: "https://avatars.githubusercontent.com/u/36260687?v=4",
		},
		music: {
			title: "Breath & Balance",
			artist: "Calm Collective",
			music_cover:
				"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop", // calme/bleu
			release_date: "2015-01-15T00:00:00Z",
			preview_url: "https://example.com/preview11.mp3",
			streaming_links: { spotify: "https://open.spotify.com/track/calm011" },
		},
		description: "Sunrise flow sur la plage 🧘‍♀️",
		photo:
			"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
		location: "Bali, Indonesia",
		created_at: "2024-09-02T06:10:00Z",
		stats: { likes: 175, comments: 22 },
	},
	{
		id: 12,
		user_post: {
			id: 512,
			username: "nightmarket",
			profile_picture: "https://avatars.githubusercontent.com/u/6128107?v=4",
		},
		music: {
			title: "Lantern Lights",
			artist: "Sakura Sound",
			music_cover:
				"https://images.unsplash.com/photo-1693517775958-5fb0ed6bcf0b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			release_date: "2023-12-01T00:00:00Z",
			preview_url: "https://example.com/preview12.mp3",
			streaming_links: {
				spotify: "https://open.spotify.com/track/lantern012",
				apple_music: "https://music.apple.com/track/lantern012",
			},
		},
		description: "Night market vibes 🍜🎏",
		photo:
			"https://images.unsplash.com/photo-1498654200943-1088dd4438ae?q=80&w=1600&auto=format&fit=crop",
		location: "Tokyo, Japan",
		created_at: "2024-09-10T19:25:00Z",
		stats: { likes: 246, comments: 33 },
	},
];

export const mock_pagination = {
	page: 1,
	limit: 20,
	has_next: true,
	last_post_id: 212,
};
