import Image from "next/image"
import { BsFillArrowRightCircleFill } from "react-icons/bs"
import { BiTimeFive } from "react-icons/bi"
import fs from "fs"
import Markdown from "markdown-to-jsx"
import Link from "next/link"
import { PostMetadata } from "./PostMetadata"

interface postCardProps{
    cardData: PostMetadata
}

const getPostContent = (slug: string) => {
    const folder = "posts/";
    const file = `${folder}${slug}.md`;
    const content = fs.readFileSync(file, "utf8");
}

export default function PostCard(postCardProps: postCardProps){
    const content = getPostContent(postCardProps.cardData.slug);
    
    return (
        <Link href={`/${postCardProps.cardData.slug}`} className="flex flex-row items-center p-2 md:p-4 bg-card-bg hover:bg-secondary-bg dark:bg-[#1E293B] dark:hover:bg-[#293548] rounded-lg cursor-pointer drop-shadow-sm hover:drop-shadow-lg dark:hover:drop-shadow-2xl">
            <Image 
                className="block h-28 min-w-1/3 max-w-1/3 md:h-28 lg:h-32 xl:h-36 rounded-md"
                src={postCardProps.cardData.imageSrc}
                alt="Post Image"
                width={384}
                height={240}
            />
            <div className="w-full flex flex-col justify-center ml-2 xs:ml-4">
                <div className="text-xs text-primary-600 dark:text-primary-100">
                    {postCardProps.cardData.tags.join(", ").toUpperCase()}
                </div>
                <div className="mb-2 text-base lg:text-lg md:leading-5 lg:leading-6 font-bold text-title dark:text-title-dark line-clamp-2">
                    {postCardProps.cardData.title}
                </div>
                <div className="text-sm text-justify dark:text-[#bdbddd] hidden xs:line-clamp-1 md:hidden lg:line-clamp-2">
                    {postCardProps.cardData.excerpt}
                </div>
                <div className="flex flex-row justify-between text-xs xs:mt-2 md:mt-0 lg:mt-2">
                    <div className="flex items-center gap-2 font-semibold">
                        READ MORE <BsFillArrowRightCircleFill />
                    </div>
                    <div className="flex items-center gap-1 font-semibold text-primary-600 dark:text-primary-100">
                        <BiTimeFive /> <span>{postCardProps.cardData.date}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}