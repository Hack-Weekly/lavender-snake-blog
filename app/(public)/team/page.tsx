import { Metadata } from "next"
import SnakeGame from "./SnakeGame"

export const metadata: Metadata = {
	title: "Team",
	description: "The members of the Lavender Snake Team.",
}

export default function Team() {
	return (
		<div className="align-center flex flex-1 justify-center">
			<SnakeGame />
		</div>
	)
}
