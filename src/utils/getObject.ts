export const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}



function randomKey(len: number) {
    return new Array(len).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
}

export const generateObject = (breadth: number, depth: number) => {
    const len = 16;

    if (depth == 0) {
        const v = Math.random();

        if (v < .3) {
            // boolean
            return Math.floor(Math.random() % 2) == 0;
        } else if (v < .6) {
            // Number
            return Math.random();
        } else {
            // String
            return randomKey(len);
        }
    }

    const r = {} as any;

    for (let i = 0; i < breadth; i++) {
        r[randomKey(len)] = generateObject(breadth, depth - 1);
    }

    return r;
}