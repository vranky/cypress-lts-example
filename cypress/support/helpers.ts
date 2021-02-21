/// <reference types="Cypress" />

export function randomString(length: number) {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
}

export function getTime() {
    let now = new Date();
    return now.getTime();
}

export function randomNumber(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

//
// export const  roundUp: (num: number, precision: number) =>{
//         precision = Math.pow(10, precision);
//         return Math.ceil(num * precision) / precision;
//     },
//
// export const  randomItem(items: []) =>{
//         return items[items.length * Math.random() | 0];
//     }
