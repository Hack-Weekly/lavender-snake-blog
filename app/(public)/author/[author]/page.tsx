import FilteredPosts from "../../components/FilteredPosts"
import PostCard from "../../components/PostCard"
import getPostMetadata from "../../components/getPostMetadata"
import getAllAuthors from "../../components/getAllAuthors"
import { BsHourglassSplit } from "react-icons/bs"
import { Metadata } from "next"

export async function generateMetadata({
	params,
}: {
	params: { author: string }
}): Promise<Metadata> {
	return {
		title: params.author,
		description: `Posts written by ${params.author}.`,
	}
}

export async function generateStaticParams() {
	const authors = getAllAuthors()
	return authors.map((author) => ({
		author: author,
	}))
}

export default function Author({ params }: { params: { author: string } }) {
	const postMetadata = getPostMetadata()
	const author = params.author
	const allAuthors = getAllAuthors()

	return (
		<div>
			<h1 className="font-md my-5 text-center text-3xl dark:text-white">
				All posts written by{" "}
				<span className="font-bold text-primary-200">{author}</span>
			</h1>
			{allAuthors.includes(author) ? (
				<div className="flex flex-col items-center">
					<FilteredPosts>
						{postMetadata.map((post, index) => {
							if (post.author === author) {
								return <PostCard key={index} cardData={post} />
							}
						})}
					</FilteredPosts>
				</div>
			) : (
				<div className="mx-5 mt-20 flex flex-col items-center justify-center gap-2 text-center text-lg xs:flex-row">
					<BsHourglassSplit className="text-3xl md:text-xl" />
					No posts by this author, yet. Are you sure you are searching for the
					right pen?
				</div>
			)}
		</div>
	)
}
