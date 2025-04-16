// import { ctx, canvas } from "../canvas.js";
import { distance } from "../helper.js";
import { Asteroid } from "./Asteroid.js";

export class Lazer {

    static list = [];

    constructor({pos, rotation, initialVel }, ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.pos =pos;
        this.rotation = rotation;
        this.speed = 15;
        this.vel = {
            x: initialVel.x + this.speed * Math.cos(rotation),
            y: initialVel.y + this.speed * Math.sin(rotation)
        }
        this.asteroidsDestroyed = 0;
        Lazer.list.push(this);
    }

    draw() {
        this.ctx.entity.save();
        this.ctx.entity.fillStyle = "rgb(247, 77, 210)";
        this.ctx.entity.shadowBlur = 10;
        this.ctx.entity.shadowColor = "rgb(249, 117, 221)";
        this.ctx.entity.translate(this.pos.x, this.pos.y);
        this.ctx.entity.rotate(this.rotation);
        this.ctx.entity.fillRect(0, -2, 40, 5);      
        this.ctx.entity.fillRect(0, -0.5, 40, 1);
        this.ctx.entity.restore();
    }

    update(ship) {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        this.removeIfOutside();
        this.destroyAsteroids(ship);
    }

    removeIfOutside() {
        if (this.pos.x < 0 || this.pos.y < 0 ||
            this.pos.x > this.canvas.star1.width ||
            this.pos.y > this.canvas.star1.height
        ) {
            this.remove();
        }
    }

    remove() {
        Lazer.list = Lazer.list.filter((l) => l != this);
    }

    destroyAsteroids(ship) {
        Asteroid.list.forEach(asteroid => {
            if (distance(this.pos, asteroid.drawPos) < asteroid.size/2) {
                ship.score += asteroid.score;
                asteroid.destroyed = true;
                //ship.showScore();
                ship.asteroidsDestroyed += 1;
                this.remove();
            }
        })
    }
}