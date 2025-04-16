// import { canvas, ctx } from "../canvas.js";
import { Lazer } from "./Lazer.js";
// import { IMAGE } from "../images.js";

export class SpaceShip {
    constructor(canvas, ctx, image) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.image = image;
        this.size = {x:100, y:77};
        this.pos = {
            x: this.canvas.entity.width/2,
            y: this.canvas.entity.height/2
        };
        this.vel = {
            x: 0,
            y: 0,
        };
        this.force = {
            x: 0,
            y: 0,
        };
        this.friction = 0.99;
        this.maximalForce = 0.8;

        this.rotation = 0;
        this.rotationForce = 0;
        this.rotationVel = 0;
        this.rotationFriction = 0.95;
        this.rotationMaximalForce = 0.03;

        this.alpha = 1;

        this.score = 0;
        this.asteroidsDestroyed = 0;

        this.destroyed = false;

        this.addControls();
    }

    // showScore() {
    //     this.scoreDisplay.innerText = `Score: ${this.score}`;
    //     this.scoreEndDisplay.innerText = `Score: ${this.score}`;
    // }

    draw() {
        this.ctx.entity.save();
        this.ctx.entity.globalAlpha = this.alpha;
        this.ctx.entity.translate(this.pos.x, this.pos.y);
        this.ctx.entity.rotate(this.rotation);
        this.ctx.entity.drawImage(this.image, -this.size.x / 2, -this.size.y / 2);

        this.ctx.entity.restore();
    }

    update() {
        this.vel.x += this.force.x;
        this.vel.y += this.force.y;
        this.force.x = 0;
        this.force.y = 0;
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        this.vel.x *= this.friction;
        this.vel.y *= this.friction;

        this.rotationVel += this.rotationForce;
        this.rotationForce = 0;
        this.rotation += this.rotationVel;
        this.rotationVel *= this.rotationFriction;

        if (this.destroyed) {
            this.alpha *= 0.95;
            if (this.alpha < 0.1) {
                this.alpha = 0;
            }
        }

        this.handleTinyVel();
        this.boundToCanvas();
    }

    addControls() {
        window.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "ArrowRight":
                    this.turn({ direction: "right" });
                    break;
                case "d":
                    this.turn({ direction: "right" });
                    break;
                case "D":
                    this.turn({ direction: "right" });
                    break;
                case "ArrowLeft":
                    this.turn({ direction: "left" });
                    break;
                case "a":
                    this.turn({ direction: "left" });
                    break;
                case "A":
                    this.turn({ direction: "left" });
                    break;
                case "ArrowUp":
                    this.boost({ direction: "forwards" });
                    break;
                case "w":
                    this.boost({ direction: "forwards" });
                    break;
                case "W":
                    this.boost({ direction: "forwards" });
                    break;
                case "ArrowDown":
                    this.boost({ direction: "backwards" });
                    break;
                case "s":
                    this.boost({ direction: "backwards" });
                    break;
                case "S":
                    this.boost({ direction: "backwards" });
                    break;
                case " ":
                    if (!this.destroyed) this.shoot();
                    break;
            }
        })
    }

    boost({direction}) {
        if (this.destroyed) return;
        const sign = direction == "forwards" ? 1 : -1;
        this.force = { 
            x: this.maximalForce * sign * Math.cos(this.rotation), 
            y: this.maximalForce * sign * Math.sin(this.rotation),
        };
    }

    turn({direction}) {
        const sign = direction == "right" ? 1 : -1;
        this.rotationForce = sign * this.rotationMaximalForce; 
    }

    handleTinyVel(threshold = 0.01) {
        if (Math.abs(this.rotationVel) < threshold) {
            this.rotationVel = 0;
        }

        if (Math.abs(this.vel.x) < threshold) {
            this.vel.x = 0;
        }
        if (Math.abs(this.vel.y) < threshold) {
            this.vel.y = 0;
        }
    }

    boundToCanvas() {
        this.pos.x = Math.max(0, Math.min(this.canvas.entity.width, this.pos.x));
        this.pos.y = Math.max(0, Math.min(this.canvas.entity.height, this.pos.y));
    }

    shoot() {
        new Lazer({
            pos: { ...this.pos },
            initialVel: { ...this.vel },
            rotation: this.rotation,
        },
            this.ctx,
            this.canvas);
    }

    reset() {
        this.score = 0;
        this.asteroidsDestroyed = 0;
        this.destroyed = false;
        this.rotation = 0;
        this.rotationVel = 0;
        this.vel = { x: 0, y: 0 };
        this.alpha = 1;
    }

}
