import Link from "next/link"

export default function Footer() {
	return (
		<footer className="flex h-24 w-full flex-col items-center justify-evenly bg-primary-bg text-center text-sm text-black dark:bg-[#0F172A] dark:text-primary-100 sm:text-base">
			<div className="flex w-fit justify-evenly gap-7 text-primary dark:text-primary-200 md:gap-9">
				<Link href="/team">Meet the Team</Link>
				<Link
					href="https://github.com/Hack-Weekly/lavender-snake-blog"
					rel="nofollow noopener noreferrer"
					target="_blank"
				>
					Github
				</Link>
			</div>
			<p>
				Created by{" "}
				<Link
					href="https://github.com/orgs/Hack-Weekly/teams/lavender-snake"
					rel="nofollow noopener noreferrer"
					target="_blank"
					className="font-bold text-primary dark:text-primary-200"
				>
					Lavender Snake
				</Link>{" "}
				during HackWeekly’s “12-day project”.
			</p>
		</footer>
	)
}
