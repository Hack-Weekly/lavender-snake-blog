import FeaturedPost from "./components/FeaturedPost"
import FilteredPosts from "./components/FilteredPosts"
import PostCard from "./components/PostCard"
import getPostMetadata from "./components/getPostMetadata";

export default function Home() {
	const postMetadata = getPostMetadata();
	return (
		<div className="flex flex-col items-center">
			<FeaturedPost />
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
