const { hairlineWidth } = require("nativewind/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "#0C0C0C",
				/*foreground: 'hsl(var(--foreground))',*/
				foreground: {
					DEFAULT: "#473729",
				},
				/*primary: {
                    DEFAULT: '#8985E9',
                    foreground: '#8985E9',
                },*/
				primary: {
					DEFAULT: "#6C5F54",
					foreground: "#6C5F54",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
			borderWidth: {
				hairline: hairlineWidth(),
			},
			fontSize: {
				lg: "16px",
				xl: "18px",
				"3xl": "32px",
				"4xl": "40px",
				"5xl": "48px",
			},
			lineHeight: {
				xl: "24px",
				"3xl": "51px",
			},
			letterSpacing: {
				wide: "0.2px",
				wider: "0.5px",
				widest: "1px",
			},
		},
	},
	plugins: [],
};
