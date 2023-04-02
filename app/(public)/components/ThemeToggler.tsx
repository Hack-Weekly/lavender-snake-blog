"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import Sun from "@/components/icons/Sun"
import Moon from "@/components/icons/Moon"

export default function ThemeToggler() {
	const [mounted, setMounted] = useState(false)
	const { theme, setTheme } = useTheme()

	useEffect(() => setMounted(true), [])

	if (!mounted) return null

	return (
		<div>
			<button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
				{theme === "light" ? <Moon /> : <Sun />}
			</button>
		</div>
	)
}
