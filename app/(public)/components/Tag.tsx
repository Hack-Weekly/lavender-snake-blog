import Link from "next/link";
import React from "react";

interface Tagprops{
    tag: string
}

export default function Tag(tagProps: Tagprops){
    return (
        <Link href={`/category/${tagProps.tag}`} className="hover:text-primary-600">
            {tagProps.tag.toUpperCase()}
        </Link>
    )
}