import ThemeToggler from "./ThemeToggler"

export default function Nav() {
	return (
		<nav className="flex flex-row justify-between px-5 py-2">
			<div className="text-3xl font-bold text-purple-950 dark:text-purple-300">
				Lavender Snake Blog
			</div>
			<ThemeToggler />
			<div className="text-2xl text-purple-500">Meet The Team</div>
		</nav>
	)
}
