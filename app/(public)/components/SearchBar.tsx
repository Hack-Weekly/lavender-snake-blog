"use client"
import { useEffect, useState } from "react"
import React from "react"
import { BsSearch } from "react-icons/bs"
import { MdClose } from "react-icons/md"
import Fuse from "fuse.js"
import { PostMetadata } from "./PostMetadata"
import Link from "next/link"

interface SearchBarProps {
	postMetadatas: PostMetadata[]
}
interface SearchModalProps {
	postMetadatas: PostMetadata[]
	toggleSearch: any
}

const fuseOptions = {
	threshold: 0.6,
	shouldSort: true,
	// useExtendedSearch: false,
	keys: ["title", "excerpt", "author", "tags"],
}

function SearchModal(searchModalProps: SearchModalProps) {
	const [searchInput, setSearchInput] = useState("")

	const fuse = new Fuse(searchModalProps.postMetadatas, fuseOptions)
	const searchResult = fuse.search(searchInput)

	return (
		<div
			id="search-modal"
			className="fixed inset-0 z-10 flex w-full items-center justify-center bg-primary-950 bg-opacity-40 text-white backdrop-blur-sm dark:text-primary-50"
		>
			<div className="flex h-96 w-[80%] flex-col rounded bg-[#1E293B] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[45%]">
				<div className="mb-2 flex items-center border-b-[1px] border-[#475569] p-3">
					<BsSearch className="mr-1 text-2xl" />
					<input
						type="text"
						name="searchInput"
						id=""
						value={searchInput}
						onChange={(e: any) => {
							setSearchInput(e.target.value)
						}}
						placeholder="Search blogs"
						className="mr-2 w-full bg-inherit p-1 text-lg outline-none placeholder:text-slate-500"
						autoFocus
					/>
					<div onClick={searchModalProps.toggleSearch}></div>
					<div
						className=" ml-auto flex cursor-pointer items-center rounded-sm bg-[#475569]"
						onClick={searchModalProps.toggleSearch}
					>
						<MdClose className="text-3xl xs:hidden" />
						<div className="hidden p-1 xs:block ">Esc</div>
					</div>
				</div>
				<div className="flex flex-col items-center overflow-y-auto">
					{!searchInput && <div>Start typing to search Snakebyte blogs</div>}
					{searchInput && searchResult.length === 0 && (
						<div>No results found for &quot;{searchInput}&quot;</div>
					)}
					{searchInput && searchResult.length > 0 && (
						<div className="w-full p-3 pt-0">
							<div>Search results for &quot;{searchInput}&quot;</div>
							<div className="flex w-full flex-col gap-2">
								{searchResult.map((matchedPost: any) => {
									return (
										<Link
											onClick={searchModalProps.toggleSearch}
											href={`/${matchedPost.item.slug}`}
											key={matchedPost.item.slug}
											className="w-full cursor-pointer rounded-sm bg-[#2e3c4e] p-3 hover:underline dark:hover:bg-[#3e495a]"
										>
											{matchedPost.item.title}
										</Link>
									)
								})}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default function SearchBar(searchBarProps: SearchBarProps) {
	const [isSearchOpen, setIsSearchOpen] = useState(false)
	const toggleSearch = () => {
		setIsSearchOpen(!isSearchOpen)
	}
	const keyDownSearch = (event: KeyboardEvent) => {
		// browsers may open own search bar on ctrl+k, preventDefault may prevent that
		if (event.ctrlKey && event.key === "k") {
			event.preventDefault()
			setIsSearchOpen(true)
		} else if (event.key === "Escape") {
			setIsSearchOpen(false)
		}
	}

	useEffect(() => {
		window.addEventListener("keydown", keyDownSearch)
	})

	return (
		<div id="search-bar">
			<div
				className="flex cursor-pointer items-center gap-2.5 rounded-md p-2 text-sm hover:bg-[#E9E9D5] dark:hover:bg-[#1E293B] xs:dark:bg-[#1E293B] sm:bg-secondary-bg"
				onClick={toggleSearch}
			>
				<BsSearch className="text-base" />
				<div className="hidden sm:block">Search</div>
				<div className="hidden md:block">Ctrl K</div>
			</div>
			{isSearchOpen && (
				<SearchModal
					toggleSearch={toggleSearch}
					postMetadatas={searchBarProps.postMetadatas}
				/>
			)}
		</div>
	)
}
