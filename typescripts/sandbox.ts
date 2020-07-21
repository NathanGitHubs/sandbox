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

