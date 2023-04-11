import FilteredPosts from "../../components/FilteredPosts";
import PostCard from "../../components/PostCard";
import getPostMetadata from "../../components/getPostMetadata";
import getAllUniqueTags from "../../components/getAllUniqueTags";
import { BsHourglassSplit } from "react-icons/bs";


export async function generateStaticParams() {
	const tags = getAllUniqueTags();
    return tags.map((tag) => ({
		category: tag
	}));
}

export default function Category({ params }: { params: { category: string } }){
    const postMetadata = getPostMetadata();
    const category = params.category;
    
    function capitalizeFirstLetter(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const allTags = getAllUniqueTags();
    
    
    return (
        <div>
            <h1 className="my-5 text-center text-3xl font-bold dark:text-white">
                {capitalizeFirstLetter(category)} blogs
            </h1>
            {allTags.includes(category) ? 
                <div className="flex flex-col items-center">
                    <FilteredPosts > 
                        {postMetadata.map((post, index) => {
                            if(post.tags.includes(category)){
                                return(
                                    <PostCard key={index} cardData={post} />
                                )
                            }
                        })}
                    </FilteredPosts>
                </div>
            :
                <div className="flex flex-col xs:flex-row items-center justify-center gap-2 mt-20 mx-5 text-lg">
                    <BsHourglassSplit />
                    No blogs on this category, yet
                </div>
            }

        </div>
	)
}