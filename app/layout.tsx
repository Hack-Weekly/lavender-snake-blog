import { Metadata } from "next"
import { Providers } from "./providers"
import { Archivo as Serif } from "next/font/google"
import "./globals.css"

const serif = Serif({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-serif",
})

export const metadata: Metadata = {
	title: {
		default: "Snakebyte",
		template: "%s | Snakebyte",
	},
	description: "A blog by Lavender Snake",
	icons: {
		icon: "/favicon.ico",
		apple: "/apple-touch-icon.png",
		other: [
			{
				rel: "icon",
				sizes: "32x32",
				type: "image/png",
				url: "/favicon-32x32.png",
			},
			{
				rel: "icon",
				sizes: "16x16",
				type: "image/png",
				url: "/favicon-16x16.png",
			},
		],
	},
	manifest: "/site.webmanifest",
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" className={`${serif.variable}`} suppressHydrationWarning>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
