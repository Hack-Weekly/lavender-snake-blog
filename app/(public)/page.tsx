import FeaturedPost from "./components/FeaturedPost"
import PostsByTags from "./components/PostsByTags"


export default function Home() {
	return (
		<div className="flex flex-col items-center">
			<FeaturedPost />
			<PostsByTags />
		</div>
	)
}
