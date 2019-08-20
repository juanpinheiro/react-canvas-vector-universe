import Vector2 from "./Vector2";

export default class Physics {
    position: Vector2;
    acceleration: Vector2;
    velocity: Vector2;

    constructor() {
        this.position = new Vector2();
        this.acceleration = new Vector2();
        this.velocity = new Vector2();
    }
}