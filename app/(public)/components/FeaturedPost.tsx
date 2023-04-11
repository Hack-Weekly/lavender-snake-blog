import { Inter } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { BsFillArrowRightCircleFill } from "react-icons/bs"
import { BiTimeFive } from "react-icons/bi"
import fs from "fs"
import matter from "gray-matter"

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
})

const getFeaturedPostContent = (slug: string = "the-science-of-geometry") => {
	const folder = "posts/"
	const file = `${folder}${slug}.md`
	const content = fs.readFileSync(file, "utf8")
	const matterResult = matter(content)
	return matterResult
}

export default function FeaturedPost() {
	const featuredPostData = getFeaturedPostContent()

	return (
		<Link
			href="/the-science-of-geometry"
			className={`mt-10 flex w-[90%] flex-col items-center rounded-lg bg-secondary-bg p-6 hover:drop-shadow-2xl dark:bg-[#1F2937] dark:hover:bg-[#293548] sm:w-[85%] sm:flex-row md:w-[85%] lg:w-[75%] lg:p-10 xl:w-[70%] ${inter.variable} font-inter cursor-pointer`}
		>
			<Image
				className="mb-4 h-48 w-auto rounded-md sm:mb-0 sm:h-60 sm:w-5/12"
				src={featuredPostData.data.imageSrc}
				alt="Featured Image"
				width={384}
				height={240}
				priority
			/>
			<div className="ml-8 mr-8 flex w-full flex-col justify-center sm:mr-4 lg:ml-14">
				<div className="text-sm text-primary-600 dark:text-primary-100">
					{featuredPostData.data.tags.join(", ").toUpperCase()}
				</div>
				<div className="my-2 line-clamp-2 text-2xl font-bold text-title dark:text-title-dark sm:text-3xl">
					{featuredPostData.data.title}
				</div>
				<div className="my-1 line-clamp-3 text-justify text-sm dark:text-[#bdbddd] sm:my-2 sm:text-base">
					{featuredPostData.data.excerpt}
				</div>
				<div className="mt-3 flex justify-between text-xs font-semibold sm:text-sm">
					<div className="flex items-center gap-2 rounded-md bg-primary-100 px-4 py-1 dark:text-primary-800">
						READ MORE <BsFillArrowRightCircleFill />
					</div>
					<div className="flex items-center gap-1 text-primary-600 dark:text-primary-100">
						<BiTimeFive /> <span>{featuredPostData.data.date}</span>
					</div>
				</div>
			</div>
		</Link>
	)
}
