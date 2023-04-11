import { PostMetadata } from "./PostMetadata";
import getPostMetadata from "./getPostMetadata";

const getAllAuthors = (): string[] => {
    const posts = getPostMetadata();

    const allAuthors:string[] = [];

    posts.map((post: PostMetadata) => {
        allAuthors.push(post.author);
    });

    const uniqueAuthors = allAuthors.filter((item, i, arr) => arr.indexOf(item) === i );
    return uniqueAuthors;
}

export default getAllAuthors;