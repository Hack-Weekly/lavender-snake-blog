import Image from "next/image"
import { BsFillArrowRightCircleFill } from "react-icons/bs"
import { BiTimeFive } from "react-icons/bi"
import fs from "fs"
import Markdown from "markdown-to-jsx"
import Link from "next/link"
import { PostMetadata } from "./PostMetadata"

interface postCardProps {
	cardData: PostMetadata
}

const getPostContent = (slug: string) => {
	const folder = "posts/"
	const file = `${folder}${slug}.md`
	const content = fs.readFileSync(file, "utf8")
}

export default function PostCard(postCardProps: postCardProps) {
	const content = getPostContent(postCardProps.cardData.slug)

	return (
		<Link
			href={`/${postCardProps.cardData.slug}`}
			className="flex cursor-pointer flex-row items-center rounded-lg bg-card-bg p-2 drop-shadow-sm hover:bg-secondary-bg hover:drop-shadow-lg dark:bg-[#1E293B] dark:hover:bg-[#293548] dark:hover:drop-shadow-2xl md:p-4"
		>
			<Image
				className="block h-28 min-w-1/3 max-w-1/3 rounded-md md:h-28 lg:h-32 xl:h-36"
				src={postCardProps.cardData.imageSrc}
				alt="Post Image"
				width={384}
				height={240}
			/>
			<div className="ml-2 flex w-full flex-col justify-center xs:ml-4">
				<div className="text-xs text-primary-600 dark:text-primary-100">
					{postCardProps.cardData.tags.join(", ").toUpperCase()}
				</div>
				<div className="mb-2 line-clamp-2 text-base font-bold text-title dark:text-title-dark md:leading-5 lg:text-lg lg:leading-6">
					{postCardProps.cardData.title}
				</div>
				<div className="hidden text-justify text-sm dark:text-[#bdbddd] xs:line-clamp-1 md:hidden lg:line-clamp-2">
					{postCardProps.cardData.excerpt}
				</div>
				<div className="flex flex-row justify-between text-xs xs:mt-2 md:mt-0 lg:mt-2">
					<div className="flex items-center gap-2 font-semibold">
						READ MORE <BsFillArrowRightCircleFill />
					</div>
					<div className="flex items-center gap-1 font-semibold text-primary-600 dark:text-primary-100">
						<BiTimeFive /> <span>{postCardProps.cardData.date}</span>
					</div>
				</div>
			</div>
		</Link>
	)
}
