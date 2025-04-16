import { distance, randEl, randInt } from "../helper.js";
import { a_l, a_m, a_s } from "../images.js";
// import { canvas, ctx } from "../canvas.js";
import { showScreen } from "../screen.js";

export class Asteroid {
    static list = [];

    static SIZE = {
        s: 32,
        m: 64,
        l: 128,
    };

    static FRAME_COUNT = {
        s: 60,
        m: 60,
        l: 120
    };

    static SCORE = {
        s: 5,
        m: 2,
        l: 1
    };

    static IMAGE = {
        "asteroid-l": a_l,
        "asteroid-m": a_m,
        "asteroid-s": a_s
    }

    // static interval = null;

    // static startGenerating(frequency = 300) {
    //     Asteroid.interval = setInterval(() => new Asteroid(), frequency);
    // }

    // static stopGenerating() {
    //     clearInterval(Asteroid.interval);
    // }

    static removeAll() {
        Asteroid.list = [];
    }

    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.type = randEl(["s", "l", "m"]);
        this.name = "asteroid-" + this.type;
        this.image = Asteroid.IMAGE[this.name];
        this.score = Asteroid.SCORE[this.type];

        this.size = Asteroid.SIZE[this.type];
        this.frameCount = Asteroid.FRAME_COUNT[this.type];

        const startSide = randEl(["left", "right", "top", "bottom"]);

        switch(startSide) {
            case "left":
                this.pos = {
                    x: -this.size/2,
                    y: randInt(0, this.canvas.star1.height)
                };
                this.vel = { x: randInt(1, 4), y: randInt(-4, 5) };
                break;
            case "right":
                this.pos = {
                    x: this.canvas.star1.width + this.size/2,
                    y: randInt(0, this.canvas.star1.height)
                };
                this.vel = { x: -randInt(1, 4), y: randInt(-4, 5) };
                break;
            case "top":
                this.pos = {
                    x: randInt(0, this.canvas.star1.width),
                    y: -this.size / 2,
                };
                this.vel = { x: randInt(-4, 5), y: randInt(1, 4) };
                break;
            case "bottom":
                this.pos = {
                    x: randInt(0, this.canvas.star1.width),
                    y: this.canvas.star1.height + this.size / 2,
                };
                this.vel = { x: randInt(-4, 5), y: -randInt(1, 4) };
                break;
        }

        this.drawPos = { x: 0, y: 0 };
        this.animationTimer = 0;

        this.parallax = 1;
        this.destroyed = false;

        Asteroid.list.push(this);
    }

    update(ship) {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        this.animationTimer++;
        if (this.animationTimer >= this.frameCount) {
            this.animationTimer = 0;
        }
        this.drawPos = {
            x: this.pos.x - this.parallax * ship.pos.x,
            y: this.pos.y - this.parallax * ship.pos.y,
        }

        if (this.destroyed) {
            this.vel = { x: 0, y: 0 };
            this.size *= 0.8;
            if (this.size <= 1) {
                this.remove();
            }
        }
        this.destroyShip(ship);
        this.removeIfOutside();
    }

    draw() {
        this.ctx.entity.save();
        this.ctx.entity.translate(this.drawPos.x, this.drawPos.y);
        this.ctx.entity.drawImage(this.image, 
            this.animationTimer * Asteroid.SIZE[this.type],
            0,
            Asteroid.SIZE[this.type],
            Asteroid.SIZE[this.type],
            -this.size / 2,
            -this.size / 2,
            this.size,
            this.size
        );

        this.ctx.entity.restore();
    }

    removeIfOutside() {
        if (this.pos.x + this.size/2 < 0 || 
            this.pos.y + this.size/2 < 0 ||
            this.pos.x > this.canvas.star1.width + this.size/2 ||
            this.pos.y > this.canvas.star1.height + this.size/2) {
                this.remove();
            }
    }

    remove() {
        Asteroid.list = Asteroid.list.filter(a => a != this);
    }

    destroyShip(ship) {
        if (
            !ship.destroyed &&
            distance(ship.pos, this.drawPos) <
                ship.size.x / 2 + this.size / 2
        ) {
            ship.destroyed = true;
            ship.rotationForce = randEl([+1, -1]) * 0.2;
            showScreen("gameover");
        } 
    }
}