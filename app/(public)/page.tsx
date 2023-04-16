import FeaturedPost from "./components/FeaturedPost"
import FilteredPosts from "./components/FilteredPosts"
import PostCard from "./components/PostCard"
import getPostMetadata from "./components/getPostMetadata"
import getAllUniqueTags from "./components/getAllUniqueTags"
import Categories from "./components/Categories"

export default function Home() {
	const allTags = getAllUniqueTags()

	const postMetadata = getPostMetadata()

	return (
		<div className="flex flex-col items-center">
			<FeaturedPost />
			<Categories tags={allTags} />
			<FilteredPosts>
				{postMetadata.map((post, index) => {
					return <PostCard key={index} cardData={post} />
				})}
			</FilteredPosts>
		</div>
	)
}
