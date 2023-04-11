import { PostMetadata } from "./PostMetadata";
import getPostMetadata from "./getPostMetadata";

const getAllUniqueTags = (): string[] => {
    const posts = getPostMetadata();

    const allTags:string[] = [];

    posts.map((post: PostMetadata) => {
        allTags.push(...(post.tags));
    });

    const uniqueTags = allTags.filter((item, i, arr) => arr.indexOf(item) === i );
    return uniqueTags;
}

export default getAllUniqueTags;