import FilteredPosts from "../../components/FilteredPosts";
import PostCard from "../../components/PostCard";
import getPostMetadata from "../../components/getPostMetadata";
import getAllAuthors from "../../components/getAllAuthors";
import { BsHourglassSplit } from "react-icons/bs";


export async function generateStaticParams() {
	const authors = getAllAuthors();
    return authors.map((author) => ({
		author: author
	}));
}

export default function Author({ params }: { params: { author: string } }){
    const postMetadata = getPostMetadata();
    const author = params.author;

    console.log(author);
    
    const allAuthors = getAllAuthors();
    
    
    return (
        <div>
            <h1 className="my-5 text-center text-3xl font-md dark:text-white">
                All blogs by <span className="font-bold text-primary-200">{author}</span>
            </h1>
            {allAuthors.includes(author) ? 
                <div className="flex flex-col items-center">
                    <FilteredPosts > 
                        {postMetadata.map((post, index) => {
                            if(post.author === author){
                                return(
                                    <PostCard key={index} cardData={post} />
                                )
                            }
                        })}
                    </FilteredPosts>
                </div>
            :
                <div className="flex flex-col xs:flex-row items-center justify-center text-center gap-2 mt-20 mx-5 text-lg">
                    <BsHourglassSplit className="text-3xl md:text-xl" />
                    No blogs by this author, yet. Are you sure you are searching for the right pen?
                </div>
            }

        </div>
	)
}