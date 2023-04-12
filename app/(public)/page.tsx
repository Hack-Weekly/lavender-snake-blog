import FeaturedPost from "./components/FeaturedPost"
import FilteredPosts from "./components/FilteredPosts"
import PostCard from "./components/PostCard"
import getPostMetadata from "./components/getPostMetadata"
import getAllUniqueTags from "./components/getAllUniqueTags"
import Link from "next/link"

export default function Home() {
	const allTags = getAllUniqueTags()

	const postMetadata = getPostMetadata()
	// console.log(postMetadata);

	return (
		<div className="flex flex-col items-center">
			<FeaturedPost />
			<div className="mt-10 flex w-screen items-center gap-4 overflow-hidden px-5">
				<div className="whitespace-nowrap font-medium">CATEGORIES</div>
				<div className="flex items-center gap-3 overflow-auto text-sm text-primary-50/80 scrollbar-none">
					{allTags.map((tag: string) => {
						return (
							<Link
								href={`/category/${tag}`}
								key={tag}
								className="rounded-md px-4 py-1 odd:bg-primary-400 even:bg-secondary-400 hover:text-primary-300"
							>
								{tag.toUpperCase()}
							</Link>
						)
					})}
				</div>
			</div>
			<FilteredPosts>
				{postMetadata.map((post, index) => {
					return <PostCard key={index} cardData={post} />
				})}
			</FilteredPosts>
		</div>
	)
}
