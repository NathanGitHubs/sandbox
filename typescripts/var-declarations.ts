const age1: number = 42;
let foo: string = 'bar';

console.log(foo, age1);

// age = 42 not allowed bc of const keyword
foo = 'quack';

const person = {
    name: 'nathan',
}

// person = {
//     name: 'tony'
// } not allowed because of const keyword

person.name = 'tony';
console.log('person (ln#: 18)', person);
console.log('person name (ln#: 19)', person.name);

/* javascript var declarations
for (var i = 0; i < 10; i++) {
    setTimeout(function() {
        console.log(i);
    }, 100 * i);
}

for (var i = 0; i < 10; i++) {
    // capture the current state of 'i'
    // by invoking a function with its current value
    (function(i) {
        setTimeout(function() {
            console.log(i);
        }, 100 * i);
    })(i);
}
 */

// typescript fix for ln# 21
// for (let i = 0; i < 10; i++) {
//     setTimeout(function() {
//         console.log(i);
//     }, 100 * i);
// }

function f(x: number): number {
    let xx = 100;
    return xx * x;
}

function g(): number {
    let xx = 0; //xx is block scoped so we can re-declare it even tho it is declared in block f() ln# 40
    xx = xx + 10;
    return xx;
}

const numArr: number[] = [1, 2];
let [first1, second2] = numArr;
[first1, second2] = [second2, first1];
console.log('first1:', first1);
console.log('second2:', second2);

//destructure array to get elements in the middle of the array
let [, secondElement, , fourthElement] = [1, 2, 3, 4];

console.log('secondElement:', secondElement); // outputs 2
console.log('fourthElement:', fourthElement); // outputs 4

const object1 = {
    a: 'foo',
    b: 42
}

let {a: hello, b: world} = object1; // has to have a: and b: because it isn't type declaration but rather property rename
console.log('hello and world:', hello, world);

let {b: good, a: bye} = object1; // order in which you refer to members does not matter
console.log('good and bye:', good, bye);

function keepWholeObject(wholeObject: { a: string; b?: number }) {
    let {a, b = 1001} = wholeObject;
    console.log('a,b:', a, b);
}

// keepWholeObject({world: 142, hello: 'bar'}); // not allowed bc property names do not match
keepWholeObject({b: 142, a: 'bar'}); //order doesnt matter
keepWholeObject({ a: 'bar'});

