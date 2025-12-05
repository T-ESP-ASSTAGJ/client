const { hairlineWidth } = require("nativewind/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			colors: {
				border: "#4D4B6C",
				input: "#232323",
				inputBorder: "#373546",
				ring: "hsl(var(--ring))",
				background: "#030303",
				/*foreground: 'hsl(var(--foreground))',*/
				foreground: {
					DEFAULT: "#2A2A2A",
				},
				/*primary: {
                    DEFAULT: '#8985E9',
                    foreground: '#8985E9',
                },*/
				primary: {
					DEFAULT: "#0C0C0C",
					foreground: "#FFF",
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
					DEFAULT: "#7a7c83",
					foreground: "#D1D5DB",
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
