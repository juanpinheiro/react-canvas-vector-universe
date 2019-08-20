import { CANVAS_WIDTH, CANVAS_HEIGHT } from "settings";

/*
    Representation of 2D vectors and points.
    This structure is used in some places to represent 2D positions and vectors.

    Documentation: https://docs.unity3d.com/ScriptReference/Vector2.html
*/

export default class Vector2 {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    up = () => this.y++;
    down = () => this.y--;
    left = () => this.x--;
    right = () => this.x++;
    
    increment = (vector: Vector2) => {
        this.x += vector.x;
        this.y += vector.y;
    }

    decrement = (vector: Vector2) => {
        this.x -= vector.x;
        this.y -= vector.y;
    }

    multiply = (vector: Vector2) => {
        this.x *= vector.x;
        this.y *= vector.y;
    }

    static normalized = (vector: Vector2) => {
        const midpointX = CANVAS_WIDTH / 2;
        const midpointY = CANVAS_HEIGHT / 2;

        return {
            x: (vector.x - midpointX) / midpointX,
            y: (vector.y - midpointY) / midpointY
        }
    }
}