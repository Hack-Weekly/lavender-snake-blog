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
		coordinates: { x: 0, y: 200 },
	},
	{
		name: "Ej",
		avatar: EjAvatar,
		coordinates: { x: 100, y: 200 },
	},
	{
		name: "MagicBeam",
		avatar: MagicBeamAvatar,
		coordinates: { x: 200, y: 200 },
	},
	{
		name: "MysteryInHoodie",
		avatar: MysteryInHoodieAvatar,
		coordinates: { x: 300, y: 200 },
	},
	{
		name: "Rollie",
		avatar: RollieAvatar,
		coordinates: { x: 400, y: 200 },
	},
	{
		name: "Tox",
		avatar: ToxAvatar,
		coordinates: { x: 500, y: 200 },
	},
	{
		name: "Vitiligo",
		avatar: VitiligoAvatar,
		coordinates: { x: 600, y: 200 },
	},
	{
		name: "Xanuroba",
		avatar: XanurobaAvatar,
		coordinates: { x: 700, y: 200 },
	},
]

// Unfortunately, we can't just loop though the members array and render the Image component dynamically
// because left-[${coordinates.x}px] top-[${coordinates.y}px] will not work. Someone got a solution?
// But still, we need to export the coordinates to the parent component so that the snake will know when it collides with the avatar
export default function MemberAvatarsOverlay() {
	return (
		<div className="relative h-full w-full bg-transparent">
			<Image
				src={AjoyAvatar}
				alt="Ajoy"
				height={AVATAR_SIZE}
				width={AVATAR_SIZE}
				className={`absolute left-[100px] top-[200px] rounded-full`}
			/>
			<Image
				src={MagicBeamAvatar}
				alt="MagicBeam"
				height={AVATAR_SIZE}
				width={AVATAR_SIZE}
				className={`absolute left-[200px] top-[200px] rounded-full`}
			/>
			<Image
				src={MysteryInHoodieAvatar}
				alt="MysteryInHoodie"
				height={AVATAR_SIZE}
				width={AVATAR_SIZE}
				className={`absolute left-[300px] top-[200px] rounded-full`}
			/>
			<Image
				src={RollieAvatar}
				alt="Rollie"
				height={AVATAR_SIZE}
				width={AVATAR_SIZE}
				className={`absolute left-[400px] top-[200px] rounded-full`}
			/>
			<Image
				src={ToxAvatar}
				alt="Tox"
				height={AVATAR_SIZE}
				width={AVATAR_SIZE}
				className={`absolute left-[500px] top-[200px] rounded-full`}
			/>
			<Image
				src={VitiligoAvatar}
				alt="Vitiligo"
				height={AVATAR_SIZE}
				width={AVATAR_SIZE}
				className={`absolute left-[600px] top-[200px] rounded-full`}
			/>
			<Image
				src={XanurobaAvatar}
				alt="Xanuroba"
				height={AVATAR_SIZE}
				width={AVATAR_SIZE}
				className={`absolute left-[700px] top-[200px] rounded-full`}
			/>
		</div>
	)
}
