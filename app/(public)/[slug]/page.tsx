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

const getPostContent = (slug: string) => {
	const folder = "posts/"
	const file = join(process.cwd(), `${folder}${slug}.md`)
	if (fs.existsSync(file)) {
		const content = fs.readFileSync(file, "utf8")
		const date = fs.statSync(file).birthtime
		const matterResult = matter(content)
		return { content: matterResult, date: date }
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
	const plainText = removeMd(post ? post.content.content : "")
	const wpm = 265 // medium's wpm
	const words = plainText.trim().split(/\s+/).length
	const readingTime = Math.ceil(words / wpm)
	return post ? (
		<section className="flex w-full flex-col items-center p-4">
			<article className="my-6 flex max-w-xl flex-col items-center space-y-12 text-black dark:text-[#c7cfd9] lg:w-[58%] ">
				<div className="flex gap-1 text-center text-sm font-light text-neutral-400">
					{post.content.data.tags.map(
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
				<h1 className="text-center text-3xl font-bold dark:text-white">
					{post.content.data.title}
				</h1>
				<Image
					className="aspect-video rounded-md"
					src={post.content.data.imageSrc}
					alt="Featured Image"
					width={600}
					height={600}
				/>
				<div className="flex w-full flex-row items-center justify-between gap-2">
					<p className="text-left text-sm font-light text-neutral-400">
						{readingTime} {readingTime != 1 ? "minutes" : "minute"} read...
					</p>
					<p className="flex-none text-right text-sm">
						Written by{" "}
						<Link
							href={`/author/${post.content.data.author}`}
							className="font-bold text-primary"
						>
							{post.content.data.author}
						</Link>{" "}
						on{" "}
						{post.date.toLocaleDateString("en-GB", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</p>
				</div>

				<Markdown className="prose max-w-none dark:prose-invert">
					{post.content.content}
				</Markdown>
			</article>
		</section>
	) : (
		<div className="mx-5 mt-20 flex flex-col items-center justify-center gap-2 text-lg xs:flex-row">
			<BsHourglassSplit />
			We cannot find this post.
		</div>
	)
}
