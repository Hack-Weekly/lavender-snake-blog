"use client"

import { forwardRef, useEffect, useRef, useState } from "react"
import { Coordinate, GameState, GameMode } from "./types"
import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	GAME_HEIGHT,
	GAME_WIDTH,
	INITIAL_GAME_STATE,
	INITIAL_SPAWN_COORDINATES,
	SEGMENT_SIZE,
	SNAKE_TAIL_LENGTH,
} from "./constants"
import { useSnakeGame } from "./useSnakeGame"
import MemberAvatarsOverlay from "./MemberAvatarsOverlay"

// Entry point
export default function SnakeGame() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	const [gameMode, setGameMode] = useState<GameMode>("MEET_TEAM")
	const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE)
	const [highscore, setHighscore] = useState(0)
	const [collidedMember, setCollidedMember] = useState("")

	const { segments, food, handleKeydown, resetGame } = useSnakeGame(
		gameMode,
		gameState,
		setGameState,
		setCollidedMember
	)

	const score = segments.length - INITIAL_SPAWN_COORDINATES.length

	const drawFn = (ctx: CanvasRenderingContext2D) =>
		draw(ctx, segments, gameMode === "CLASSIC" ? food : undefined)

	const focusCanvas = () => {
		if (!canvasRef.current) return
		canvasRef.current.focus()
	}

	const restartGame = () => {
		resetGame()
		setGameState("PLAYING")
		focusCanvas()
	}

	const pauseGame = () => {
		setGameState("PAUSED")
		focusCanvas()
	}

	const playGame = () => {
		setGameState("PLAYING")
		focusCanvas()
	}

	useEffect(() => {
		if (score > highscore) setHighscore(score)
	}, [score, highscore])

	return (
		<div className="flex flex-col items-center justify-center space-y-8">
			<NoticeBoard gameMode={gameMode} score={score} highscore={highscore} />
			<div
				className={`relative h-[${GAME_HEIGHT}px] w-[${GAME_WIDTH}px] rounded bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1`}
			>
				{/* Overlay over the game */}
				<div className="absolute inset-0 flex h-full w-full items-center justify-center">
					{gameMode === "MEET_TEAM" && <MemberAvatarsOverlay />}
					{gameMode === "MEET_TEAM" && collidedMember && (
						<div className="absolute z-50 m-1 flex h-full w-full select-none items-center justify-center bg-black/80 text-3xl text-white">
							{collidedMember}
						</div>
					)}
					{gameMode === "CLASSIC" && gameState === "GAME_OVER" && (
						<div className="select-none text-3xl text-white">Game Over</div>
					)}
				</div>
				{/* Game container */}
				<Canvas ref={canvasRef} draw={drawFn} onKeyDown={handleKeydown} />
			</div>
			<div className="flex space-x-8">
				<div className="w-fit rounded bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1">
					{gameState === "GAME_OVER" ? (
						<button
							className="w-64 bg-white px-6 py-2 text-black"
							onClick={restartGame}
						>
							Reset
						</button>
					) : gameState === "PLAYING" ? (
						<button
							className="w-64 bg-white px-6 py-2 text-black"
							onClick={pauseGame}
						>
							Pause
						</button>
					) : (
						<button
							className="w-64 bg-white px-6 py-2 text-black"
							onClick={playGame}
						>
							{gameMode === "CLASSIC" ? "Play" : "Resume"}
						</button>
					)}
				</div>
				<div className="w-fit rounded bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1">
					<button
						className="w-64 bg-white px-6 py-2 text-black disabled:cursor-not-allowed disabled:text-gray-200"
						disabled={gameState !== "PAUSED"}
						onClick={() => {
							if (gameMode === "MEET_TEAM") {
								setGameMode("CLASSIC")
								focusCanvas()
							} else {
								setGameMode("MEET_TEAM")
								setCollidedMember("")
								focusCanvas()
							}
						}}
					>
						{gameMode === "MEET_TEAM" ? "Feed Lavender Buddy" : "Meet The Team"}
					</button>
				</div>
			</div>
		</div>
	)
}

// TODO:
// 1. Use color from design system
// 2. Set width and height properly (the internal size will be scaled to meet the style from CSS)
const Canvas = forwardRef<
	HTMLCanvasElement,
	{
		draw: (ctx: CanvasRenderingContext2D) => void
	} & React.DetailedHTMLProps<
		React.CanvasHTMLAttributes<HTMLCanvasElement>,
		HTMLCanvasElement
	>
>(function Canvas({ children, draw, ...props }, canvasRef) {
	useEffect(() => {
		if (!canvasRef) return

		const canvas = (canvasRef as React.RefObject<HTMLCanvasElement>).current
		if (!canvas) return

		const ctx = canvas.getContext("2d")
		if (!ctx) return

		draw(ctx)

		return () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height)
		}
	}, [canvasRef, draw])

	if (!canvasRef) return null

	return (
		<canvas
			ref={canvasRef}
			className="h-full w-full bg-black focus:outline-none"
			width={CANVAS_WIDTH} // internal canvas width
			height={CANVAS_HEIGHT} // internal canvas height
			tabIndex={0}
			{...props}
		/>
	)
})

// Draws stuffs on the canvas
function draw(
	ctx: CanvasRenderingContext2D,
	segments: Coordinate[],
	food: Coordinate | undefined
) {
	const head = segments[0]
	const body = segments.slice(1, segments.length - SNAKE_TAIL_LENGTH)
	const tail = segments.slice(segments.length - SNAKE_TAIL_LENGTH)

	// Draw food
	if (food) {
		ctx.fillStyle = "red" // TODO: Use color from design system
		ctx.fillRect(food.x, food.y, SEGMENT_SIZE, SEGMENT_SIZE)
	}

	// Draw snake's head
	ctx.fillStyle = "rgba(255, 255, 255, 1)"
	ctx.fillRect(head.x, head.y, SEGMENT_SIZE, SEGMENT_SIZE)

	// Draw snake's body
	ctx.fillStyle = "rgba(255, 255, 255, 0.8" // TODO: Use color from design system
	for (const { x, y } of body) {
		ctx.fillRect(x, y, SEGMENT_SIZE, SEGMENT_SIZE)
	}

	// Draw snake's tail
	for (let i = 0; i < tail.length; i++) {
		const { x, y } = tail[i]
		ctx.fillStyle = `rgba(255, 255, 255, ${0.1 * (tail.length - i)})`
		ctx.fillRect(x, y, SEGMENT_SIZE, SEGMENT_SIZE)
	}
}

function NoticeBoard({
	gameMode,
	score,
	highscore,
}: {
	gameMode: GameMode
	score: number
	highscore: number
}) {
	return (
		<div className="flex space-x-24">
			{gameMode === "MEET_TEAM" ? (
				<span>
					Move Lavender Buddy to the member you&apos;re interested in!
				</span>
			) : (
				<>
					<span>
						Score:{" "}
						<span className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
							{score}
						</span>
					</span>
					<span>
						Highscore:{" "}
						<span className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
							{highscore}
						</span>
					</span>
				</>
			)}
		</div>
	)
}
