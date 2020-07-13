// union of value type
type combinedOne = number | string;
type combinedTwo = boolean | string;
type combinedThree = combinedOne | {};

type union = combinedOne | combinedTwo;
let union: union = 42;
union = 'string';
union = false

// union of JSON object
type A = {
    name: string
}
type B = {
    age: number
}

type AB = A | B;

let ab: AB;
ab = {
    name: 'tony'
}
ab = {
    age: 42
};
ab = {
    name: 'tony',
    age: 42
};
ab = {
    //animal: 'dog',
    age: 42,
    name: 'tony'
}

// union of function
type fa = (r: number) => boolean;
type fb = (x: number, y: number) => number;
type faFB = fa | fb;

let fa: fa = (...args: any[]): boolean => {
    console.log('args', args);
    return false;
}

console.log(fa(42));

let fafb: faFB = (...args: any[]): number => {
    console.log('args', args);
    return 42;
};
fafb(8, 12);
// fafb(8, 12, 3);


// union of class
class AClass {
    name!: string
}

class BClass {
    age!: number
}

class CClass {
    name!: number
}

type ABClass = AClass | BClass;

let abClass: ABClass;
abClass = new AClass();
abClass = new BClass();
//abClass = new CClass();


