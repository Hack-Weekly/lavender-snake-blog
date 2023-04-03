import Image from "next/image"
import ThemeToggler from "./ThemeToggler"
import Link from "next/link"

export default function Nav() {
	return (
		<nav className="flex w-full flex-row items-center justify-between px-2 py-2 lg:px-8">
			<Link href="/">
				<Image
					className="aspect-square"
					src="/lavender-snake.png"
					alt="Team Lavender Snake Logo"
					width={64}
					height={64}
				/>
			</Link>
			<div className="flex flex-row gap-2 md:gap-8 lg:gap-16">
				<Link href="/team" className="font-bold text-primary">
					MEET THE TEAM
				</Link>
				<Link href="/blog" className="font-bold text-primary">
					BLOG
				</Link>
				<ThemeToggler />
			</div>
		</nav>
	)
}
