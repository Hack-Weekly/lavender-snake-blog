import Link from "next/link"

export default function Footer() {
	return (
		<footer className="flex h-28 w-fit flex-col items-center justify-evenly text-center text-sm">
			<div className="flex w-full justify-evenly text-primary">
				<Link href="/blog">Blog</Link>
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
				<span className="font-bold text-primary">Lavender Snake</span> during
				HackWeekly’s “12-day project”.
			</p>
		</footer>
	)
}
