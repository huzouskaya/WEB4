export function randInt(a,b) {
    return a + Math.floor((b-a) * Math.random());
}

export function debounce(fn, delay) {
    let id;
    return (...args) => {
        if (id) clearTimeout(id);
        id = setTimeout(() => {
            fn(...args);
        }, delay)
    }
}

export function randEl(list) {
    const i = randInt(0, list.length);
    return list[i];
}

export function distance(u, v) {
    return Math.sqrt(Math.pow(u.x - v.x, 2) + Math.pow(u.y - v.y, 2));
}