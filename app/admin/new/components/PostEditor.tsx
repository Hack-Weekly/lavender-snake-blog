"use client"

import Code from "@tiptap/extension-code"
import Document from "@tiptap/extension-document"
import Paragraph from "@tiptap/extension-paragraph"
import Text from "@tiptap/extension-text"
import Italic from "@tiptap/extension-italic"
import Bold from "@tiptap/extension-bold"
import Strike from "@tiptap/extension-strike"
import Typography from "@tiptap/extension-typography"
import CharacterCount from "@tiptap/extension-character-count"
import History from "@tiptap/extension-history"

import Highlight from "@tiptap/extension-highlight"
import Heading from "@tiptap/extension-heading"
import OrderedList from "@tiptap/extension-ordered-list"
import BulletList from "@tiptap/extension-bullet-list"
import ListItem from "@tiptap/extension-list-item"
import CodeBlock from "@tiptap/extension-code-block"
import HardBreak from "@tiptap/extension-hard-break"
import Blockquote from "@tiptap/extension-blockquote"
import { EditorContent, useEditor } from "@tiptap/react"
import React from "react"

import { SmileyReplacer } from "@/components/SmileyReplacer"

import Clock from "./Clock"

export default function PostEditor() {
	const editor = useEditor({
		extensions: [
			Document,
			Paragraph,
			Text,
			Italic,
			Bold,
			Strike,
			Code,
			Typography,
			SmileyReplacer,
			CharacterCount,
			History,
			Highlight,
			Heading,
			OrderedList,
			BulletList,
			ListItem,
			CodeBlock,
			HardBreak,
			Blockquote,
		],
		editorProps: {
			attributes: {
				class: "focus:outline-none prose",
			},
		},
		content: `
		<p>
			Type <code># </code> at the beginning of a new line and it will magically transform to a heading, same for <code>## </code>, <code>### </code>, <code>#### </code>, <code>##### </code> and <code>###### </code>.
		</p>
		<p>
			Type <code>* </code>, <code>- </code> or <code>+ </code> at the beginning of a new line and it will magically transform to a bullet list.
		</p>
		<p>
			Type <code>1. </code> (or any other number followed by a dot) at the beginning of a new line and it will magically transform to a ordered list.
		</p>
      	<p>
			Type <code>**two asterisks**</code> or <code>__two underlines__</code> and it will magically transform to <strong>bold</strong> text while you type.
		</p>
		<p>
			Type <code>*one asterisk*</code> or <code>_one underline_</code> and it will magically transform to <em>italic</em> text while you type.
		</p>
		<p>
			Type <code>∼∼two tildes∼∼</code> and it will magically transform to <s>strikethrough</s> text while you type.
		</p>
		<p>
			Type <code>==two equal signs==</code> and it will magically transform to <mark>highlighted</mark> text while you type.
		</p>
		<p>
			Type something with <code>\`back-ticks around\`</code> and it will magically transform to <code>inline code</code> while you type.
		</p>
		<p>
		Type <code>> </code> at the beginning of a new line and it will magically transform to a blockquote.
		</p>
		<p>
			Type <code>\`\`\` </code> (three backticks and a space) or <code>∼∼∼ </code> (three tildes and a space) and a code block is instantly added for you.
		</p>
		<p>
			Try it out and type <code>(c)</code>, <code>-></code>, <code>>></code>, <code>1/2</code>, <code>!=</code>, <code>--</code> or <code>1x1</code> here:
		</p>
		<p>
			Smileys like <code>:-)</code>, <code><3</code> or <code>>:P</code> will be replaced with emojis.
		</p>
    `,
	})

	if (!editor) {
		return null
	}

	return (
		<div className="min-h-dscreen flex flex-col gap-4 rounded bg-card-bg p-4">
			<input
				type="text"
				placeholder="Enter Title"
				className="bg-transparent text-2xl focus:outline-none"
			/>
			<input
				type="text"
				placeholder="Enter Tag"
				className="bg-transparent focus:outline-none"
			/>
			<input type="file" accept="image/*" />
			<div>
				<Clock />
			</div>
			<EditorContent editor={editor} />
			<div className="flex items-end justify-between">
				<div className="mt-4 select-none text-neutral-300">
					{editor.storage.characterCount.characters()} characters
					<br />
					{editor.storage.characterCount.words()} words
				</div>
				<div>
					<button
						onClick={() =>
							console.log({
								HTML: editor.getHTML(),
								JSON: editor.getJSON(),
								Text: editor.getText(),
							})
						}
						// Debugging purposes
					>
						Post
					</button>
				</div>
			</div>
		</div>
	)
}
