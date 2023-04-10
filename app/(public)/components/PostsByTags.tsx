import PostCard from "./PostCard"

interface Post {
	id: string
	title: string
	body: string
	tags: string[]
	author: string
	imgsrc: string
	datetime: number
}
const posts: Post[] = [
	{
		id: "1",
        title: "Why Hydration is Necessary",
	    body: `The human body is a complex system that relies on hydration to function optimally. Composed of approximately 60% water, our...`,
	    tags: ["health", "science"],
	    author: "Jude",
	    imgsrc: "/images/Dumbbells-in-a-fitness.png", //1024 x 1024
	    datetime: Date.now(),
    },
    {
		id: "2",
        title: "How to give the best presents, as someone who does not...",
	    body: `Gift-giving is a cherished tradition that fosters connection and strengthens bonds between people. However, finding the perfect present...`,
	    tags: ["MATHEMATICS", "BULLSHITTERY"],
	    author: "Jude",
	    imgsrc: "/images/3d-balloons-and-present-box.png", //1024 x 1024
	    datetime: Date.now(),
    },
    {
		id: "3",
        title: "It is time to ditch coffee. Here’s why.",
	    body: `As a staple in many daily routines, coffee is often praised for its ability to jumpstart the day and provide a much-needed energy boo...`,
	    tags: ["health"],
	    author: "Jude",
	    imgsrc: "/images/coffee.png", //1024 x 1024
	    datetime: Date.now(),
    },
    {
		id: "4",
        title: "Live. Laugh. Love.",
	    body: `As a staple in many daily routines, coffee is often praised for its ability to jumpstart the day and provide a much-needed energy boo...`,
	    tags: ["HEALTH", "FAMILY", "GIRLBOSS"],
	    author: "Jude",
	    imgsrc: "/images/family.png", //1024 x 1024
	    datetime: Date.now(),
    },
]

export default function PostsByTags(){
    return (
        <div className="mx-2 xs:mx-4 xl:mx-6 my-10 flex flex-col gap-2 lg:gap-4 md:grid md:grid-cols-2">
			{posts.map((post, index) => {
				return (
					<PostCard 
						key={post.id}
						postData={post}
					/>
				)
			})}
        </div>
    )
}