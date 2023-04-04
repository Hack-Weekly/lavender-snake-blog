import Image from "next/image"
import { BsFillArrowRightCircleFill } from "react-icons/bs"
import { BiTimeFive } from "react-icons/bi"

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
    const tags = postCardProps.postData.tags.map((item) => item.toUpperCase()).join(", ");
    const datetime = new Date(postCardProps.postData.datetime).toLocaleDateString(undefined, {year: 'numeric', month: 'long', day: 'numeric' });
    return (
        <div className="flex flex-row p-2 bg-card-bg rounded-lg drop-shadow-md">
            <Image 
                className="block h-24 min-w-1/3 max-w-1/3"
                src={postCardProps.postData.imgsrc}
                alt="Post Image"
                width={384}
                height={240}
            />
            <div className="flex flex-col justify-center ml-2 xs:ml-4">
                <div className="text-xs text-primary-600 dark:text-primary-100">
                    {tags}
                </div>
                <div className="text-base font-bold text-title line-clamp-2 ">
                    {postCardProps.postData.title}
                </div>
                <div className="text-sm text-justify my-2 hidden">
                    {postCardProps.postData.body}
                </div>
                <div className="flex flex-row-reverse justify-between text-xs">
                    <div className="flex items-center gap-2 font-semibold">
                        READ MORE <BsFillArrowRightCircleFill />
                    </div>
                    <div className="flex items-center gap-1  font-semibold">
                        <BiTimeFive /> <span>{datetime}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}