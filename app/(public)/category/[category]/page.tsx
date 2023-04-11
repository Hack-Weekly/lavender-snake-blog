import PostsByTags from "../../components/PostsByTags";
import PostCard from "../../components/PostCard";
import getPostMetadata from "../../components/getPostMetadata";
import getAllUniqueTags from "../../components/getAllUniqueTags";
import { BsHourglassSplit } from "react-icons/bs";

export default function Category({ params }: { params: { category: string } }){
    const postMetadata = getPostMetadata();
    const category = params.category;

    console.log(category);
    
    function capitalizeFirstLetter(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const allTags = getAllUniqueTags();
    
    console.log(allTags.includes(category));
    
    
    return (
        <div>
            <h1 className="my-5 text-center text-3xl font-bold dark:text-white">
                {capitalizeFirstLetter(category)} Blogs
            </h1>
            {allTags.includes(category) ? 
                <div className="flex flex-col items-center">
                    <PostsByTags > 
                        {postMetadata.map((post, index) => {
                            if(post.tags.includes(category)){
                                return(
                                    <PostCard key={index} cardData={post} />
                                )
                            }
                        })}
                    </PostsByTags>
                </div>
            :
                <div className="flex items-center justify-center gap-2 mt-20">
                    <BsHourglassSplit />
                    No blogs on this category, yet
                </div>
            }

        </div>
	)
}