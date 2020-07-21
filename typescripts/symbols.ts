let MY_KEY = Symbol('nathan-symbol');
let obj = {};
// @ts-ignore
obj[MY_KEY] = 123;
// @ts-ignore
console.log(obj[MY_KEY]);
console.log(obj);

let object2 = {
    [MY_KEY]: 42
}
// @ts-ignore
console.log(object2, object2[MY_KEY]);

enum BoxColor {
    blue
}
enum ShirtColor {
    blue
}

const box = {
    color: BoxColor.blue
}

const shirt = {
    color: ShirtColor.blue
}

// console.log(shirt.color === box.color);