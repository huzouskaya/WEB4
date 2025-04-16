export const canvas = {
    entity: document.getElementById("entityCanvas"),
    star1: document.getElementById("star1Canvas"),
    star2: document.getElementById("star2Canvas"),
    star3: document.getElementById("star3Canvas"),
};

export const ctx = {
    entity: canvas.entity.getContext("2d"),
    star1: canvas.star1.getContext("2d"),
    star2: canvas.star2.getContext("2d"),
    star3: canvas.star3.getContext("2d"),
};

export default function makeCanvasesFullScreen() {
    makeCanvasFullScreen(canvas.entity);
    makeCanvasFullScreen(canvas.star1, 2);
    makeCanvasFullScreen(canvas.star2, 2);
    makeCanvasFullScreen(canvas.star3, 2);
}

function makeCanvasFullScreen(canv, factor=1) {
    canv.width = window.innerWidth * factor;
    canv.height = window.innerHeight * factor;
}

export default function clearCanvas(key) {
    ctx[key].clearRect(0, 0, canvas[key].width, canvas[key].height);
}