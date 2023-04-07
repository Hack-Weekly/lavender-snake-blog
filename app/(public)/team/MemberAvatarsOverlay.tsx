import Image from "next/image"
import { AVATAR_SIZE } from "./constants"
import AjoyAvatar from "./assets/images/ajoy.webp"
import EjAvatar from "./assets/images/ej.webp"
import MagicBeamAvatar from "./assets/images/magic-beam.webp"
import MysteryInHoodieAvatar from "./assets/images/mystery-in-hoodie.webp"
import RollieAvatar from "./assets/images/rollie.webp"
import ToxAvatar from "./assets/images/tox.png"
import VitiligoAvatar from "./assets/images/vitiligo.webp"
import XanurobaAvatar from "./assets/images/xanuroba.webp"

// Note that coordinates are relative to GAME_WIDTH and GAME_HEIGHT (not the CANVAS_WIDTH and CANVAS_HEIGHT)
// The maximum value of x and y is {GAME_WIDTH - AVATAR_SIZE} and {GAME_HEIGHT - AVATAR_SIZE} respectively
export const members = [
	{
		name: "Ajoy",
		avatar: AjoyAvatar,
		coordinates: { x: 40, y: 320 },
	},
	{
		name: "Ej",
		avatar: EjAvatar,
		coordinates: { x: 150, y: 20 },
	},
	{
		name: "MagicBeam",
		avatar: MagicBeamAvatar,
		coordinates: { x: 120, y: 175 },
	},
	{
		name: "MysteryInHoodie",
		avatar: MysteryInHoodieAvatar,
		coordinates: { x: 350, y: 250 },
	},
	{
		name: "Rollie",
		avatar: RollieAvatar,
		coordinates: { x: 440, y: 100 },
	},
	{
		name: "Tox",
		avatar: ToxAvatar,
		coordinates: { x: 650, y: 50 },
	},
	{
		name: "Vitiligo",
		avatar: VitiligoAvatar,
		coordinates: { x: 600, y: 300 },
	},
	{
		name: "Xanuroba",
		avatar: XanurobaAvatar,
		coordinates: { x: 710, y: 200 },
	},
]

export default function MemberAvatarsOverlay() {
	return (
		<div className="relative h-full w-full bg-transparent">
			{members.map((member) => (
				<Image
					key={member.name}
					src={member.avatar}
					alt={member.name}
					height={AVATAR_SIZE}
					width={AVATAR_SIZE}
					className="absolute rounded-full"
					style={{
						left: `${member.coordinates.x}px`,
						top: `${member.coordinates.y}px`,
					}}
				/>
			))}
		</div>
	)
}
