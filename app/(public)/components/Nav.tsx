import Image from "next/image"
import ThemeToggler from "./ThemeToggler"
import Link from "next/link"

export default function Nav() {
	return (
		<nav className="flex w-full flex-row items-center justify-between px-2 py-0 lg:px-8 bg-primary-bg dark:bg-[#0B0A1F] text-primary dark:text-primary-100">
			<Link href="/" className="flex flex-row gap-1 items-center">
				<Image
					className="aspect-square"
					src="/lavender-snake.png"
					alt="Team Lavender Snake Logo"
					width={64}
					height={64}
					priority
				/>
				<div className="text-lg xs:text-xl font-bold">Snakebyte</div>
			</Link>
			<div className="flex flex-row items-center gap-1 sm:gap-2 md:gap-8 lg:gap-16">
				<Link href="/team" className="text-center text-xs xs:text-sm sm:text-base font-bold">
					MEET THE TEAM
				</Link>
				<ThemeToggler />
			</div>
		</nav>
	)
}
