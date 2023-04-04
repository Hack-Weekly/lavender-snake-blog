interface Post {
	id: string
	title: string
	body: string
	tags: string[]
	author: string
	imgsrc: string
	datetime: number
}
interface PostCardProps {
    postData: Post
}

export default function PostCard(postCardProps: PostCardProps){
    return (
        <div>
            A post
        </div>
    )
}