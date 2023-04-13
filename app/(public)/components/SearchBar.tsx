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
	threshold: 0.0,
	shouldSort: true,
	// useExtendedSearch: false,
	ignoreLocation: true,
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
						placeholder="Search posts"
						className="mr-2 w-full bg-inherit p-1 text-lg outline-none placeholder:text-slate-500"
						autoFocus
					/>
					<div onClick={searchModalProps.toggleSearch}></div>
					<div
						className="ml-auto flex cursor-pointer items-center rounded-sm bg-[#475569]"
						onClick={searchModalProps.toggleSearch}
					>
						<MdClose className="text-3xl xs:hidden" />
						<kbd className="hidden px-2 py-1 xs:block ">Esc</kbd>
					</div>
				</div>
				<div className="flex flex-col items-center overflow-y-auto">
					{!searchInput && <div>Start typing to search Snakebyte posts</div>}
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

	useEffect(() => {
		const keyDownSearch = (event: KeyboardEvent) => {
			if (event.ctrlKey && event.key === "k") {
				event.preventDefault()
				setIsSearchOpen(true)
			}
		}
		const keyUpSearch = (event: KeyboardEvent) => {
			if (event.key === "/") {
				setIsSearchOpen(true)
			} else if (event.key === "Escape") {
				setIsSearchOpen(false)
			}
		}

		document.body.addEventListener("keydown", keyDownSearch)
		document.body.addEventListener("keyup", keyUpSearch)
		return () => {
			document.body.removeEventListener("keydown", keyDownSearch)
			document.body.removeEventListener("keyup", keyUpSearch)
		}
	}, [])

	return (
		<div id="search-bar">
			<div
				className="group flex cursor-pointer items-center gap-4 rounded-md text-sm sm:bg-secondary-bg sm:px-4 sm:py-2 sm:dark:bg-[#1E293B]"
				onClick={toggleSearch}
			>
				<BsSearch className="text-xl opacity-75 group-hover:opacity-100 sm:text-base" />
				<div className="hidden items-center gap-3 opacity-75 group-hover:opacity-100 sm:flex">
					<div className="hidden sm:block">Search</div>
					<div className="flex gap-1">
						<kbd className="hidden rounded-md border border-primary-200 px-2 py-1 text-xs dark:border-primary-100 md:block">
							/
						</kbd>
						<kbd className="hidden rounded-md border border-primary-200 px-2 py-1 text-xs dark:border-primary-100 md:block">
							Ctrl K
						</kbd>
					</div>
				</div>
			</div>
			{isSearchOpen ? (
				<SearchModal
					toggleSearch={toggleSearch}
					postMetadatas={searchBarProps.postMetadatas}
				/>
			) : (
				""
			)}
		</div>
	)
}
