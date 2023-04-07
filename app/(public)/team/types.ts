type GameMode = "MEET_TEAM" | "CLASSIC"

type GameState = "PLAYING" | "PAUSED" | "GAME_OVER"

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT"

interface Coordinate {
	x: number
	y: number
}

export type { GameMode, GameState, Direction, Coordinate }
