import Image from "next/image";
import ThemeToggler from "./ThemeToggler";
import Link from "next/link";
import SearchBar from "./SearchBar";
import getPostMetadata from "./getPostMetadata";

export default function Nav() {
	const postMetadata = getPostMetadata();

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
			<div className="flex flex-row items-center gap-1 xs:gap-2 sm:gap-4 md:gap-8 lg:gap-12 relative">
				<SearchBar postMetadatas={postMetadata} />
				<Link href="/team" className="flex text-center text-xs xs:text-sm sm:text-base font-bold">
					<span className="min-[380px]:hidden">TEAM </span>
					<span className="hidden min-[380px]:block">MEET THE TEAM </span>
				</Link>
				<ThemeToggler />
			</div>
		</nav>
	)
}
