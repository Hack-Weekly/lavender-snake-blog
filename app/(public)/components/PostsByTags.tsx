import React from "react"

interface Posts {
	children: React.ReactNode
}

export default function PostsByTags(props: Posts){
    return (
        <div className="mx-2 xs:mx-4 xl:mx-6 my-10 flex flex-col gap-2 lg:gap-4 md:grid md:grid-cols-2">
			{props.children}
        </div>
    )
}