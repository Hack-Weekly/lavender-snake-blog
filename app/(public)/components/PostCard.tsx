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
        <div className="flex flex-row items-center p-2 md:p-4 bg-card-bg hover:bg-secondary-bg dark:bg-[#1E293B] dark:hover:bg-[#293548] rounded-lg cursor-pointer drop-shadow-sm hover:drop-shadow-lg dark:hover:drop-shadow-2xl">
            <Image 
                className="block h-28 min-w-1/3 max-w-1/3 md:h-28 lg:h-32 xl:h-36 rounded-md"
                src={postCardProps.postData.imgsrc}
                alt="Post Image"
                width={384}
                height={240}
            />
            <div className="w-full flex flex-col justify-center ml-2 xs:ml-4">
                <div className="text-xs text-primary-600 dark:text-primary-100">
                    {tags}
                </div>
                <div className="mb-2 text-base lg:text-lg md:leading-5 lg:leading-6 font-bold text-title dark:text-title-dark line-clamp-2">
                    {postCardProps.postData.title}
                </div>
                <div className="text-sm text-justify dark:text-[#bdbddd] hidden xs:line-clamp-1 md:hidden lg:line-clamp-1 xl:line-clamp-2">
                    {postCardProps.postData.body}
                </div>
                <div className="flex flex-row justify-between text-xs xs:mt-2 md:mt-0 lg:mt-2">
                    <div className="flex items-center gap-2 font-semibold">
                        READ MORE <BsFillArrowRightCircleFill />
                    </div>
                    <div className="flex items-center gap-1 font-semibold text-primary-600 dark:text-primary-100">
                        <BiTimeFive /> <span>{datetime}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}