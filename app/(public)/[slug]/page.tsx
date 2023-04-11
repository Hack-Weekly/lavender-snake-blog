import Image from "next/image"
import Link from "next/link"
import fs from "fs"
import Markdown from "markdown-to-jsx"
import matter from "gray-matter"
import getPostMetadata from "../components/getPostMetadata"
import Tag from "../components/Tag"
import { BsHourglassSplit } from "react-icons/bs"
import { join } from "path"

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
	return post ? (
		<section className="flex w-full flex-col items-center p-4">
			<article className="my-6 flex max-w-xl flex-col items-center space-y-12 text-black dark:text-[#c7cfd9] lg:w-[58%] ">
				<div className="flex gap-1 text-center text-sm font-light text-neutral-400">
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
				<h1 className="text-center text-3xl font-bold dark:text-white">
					{post.data.title}
				</h1>
				<Image
					className="aspect-video rounded-md"
					src={post.data.imageSrc}
					alt="Featured Image"
					width={600}
					height={600}
				/>
				<div className="flex flex-row-reverse gap-2 self-end">
					<p className="flex-none text-right text-sm">
						Written by{" "}
						<Link
							href={`/author/${post.data.author}`}
							className="font-bold text-primary"
						>
							{post.data.author}
						</Link>{" "}
						on {post.data.date}
					</p>
				</div>

				<Markdown className="prose max-w-none dark:prose-invert">
					{post.content}
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
