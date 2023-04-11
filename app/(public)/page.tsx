import FeaturedPost from "./components/FeaturedPost"
import PostsByTags from "./components/PostsByTags"
import PostCard from "./components/PostCard"
import getPostMetadata from "./components/getPostMetadata";

export default function Home() {
	const postMetadata = getPostMetadata();
	return (
		<div className="flex flex-col items-center">
			<FeaturedPost />
			<PostsByTags > 
				{postMetadata.map((post, index) => {
					return(
						<PostCard key={index} cardData={post} />
					)
				})}
			</PostsByTags>
		</div>
	)
}
