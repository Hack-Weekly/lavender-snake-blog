import { useEffect, useState } from "react"
import {
	AVATAR_SIZE,
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	INITIAL_DIRECTION,
	INITIAL_SPAWN_COORDINATES,
	SEGMENT_SIZE,
	SNAKE_TAIL_LENGTH,
	SPEED,
} from "./constants"
import { Coordinate, Direction, GameMode, GameState } from "./types"
import { useInterval } from "./useInterval"
import { members } from "./MemberAvatarsOverlay"

// Helpers
const moveSnake = {
	up: (segments: Coordinate[]) => {
		const newSegments = [...segments]
		newSegments.pop()
		newSegments.unshift({ x: segments[0].x, y: segments[0].y - SEGMENT_SIZE })
		return newSegments
	},
	down: (segments: Coordinate[]) => {
		const newSegments = [...segments]
		newSegments.pop()
		newSegments.unshift({ x: segments[0].x, y: segments[0].y + SEGMENT_SIZE })
		return newSegments
	},
	left: (segments: Coordinate[]) => {
		const newSegments = [...segments]
		newSegments.pop()
		newSegments.unshift({ x: segments[0].x - SEGMENT_SIZE, y: segments[0].y })
		return newSegments
	},
	right: (segments: Coordinate[]) => {
		const newSegments = [...segments]
		newSegments.pop()
		newSegments.unshift({ x: segments[0].x + SEGMENT_SIZE, y: segments[0].y })
		return newSegments
	},
}

function spawnFoodRandom(): Coordinate {
	const x =
		Math.floor((Math.random() * CANVAS_WIDTH) / SEGMENT_SIZE) * SEGMENT_SIZE
	const y =
		Math.floor((Math.random() * CANVAS_HEIGHT) / SEGMENT_SIZE) * SEGMENT_SIZE
	return { x, y }
}

