import FeaturedPost from "./components/FeaturedPost"
import FilteredPosts from "./components/FilteredPosts"
import PostCard from "./components/PostCard"
import getPostMetadata from "./components/getPostMetadata";
import getAllUniqueTags from "./components/getAllUniqueTags";
import Link from "next/link";

export default function Home() {
	const allTags = getAllUniqueTags();

	const postMetadata = getPostMetadata();
	// console.log(postMetadata);
	
	return (
		<div className="flex flex-col items-center">
			<FeaturedPost />
			<div className="flex items-center justify-between w-full h-12 mt-4 px-5 border-y-4 border-black bg-[#E9E9D5] dark:bg-[#293548]">
				<div className="hidden sm:flex overflow-hidden">
					<div className="font-medium mr-4">BLOG CATEGORIES</div>
					<div className="flex items-center gap-3 text-sm text-primary-800 dark:text-primary-50/80 overflow-hidden">
						{allTags.map((tag:string) => {
							return (
								<Link href={`/category/${tag}`} key={tag} className="hover:text-primary-300">
									{tag.toUpperCase()}
								</Link>
							)
						})}
					</div>
				</div>
				<div className="sm:hidden font-medium mr-4">BLOG POSTS</div>
			</div>
			<FilteredPosts > 
				{postMetadata.map((post, index) => {
					return(
						<PostCard key={index} cardData={post} />
					)
				})}
			</FilteredPosts>
		</div>
	)
}
