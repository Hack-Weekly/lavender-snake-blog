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
import { EditorContent, useEditor } from "@tiptap/react"
import React from "react"

import { SmileyReplacer } from "./SmileyReplacer"

const limit = 420

export default function CommentEditor() {
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
			CharacterCount.configure({
				limit,
			}),
		],
		editorProps: {
			attributes: {
				class: "focus:outline-none",
			},
		},
		content: `
      <p>
      Type <code>**two asterisks**</code> or <code>__two underlines__</code> and it will magically transform to <strong>bold</strong> text while you type.
      </p>
      <p>
      Type <code>*one asterisk*</code> or <code>_one underline_</code> and it will magically transform to <em>italic</em> text while you type.
      </p>
      <p>
        Type <code>∼∼two tildes∼∼</code> and it will magically transform to <s>strikethrough</s> text while you type.
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
		<div className="rounded bg-card-bg p-4">
			<EditorContent editor={editor} />
			<div className="flex items-end justify-between">
				<div className="character-count select-none">
					{editor.storage.characterCount.characters()}/{limit} characters
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
						Comment
					</button>
				</div>
			</div>
		</div>
	)
}
