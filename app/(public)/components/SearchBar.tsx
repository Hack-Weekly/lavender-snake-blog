"use client";
import { useEffect, useState } from "react";
import React from "react";
import { BsSearch } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import Fuse from "fuse.js";
import { PostMetadata } from "./PostMetadata";
import Link from "next/link";

interface SearchBarProps{
    postMetadatas: PostMetadata[]
}
interface SearchModalProps{
    postMetadatas: PostMetadata[]
    toggleSearch: any
}

const fuseOptions = {
    threshold: 0.6,
    shouldSort: true,
    // useExtendedSearch: false,
    keys: [
    "title",
    "excerpt",
    "author",
    "tags"
    ]
};

function SearchModal(searchModalProps: SearchModalProps){
    const [searchInput, setSearchInput] = useState("");
    
    const fuse = new Fuse(searchModalProps.postMetadatas, fuseOptions);
    const searchResult = fuse.search(searchInput);
    
    return (
        <div id="search-modal" className="fixed z-10 w-full inset-0 bg-primary-950 bg-opacity-40 backdrop-blur-sm flex justify-center items-center text-white dark:text-primary-50">
            <div className="flex flex-col w-[80%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[45%] h-96 bg-[#1E293B] rounded">
                <div className="flex items-center p-3 mb-2 border-b-[1px] border-[#475569]">
                    <BsSearch className="text-2xl mr-1" />
                    <input type="text" name="searchInput" id="" value={searchInput} onChange={(e:any) => {setSearchInput(e.target.value)}} placeholder="Search blogs" className="w-full mr-2 bg-inherit outline-none p-1 text-lg placeholder:text-slate-500" autoFocus />
                    <div onClick={searchModalProps.toggleSearch}></div>
                    <div className=" flex items-center bg-[#475569] ml-auto rounded-sm cursor-pointer" onClick={searchModalProps.toggleSearch}>
                        <MdClose className="xs:hidden text-3xl" />
                        <div className="hidden xs:block p-1 ">Esc</div>
                    </div>
                </div>
                <div className="flex items-center justify-center overflow-y-scroll">
                    {!searchInput && <div>Start typing to search Snakebyte blogs</div> }
                    {(searchInput && (searchResult.length === 0)) && <div>
                        No results found for &quot;{searchInput}&quot;
                    </div> }
                    {(searchInput && (searchResult.length > 0)) && <div className="w-full p-3 pt-0">
                        <div>Search results for &quot;{searchInput}&quot;</div>
                        <div className="flex flex-col gap-2 w-full">
                            {searchResult.map((matchedPost:any) => {
                                return(
                                    <Link onClick={searchModalProps.toggleSearch} href={`/${matchedPost.item.slug}`} key={matchedPost.item.slug} className="w-full p-3 bg-[#2e3c4e] hover:underline dark:hover:bg-[#3e495a] cursor-pointer rounded-sm">
                                        {matchedPost.item.title}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default function SearchBar(searchBarProps: SearchBarProps){
    const [isSearchOpen, setIsSearchOpen] = useState(false);
	const toggleSearch = () => {
		setIsSearchOpen(!isSearchOpen);
	};
    const keyDownSearch = (event: KeyboardEvent) => {
        // browsers may open own search bar on ctrl+k, preventDefault may prevent that
        if (event.ctrlKey && event.key === "k") {
            event.preventDefault();
            setIsSearchOpen(true);
        }else if(event.key === "Escape"){
            setIsSearchOpen(false);
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", keyDownSearch)
    });

    return(
        <div id="search-bar" >
            <div className="flex items-center gap-2.5 p-2 text-sm sm:bg-secondary-bg hover:bg-[#E9E9D5] xs:dark:bg-[#1E293B] dark:hover:bg-[#1E293B] rounded-md cursor-pointer" onClick={toggleSearch}>
                <BsSearch className="text-base" />
                <div className="hidden sm:block">Search</div>
                <div className="hidden md:block">Ctrl K</div>
		    </div>
            { isSearchOpen && <SearchModal toggleSearch={toggleSearch} postMetadatas={searchBarProps.postMetadatas}/> }
        </div>
    )
}