// Controls the logic of the game
export function useSnakeGame(
	gameMode: GameMode,
	gameState: GameState,
	setGameState: React.Dispatch<React.SetStateAction<GameState>>,
	setCollidedMember: React.Dispatch<React.SetStateAction<string>>
) {
	const [segments, setSegments] = useState<Coordinate[]>(
		INITIAL_SPAWN_COORDINATES
	)
	const [food, setFood] = useState<Coordinate | undefined>(undefined)
	const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION)
	const [isCollidingWithAvatar, setIsCollidingWithAvatar] = useState(false)

	const headCoordinate = segments[0]
	const isTouchingTopBoundary = headCoordinate.y <= 0
	const isTouchingBottomBoundary =
		headCoordinate.y >= CANVAS_HEIGHT - SEGMENT_SIZE
	const isTouchingLeftBoundary = headCoordinate.x <= 0
	const isTouchingRightBoundary =
		headCoordinate.x >= CANVAS_WIDTH - SEGMENT_SIZE
	const isOnLeftSide = headCoordinate.x <= CANVAS_WIDTH / 2
	const isOnTopSide = headCoordinate.y <= CANVAS_HEIGHT / 2

	const handleKeydown = (e: React.KeyboardEvent<HTMLCanvasElement>) => {
		switch (e.key) {
			case "ArrowUp":
			case "w":
			case "W":
				if (direction === "DOWN") return // prevent 180 degree turn
				if (segments[0].x === segments[1].x) return // prevent accidental 180 degree turn when user change direction too fast
				setDirection("UP")
				break
			case "ArrowDown":
			case "s":
			case "S":
				if (direction === "UP") return // prevent 180 degree turn
				if (segments[0].x === segments[1].x) return // prevent accidental 180 degree turn when user change direction too fast
				setDirection("DOWN")
				break
			case "ArrowLeft":
			case "a":
			case "A":
				if (direction === "RIGHT") return // prevent 180 degree turn
				if (segments[0].y === segments[1].y) return // prevent accidental 180 degree turn when user change direction too fast
				setDirection("LEFT")
				break
			case "ArrowRight":
			case "d":
			case "D":
				if (direction === "LEFT") return // prevent 180 degree turn
				if (segments[0].y === segments[1].y) return // prevent accidental 180 degree turn when user change direction too fast
				setDirection("RIGHT")
				break
		}

		if (gameState === "PAUSED") {
			setGameState("PLAYING")
		}
	}

	const isSnakeEatingItself = () => {
		const segmentsWithoutHeadAndTail = segments.slice(
			1,
			segments.length - SNAKE_TAIL_LENGTH
		)

		if (segmentsWithoutHeadAndTail.length <= 1) {
			return false
		}

		return segmentsWithoutHeadAndTail.some(
			(segment) =>
				segment.x === headCoordinate.x && segment.y === headCoordinate.y
		)
	}

	const isSnakeGoingToEatFoodNextFrame = () => {
		if (gameMode !== "CLASSIC") return false
		if (!food) return false

		switch (direction) {
			case "UP":
				return (
					headCoordinate.x === food.x &&
					headCoordinate.y - SEGMENT_SIZE === food.y
				)
			case "DOWN":
				return (
					headCoordinate.x === food.x &&
					headCoordinate.y + SEGMENT_SIZE === food.y
				)
			case "LEFT":
				return (
					headCoordinate.x - SEGMENT_SIZE === food.x &&
					headCoordinate.y === food.y
				)
			case "RIGHT":
				return (
					headCoordinate.x + SEGMENT_SIZE === food.x &&
					headCoordinate.y === food.y
				)
		}
	}

	const getSnakeCollisionTargetAvatar = () => {
		if (gameMode !== "MEET_TEAM") return undefined

		return (
			members.find((member) => {
				const isXColliding =
					headCoordinate.x >= member.coordinates.x &&
					headCoordinate.x <= member.coordinates.x + AVATAR_SIZE
				const isYColliding =
					headCoordinate.y >= member.coordinates.y &&
					headCoordinate.y <= member.coordinates.y + AVATAR_SIZE
				return isXColliding && isYColliding
			})?.name || undefined
		)
	}

	const handleFrameUpdate = () => {
		let newSegmentCoordinates: Coordinate[] | undefined

		if (isSnakeEatingItself()) {
			setGameState("GAME_OVER")
			return
		}

		if (food && isSnakeGoingToEatFoodNextFrame()) {
			setSegments([food, ...segments])
			setFood(undefined)
			return
		}

		const collidedAvatar = getSnakeCollisionTargetAvatar()
		if (collidedAvatar && !isCollidingWithAvatar) {
			setIsCollidingWithAvatar(true)
			setGameState("PAUSED")
			setCollidedMember(collidedAvatar)
			return
		} else if (collidedAvatar && isCollidingWithAvatar) {
			setCollidedMember("")
		} else if (!collidedAvatar && isCollidingWithAvatar) {
			setIsCollidingWithAvatar(false)
		}

		switch (direction) {
			case "UP":
				if (isTouchingTopBoundary) {
					if (isOnLeftSide) {
						setDirection("RIGHT")
					} else {
						setDirection("LEFT")
					}
				} else {
					newSegmentCoordinates = moveSnake.up(segments)
				}
				break
			case "DOWN":
				if (isTouchingBottomBoundary) {
					if (isOnLeftSide) {
						setDirection("RIGHT")
					} else {
						setDirection("LEFT")
					}
				} else {
					newSegmentCoordinates = moveSnake.down(segments)
				}
				break
			case "LEFT":
				if (isTouchingLeftBoundary) {
					if (isOnTopSide) {
						setDirection("DOWN")
					} else {
						setDirection("UP")
					}
				} else {
					newSegmentCoordinates = moveSnake.left(segments)
				}
				break
			case "RIGHT":
				if (isTouchingRightBoundary) {
					if (isOnTopSide) {
						setDirection("DOWN")
					} else {
						setDirection("UP")
					}
				} else {
					newSegmentCoordinates = moveSnake.right(segments)
				}
				break
		}

		if (!newSegmentCoordinates) return
		setSegments(newSegmentCoordinates)
	}

	const resetGame = () => {
		setSegments(INITIAL_SPAWN_COORDINATES)
		setFood(undefined)
		setDirection(INITIAL_DIRECTION)
	}

	useEffect(() => {
		if (!food) {
			setFood(spawnFoodRandom())
		}
	}, [food])

	useInterval(handleFrameUpdate, gameState === "PLAYING" ? SPEED : null)

	return { segments, food, handleKeydown, resetGame }
}
