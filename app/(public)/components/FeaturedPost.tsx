import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import fs from "fs";
import matter from "gray-matter";

const inter = Inter({
    subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
});

const getFeaturedPostContent = (slug: string = "the-science-of-geometry") => {
    const folder = "posts/";
    const file = `${folder}${slug}.md`;
    const content = fs.readFileSync(file, "utf8");
	const matterResult = matter(content);
	return matterResult;
}

export default function FeaturedPost() {
	const featuredPostData = getFeaturedPostContent();

	return (
		<Link href="/the-science-of-geometry" className={`flex flex-col sm:flex-row items-center w-[90%] sm:w-[85%] md:w-[85%] lg:w-[75%] xl:w-[70%] mt-10 p-6 lg:p-10 bg-secondary-bg hover:drop-shadow-2xl dark:bg-[#1F2937] dark:hover:bg-[#293548] rounded-lg ${inter.variable} font-inter cursor-pointer`} >
            <Image
                className="h-48 sm:h-60 w-auto sm:w-5/12 mb-4 sm:mb-0 rounded-md"
                src={featuredPostData.data.imageSrc}
                alt="Featured Image"
                width={384}
                height={240}
                priority
            />
            <div className="flex flex-col justify-center w-full ml-8 lg:ml-14 mr-8 sm:mr-4">
                <div className="text-sm text-primary-600 dark:text-primary-100">
					{featuredPostData.data.tags.join(", ").toUpperCase()}
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-title dark:text-title-dark my-2 line-clamp-2">
                    {featuredPostData.data.title}
                </div>
                <div className="text-justify text-sm sm:text-base my-1 sm:my-2 dark:text-[#bdbddd] line-clamp-3">
                    {featuredPostData.data.excerpt}
                </div>
                <div className="flex justify-between mt-3 text-xs sm:text-sm font-semibold">
                    <div className="flex items-center gap-2 p-1 bg-primary-100 rounded-md dark:text-primary-800">
                        READ MORE <BsFillArrowRightCircleFill />
                    </div>
                    <div className="flex items-center gap-1 text-primary-600 dark:text-primary-100">
                        <BiTimeFive /> <span>{featuredPostData.data.date}</span>
                    </div>
                </div>
            </div>
        </Link>
	)
}