import { Coordinate, Direction, GameState } from "./types"

const SPEED = 50 // ms; This will be passed to setInterval, so the lower the faster
const SEGMENT_SIZE = 5 // px; How many pixels each snake segment or food will take
const CANVAS_WIDTH = 800 // px; Internal canvas width
const CANVAS_HEIGHT = 400 // px; Internal canvas height
const AVATAR_SIZE = 50 // px
const INITIAL_SPAWN_COORDINATES: Coordinate[] = [
	{ x: CANVAS_WIDTH / 3, y: CANVAS_HEIGHT / 2 },
	{ x: CANVAS_WIDTH / 3 - SEGMENT_SIZE, y: CANVAS_HEIGHT / 2 },
	{ x: CANVAS_WIDTH / 3 - SEGMENT_SIZE * 2, y: CANVAS_HEIGHT / 2 },
	{ x: CANVAS_WIDTH / 3 - SEGMENT_SIZE * 3, y: CANVAS_HEIGHT / 2 },
	{ x: CANVAS_WIDTH / 3 - SEGMENT_SIZE * 4, y: CANVAS_HEIGHT / 2 },
] // px; Where the snake will spawn
const INITIAL_DIRECTION: Direction = "RIGHT"
const INITIAL_GAME_STATE: GameState = "PAUSED"
const SNAKE_TAIL_LENGTH = 2 // SEGMENT_SIZE; This will act as afterimage of movement
const MEMBER_PORTRAIT_COORDINATES: Coordinate[] = [
	{ x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2 },
	{ x: CANVAS_WIDTH / 3, y: CANVAS_HEIGHT / 3 },
]

export {
	SPEED,
	SEGMENT_SIZE,
	CANVAS_WIDTH,
	CANVAS_HEIGHT,
	AVATAR_SIZE,
	INITIAL_SPAWN_COORDINATES,
	INITIAL_DIRECTION,
	INITIAL_GAME_STATE,
	SNAKE_TAIL_LENGTH,
	MEMBER_PORTRAIT_COORDINATES,
}
