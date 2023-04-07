"use client"

import { forwardRef, useEffect, useRef, useState } from "react"
import { Coordinate, GameState } from "./types"
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
	const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE)
	const [highscore, setHighscore] = useState(0)

	const { segments, food, handleKeydown, resetGame } = useSnakeGame(
		gameState,
		setGameState
	)

	const score = segments.length - INITIAL_SPAWN_COORDINATES.length

	const drawFn = (ctx: CanvasRenderingContext2D) => draw(ctx, segments, food)

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
			<NoticeBoard score={score} highscore={highscore} />
			<div
				className={`relative h-[${GAME_HEIGHT}px] w-[${GAME_WIDTH}px] rounded bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1`}
			>
				{/* Overlay over the game */}
				<div className="absolute inset-0 flex h-full w-full items-center justify-center">
					{gameState === "GAME_OVER" ? (
						<div className="select-none text-3xl text-white">Game Over</div>
					) : (
						<MemberAvatarsOverlay />
					)}
				</div>
				{/* Game container */}
				<Canvas ref={canvasRef} draw={drawFn} onKeyDown={handleKeydown} />
			</div>
			<div className="w-fit rounded bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1">
				{gameState === "GAME_OVER" ? (
					<button
						className="bg-white px-6 py-2 text-black"
						onClick={restartGame}
					>
						Reset
					</button>
				) : gameState === "PLAYING" ? (
					<button className="bg-white px-6 py-2 text-black" onClick={pauseGame}>
						Pause
					</button>
				) : (
					<button className="bg-white px-6 py-2 text-black" onClick={playGame}>
						Play
					</button>
				)}
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

	// Draw member portraits
	// for (const coordinate of MEMBER_PORTRAIT_COORDINATES) {
	// 	const img = new Image()
	// 	img.width = 50
	// 	img.height = 50
	// 	img.src = "https://robohash.org/snakebyte"
	// 	ctx.imageSmoothingEnabled = true
	// 	ctx.imageSmoothingQuality = "high"
	// 	ctx.drawImage(img, coordinate.x, coordinate.y, img.width, img.height)
	// }

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
	score,
	highscore,
}: {
	score: number
	highscore: number
}) {
	return (
		<div className="flex space-x-24">
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
		</div>
	)
}
