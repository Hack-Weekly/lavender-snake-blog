"use client"

import { useState, useEffect, useCallback } from "react"
import { useTheme } from "next-themes"

const giscusConfig = {
	repo: "Hack-Weekly/lavender-snake-blog",
	repositoryId: "R_kgDOJRHVPQ",
	category: "General",
	categoryId: "DIC_kwDOJRHVPc4CVwuf",
	mapping: "pathname",
	reactions: "1",
	metadata: "0",
	theme: "light",
	darkTheme: "transparent_dark",
	inputPosition: "bottom",
	lang: "en",
	themeURL: "", // For custom theme
}

export default function Giscus() {
	const [enableLoadComments, setEnabledLoadComments] = useState(true)
	const { theme, resolvedTheme } = useTheme()
	const commentsTheme =
		giscusConfig.themeURL === ""
			? theme === "dark" || resolvedTheme === "dark"
				? giscusConfig.darkTheme
				: giscusConfig.theme
			: giscusConfig.themeURL

	const COMMENTS_ID = "comments-container"

	const LoadComments = useCallback(() => {
		setEnabledLoadComments(false)

		const {
			repo,
			repositoryId,
			category,
			categoryId,
			mapping,
			reactions,
			metadata,
			inputPosition,
			lang,
		} = giscusConfig

		const script = document.createElement("script")
		script.src = "https://giscus.app/client.js"
		script.setAttribute("data-repo", repo)
		script.setAttribute("data-repo-id", repositoryId)
		script.setAttribute("data-category", category)
		script.setAttribute("data-category-id", categoryId)
		script.setAttribute("data-mapping", mapping)
		script.setAttribute("data-reactions-enabled", reactions)
		script.setAttribute("data-emit-metadata", metadata)
		script.setAttribute("data-input-position", inputPosition)
		script.setAttribute("data-lang", lang)
		script.setAttribute("data-theme", commentsTheme)
		script.setAttribute("crossorigin", "anonymous")
		script.async = true

		const comments = document.getElementById(COMMENTS_ID)
		if (comments) comments.appendChild(script)

		return () => {
			const comments = document.getElementById(COMMENTS_ID)
			if (comments) comments.innerHTML = ""
		}
	}, [commentsTheme])

	// Reload on theme change
	useEffect(() => {
		const iframe = document.querySelector("iframe.giscus-frame")
		if (!iframe) return
		LoadComments()
	}, [LoadComments])

	return (
		<div className="w-full px-4 pb-6 pt-6 text-center lg:px-0">
			{enableLoadComments && (
				<button onClick={LoadComments}>Load Comments</button>
			)}
			<div className="giscus" id={COMMENTS_ID} />
		</div>
	)
}
