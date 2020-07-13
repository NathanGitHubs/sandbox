// intersect of unions

type one = number | string;
type two = boolean | string;
type intersect = one & two;
let intersect: intersect;
intersect = 'string';
//intersect = 42;
//intersect = false;

// intersection of singles

// intersection of JSON object
type A = {
    name: string
}
type B = {
    age: number
}

type AB = A & B;

let ab: AB;
ab = {
    name: 'tony',
    age: 42
}

// intersection of function
type fa = (r: number) => [boolean];
type fb = (x: number, y: number) => [number];
type faFB = fa & fb;

let fafb: faFB;
fafb = (): any => {
    return [true, 42];
}

console.log(fafb(1));
console.log(fafb(1, 2));
// console.log(fafb('hello'));
//console.log(fafb(1,2,3));

// union of class
class AClass {
    name!: string
}

class BClass {
    age!: number

    shout() {
        console.log(`shout ${this.age}`);
    }
}

class CClass {
    name!: number
}

type ABClass = AClass & BClass;

let abClass: ABClass;

const abJson = {
    name: 'tony',
    age: 42,
    shout() {
    }
};

abClass = {
    name: 'tony',
    age: 42,
    shout() {
    }
};

abClass.shout();
console.log(typeof abClass);

let bClass = new BClass();
bClass.age = 42;
console.log(bClass instanceof AClass);

console.log(abClass instanceof AClass);
console.log(abClass instanceof BClass);
console.log(typeof abClass);


