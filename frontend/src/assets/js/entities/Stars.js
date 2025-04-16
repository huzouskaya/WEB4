// import { canvas, ctx } from "../canvas.js";
import { randInt } from "../helper.js";

export class Stars {
    constructor(canvas, ctx) {
        this.ctx = ctx;
        this.canvas = canvas
        this.color = "rgb(242, 171, 222)";
        this.sizes = ["1", "2", "3"];
        this.list = {
            1: [],
            2: [],
            3: []
        };
        this.number = {
            1: 7000,
            2: 1000,
            3: 700,
        };
        this.alpha = {
            1: 0.5,
            2: 0.7,
            3: 0.8
        };
        this.parallax = {
            1: 0.75,
            2: 0.8,
            3: 0.85,
        };
        this.updateCanvas({
            x: this.canvas.entity.width / 2,
            y: this.canvas.entity.height / 2,
        });
        this.scale = 1;
        this.scaleVel = 0.00025;
    }

    generate() {
        for (const size of this.sizes) {
            this.list[size] = [];
            for (let i = 0; i < this.number[size]; i++) {
                const x = randInt(0, this.canvas[`star${size}`].width);
                const y = randInt(0, this.canvas[`star${size}`].height);
                this.list[size].push({x,y});
            }
        }
        
    }

    draw() {
        for (const size of this.sizes) {
            this.ctx[`star${size}`].globalAlpha = this.alpha[size];
            this.ctx[`star${size}`].fillStyle = this.color;
            this.list[size].forEach(({x,y}) => {
                this.ctx[`star${size}`].beginPath();
                this.ctx[`star${size}`].arc(x, y, size/2, 0, 2*Math.PI);
                this.ctx[`star${size}`].fill();
            });
        }
    }

    update(ship) {
        this.updateCanvas(ship.pos);
        this.updateScale();
    }

    updateScale() {
        this.scale += this.scaleVel;

        if (this.scale > 1.7 || this.scale < 1) {
            this.scaleVel *= -1;
        }
    }

    updateCanvas(pos) {
        for (const size of this.sizes) {
            const offset = {
                x: -this.parallax[size] * pos.x,
                y: -this.parallax[size] * pos.y
            }
            this.canvas[`star${size}`].style.transform = 
                `translateX(${offset.x}px)` +
                `translateY(${offset.y}px)` +
                `scale(${this.scale})`;
        }
        
    }
}