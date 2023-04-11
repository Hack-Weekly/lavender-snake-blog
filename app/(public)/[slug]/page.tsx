import Image from "next/image";
import Link from "next/link";
// import CommentEditor from "./components/CommentEditor";
import fs from "fs";
import Markdown from "markdown-to-jsx";
import matter from "gray-matter";
import getPostMetadata from "../components/getPostMetadata";

const getPostContent = (slug: string) => {
    const folder = "posts/";
    const file = `${folder}${slug}.md`;
    const content = fs.readFileSync(file, "utf8");
	const matterResult = matter(content);
	return matterResult;
}

export async function generateStaticParams() {
	const posts = getPostMetadata();
	return posts.map((post) => ({
		slug: post.slug,
	}));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
	const post = getPostContent(params.slug);

	console.log(post.data.tags);
	

	return (
		<section className="flex w-full flex-col items-center">
			<article className="flex max-w-4xl flex-col items-center lg:w-[58%] text-black dark:text-[#c7cfd9]">
				<p className="mt-5 mb-3 text-center text-sm font-light text-neutral-400">
					{post.data.tags.join(", ").toUpperCase()}
				</p>
				<h1 className="mb-11 text-center text-3xl font-bold dark:text-white">
					{post.data.title}
				</h1>
				<Image
					className="mb-3.5 aspect-video"
					src={post.data.imageSrc}
					alt="Featured Image"
					width={600}
					height={600}
				/>
				<div className="gap-2. flex flex-row-reverse self-end">
					<p className="flex-none text-right text-sm">
						Written by{" "}
						<Link href="/blog?author=Jude" className="font-bold text-primary">
							{post.data.author}
						</Link>{" "}
						on {post.data.date}
					</p>
				</div>
				
				<Markdown>
					{post.content}
				</Markdown>
			</article>
			<div className="w-full px-4 py-4 lg:px-20 lg:py-12">
				<p className="mb-4 text-2xl font-light text-neutral-700">COMMENTS</p>
				{/* <CommentEditor /> */}
			</div>
		</section>
	)
}
