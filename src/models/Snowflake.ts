import Physics from "./Physics";
import Vector2 from "./Vector2";
import { randomBetween } from "helper";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "settings";

export default class Snowflake extends Physics {
    radius: number;
    alpha: number;

    constructor() {
        super();

        this.position = new Vector2(randomBetween(0, CANVAS_WIDTH), randomBetween(0, CANVAS_HEIGHT));
        this.acceleration = new Vector2();
        this.velocity = new Vector2(randomBetween(-0.3, 0.3), randomBetween(0.3, 1));
        this.radius = randomBetween(1, 4);
        this.alpha = randomBetween(0.1, 0.9);
    }

    applyForce = (force: Vector2) => {
        this.acceleration.increment(force);
    }

    render = () => {
        this.position.increment(this.velocity);
        this.velocity.increment(this.acceleration);
        this.acceleration.scale(0);

        if (this.position.x > CANVAS_WIDTH) {
            this.position.x = 0;
        } else if (this.position.y > CANVAS_HEIGHT) {
            this.position.y = 0;
        } else if (this.position.x < 0) {
            this.position.x = CANVAS_HEIGHT;
        } else if (this.position.y < 0) {
            this.position.y = 0;
            this.velocity = new Vector2(randomBetween(-0.3, 0.3), randomBetween(0.3, 1));
            this.acceleration = new Vector2();
        }
      
    }
}