"use client";
import Link from "next/link"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"

interface CategoriesProps{
    tags: string[];
}

export default function Categories(categoriesProps: CategoriesProps){

    
	const scrollLeft = () => {
		document.getElementById("categories")?.scrollBy(-200,0);
	}

    const scrollRight = () => {
        document.getElementById("categories")?.scrollBy(200,0);
    }

    return (
        <div className="mt-10 flex w-full items-center gap-4 px-5">
            <div className="hidden whitespace-nowrap font-medium sm:block">
                CATEGORIES
            </div>
            <div className="flex items-center gap-1 overflow-hidden">
                <div 
                    className="hover:bg-primary-200 dark:hover:bg-primary-400 p-1 cursor-pointer rounded-full text-lg dark:text-primary-100 dark:hover:text-white" 
                    onClick={scrollLeft}
                >
                    <IoIosArrowBack />
                </div>
                <div className="flex-[0 0 100%] flex flex-nowrap items-center gap-3 overflow-auto text-sm text-primary-50/80 scrollbar-none scroll-smooth" id="categories">
                    {categoriesProps.tags.map((tag: string) => {
                        return (
                            <Link
                                href={`/category/${tag}`}
                                key={tag}
                                className="rounded-md px-4 py-1 odd:bg-primary-500 odd:hover:bg-primary-600 even:bg-secondary-500 even:hover:bg-secondary-600 text-primary-50"
                            >
                                <div>
                                    {tag.toUpperCase()}
                                </div>
                            </Link>
                        )
                    })}
                </div>
                <div 
                    className="hover:bg-primary-200 dark:hover:bg-primary-400 p-1 cursor-pointer rounded-full text-lg dark:text-primary-100 dark:hover:text-white"
                    onClick={scrollRight}
                >
                    <IoIosArrowForward />
                </div>
            </div>
        </div>
    )
}