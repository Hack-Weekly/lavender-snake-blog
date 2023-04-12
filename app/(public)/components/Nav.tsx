import Image from "next/image"
import ThemeToggler from "./ThemeToggler"
import Link from "next/link"

export default function Nav() {
	return (
		<nav className="flex w-full flex-row items-center justify-between bg-primary-bg px-2 py-0 text-primary dark:bg-[#0B0A1F] dark:text-primary-100 lg:px-8">
			<Link href="/" className="flex flex-row items-center gap-1">
				<Image
					className="aspect-square"
					src="/lavender-snake.png"
					alt="Team Lavender Snake Logo"
					width={64}
					height={64}
					priority
				/>
				<div className="text-lg font-bold xs:text-xl">Snakebyte</div>
			</Link>
			<div className="flex flex-row items-center gap-8 lg:gap-16">
				<Link
					href="/team"
					className="text-center text-xs font-bold xs:text-sm sm:text-base"
				>
					MEET THE TEAM
				</Link>
				<ThemeToggler />
			</div>
		</nav>
	)
}
