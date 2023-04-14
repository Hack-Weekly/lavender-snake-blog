import Image from "next/image"
import Link from "next/link"
import fs from "fs"
import Markdown, { compiler } from "markdown-to-jsx"
import matter from "gray-matter"
import getPostMetadata from "../components/getPostMetadata"
import Tag from "../components/Tag"
import { BsHourglassSplit } from "react-icons/bs"
import { join } from "path"
import removeMd from "remove-markdown"
import { Metadata } from "next"
import Giscus from "./Giscus"

export async function generateMetadata({
	params,
}: {
	params: { slug: string }
}): Promise<Metadata> {
	const post = getPostContent(params.slug)
	return post
		? {
				title: post.data.title,
				description: post.data.excerpt,
				openGraph: {
					title: post.data.title,
					description: post.data.excerpt,
					tags: post.data.tags,
				},
				twitter: {
					title: post.data.title,
					description: post.data.excerpt,
				},
		  }
		: {
				title: "Not found",
				description: "We cannot find this post.",
		  }
}
const getPostContent = (slug: string) => {
	const folder = "posts/"
	const file = join(process.cwd(), `${folder}${slug}.md`)
	if (fs.existsSync(file)) {
		const content = fs.readFileSync(file, "utf8")
		const matterResult = matter(content)
		return matterResult
	} else {
		return null
	}
}

export async function generateStaticParams() {
	const posts = getPostMetadata()
	return posts.map((post) => ({
		slug: post.slug,
	}))
}

export default function BlogPost({ params }: { params: { slug: string } }) {
	const post = getPostContent(params.slug)
	const urlDomain = process.env.domain	
	
	const plainText = removeMd(post ? post.content : "")
	const wpm = 238 // https://wordsrated.com/reading-speed-statistics/
	const words = plainText.trim().split(/\s+/).length
	const readingTime = Math.ceil(words / wpm)
	return post ? (
		<section className="flex flex-col items-center">
			<article className="my-6 flex max-w-xl flex-col items-center space-y-12 text-black dark:text-[#c7cfd9] lg:w-[58%] ">
				<div className="flex gap-1 px-4 text-center text-sm font-light text-neutral-400">
					{post.data.tags.map(
						(tag: string, index: number, elements: string[]) => {
							const isNext = elements[index + 1]
							return (
								<div key={tag}>
									<Tag tag={tag} />
									{isNext ? ", " : ""}
								</div>
							)
						}
					)}
				</div>
				<h1 className="px-4 text-center text-3xl font-bold dark:text-white">
					{post.data.title}
				</h1>
				<div className="px-4">
					<Image
						className="aspect-video rounded-md bg-neutral-200 object-contain dark:bg-neutral-800"
						src={post.data.imageSrc}
						alt="Featured Image"
						width={600}
						height={600}
					/>
				</div>
				<div className="flex w-full flex-col items-center justify-between gap-1 px-4">
					<div className="w-full flex flex-row items-center justify-between">
						<p className="text-left text-sm font-light text-neutral-400">
							{readingTime} {readingTime != 1 ? "minutes" : "minute"} read...
						</p>
						<p className="flex-none text-right text-sm">
							Written by{" "}
							<Link
								href={`/author/${post.data.author}`}
								className="font-bold text-primary-800 dark:text-primary-100"
							>
								{post.data.author}
							</Link>{" "}
							on {post.data.date}
						</p>
					</div>
				</div>

				<Markdown className="prose w-screen min-w-0 max-w-xl px-4 dark:prose-invert prose-img:rounded-md prose-img:bg-neutral-50 dark:prose-img:bg-neutral-400">
					{post.content}
				</Markdown>
				<div className="w-full flex items-center justify-center">
					{/*  eslint-disable-next-line @next/next/no-img-element */}
					<img src={`https://visitor-badge.glitch.me/badge?page_id=${urlDomain}.${params.slug}`} alt="Post visitor count" />
				</div>
				<Giscus />
			</article>
		</section>
	) : (
		<div className="mx-5 flex flex-col items-center justify-center gap-2 text-lg xs:flex-row">
			<BsHourglassSplit />
			We cannot find this post.
		</div>
	)
}
