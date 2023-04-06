type GameState = "PLAYING" | "PAUSED" | "GAME_OVER"

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT"

interface Coordinate {
	x: number
	y: number
}

export type { GameState, Direction, Coordinate }
