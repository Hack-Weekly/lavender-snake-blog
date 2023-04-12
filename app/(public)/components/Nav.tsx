import Image from "next/image"
import ThemeToggler from "./ThemeToggler"
import Link from "next/link"
import SearchBar from "./SearchBar"
import getPostMetadata from "./getPostMetadata"

export default function Nav() {
	const postMetadata = getPostMetadata()

	return (
		<nav className="flex w-full  items-center justify-between bg-primary-bg px-2 py-0 text-primary dark:bg-[#0F172A] dark:text-primary-100 lg:px-8">
			<Link href="/" className="flex  items-center gap-1">
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
			<div className="relative flex items-center gap-4">
				<SearchBar postMetadatas={postMetadata} />
				<Link
					href="/team"
					className="flex text-center text-xs font-bold xs:text-sm sm:text-base"
				>
					<span className="min-[380px]:hidden">TEAM </span>
					<span className="hidden min-[380px]:block">MEET THE TEAM </span>
				</Link>
				<ThemeToggler />
			</div>
		</nav>
	)
}
