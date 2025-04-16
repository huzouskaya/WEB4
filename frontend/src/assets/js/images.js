export const IMAGE = {};

const names = [
    "ship", 
    "asteroid-l", 
    "asteroid-m", 
    "asteroid-s"];

export function preloadImages(callbackFunction) {
    function preloadImage(i) {
        if (i < names.length) {
            const img = new Image();
            img.onload = () => {
                preloadImage(i + 1);
            };
            img.onerror = () => {
                console.log("asteroid img error");
            };
            IMAGE[names[i]] = img;
            img.src = `./img/${names[i]}.png`;
        } else {
            callbackFunction();
        }
    }
    preloadImage(0);
}

export const a_l = new Image();
a_l.src = '/src/assets/img/asteroid-l.png';
a_l.onload = () => {
    a_l
};

export const a_m = new Image();
a_m.src = '/src/assets/img/asteroid-m.png';
a_m.onload = () => {
    a_m
};

export const a_s = new Image();
a_s.src = '/src/assets/img/asteroid-s.png';
a_s.onload = () => {
    a_s
};