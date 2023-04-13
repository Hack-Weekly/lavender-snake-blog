import { Metadata } from "next"
import SnakeGame from "./SnakeGame"
import Image from "next/image"
import { members } from "./MemberAvatarsOverlay"

export const metadata: Metadata = {
	title: "Team",
	description: "The members of the Lavender Snake Team.",
}

export default function Team() {
	return (
		<div className="flex h-full w-full">
			<div className="hidden flex-1 items-center justify-center min-[832px]:flex">
				<SnakeGame />
			</div>
			<div className="flex flex-1 flex-col items-center justify-center min-[832px]:hidden">
				<h1 className="mb-10 text-2xl font-semibold">
					Meet the <span className="font-bold text-primary-400">Team</span>!
				</h1>
				<ul className="flex flex-col gap-2 ">
					{members.map((member) => (
						<li
							key={member.name}
							className="flex items-center justify-start gap-2 text-lg"
						>
							<Image
								src={member.avatar}
								alt={member.name}
								width={32}
								height={32}
								className="rounded-full"
							/>
							{member.name}
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
