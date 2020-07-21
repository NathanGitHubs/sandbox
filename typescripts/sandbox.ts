// for (let i = 0; i < 10; i++) {
//     setTimeout(function () {
//         console.log(i);
//     }, 0);
// }
//
// for (var i = 0; i < 10; i++) {
//     // capture the current state of 'i'
//     // by invoking a function with its current value
//     (function (i) {
//         setTimeout(function () {
//             console.log(i);
//         }, 100 * i);
//     })(i);
// }

// const quux = (): string => {
//     return 'quux';
// };
//
// let obj = {
//     foo: 'bar',
//     ['baz' + quux()]: 42
// };
//
// console.log('obj:', obj);

let sss = new Set<string>();
sss.add('hello').add('goodbye').add('hello');
// s.size === 2
// s.has("hello") === true
for (let key of sss.values()) {
    // insertion order
    console.log(key);
}
console.log(sss);
let iterator = sss.values();
//get first entry:
let firstItem = iterator.next();
//get value out of the iterator entry:
let value = firstItem.value;
console.log('firstItem:', value, firstItem); //1

let secondItem = iterator.next();
let value2 = secondItem.value;
console.log('secondItem:', value2, secondItem);

let thirdItem = iterator.next();
let value3 = thirdItem.value;
console.log('thirdItem:', value3, thirdItem);

let fourthItem = iterator.next();
let value4 = fourthItem.value;
console.log('fourthItem:', value4, fourthItem);
