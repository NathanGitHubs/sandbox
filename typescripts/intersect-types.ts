// intersect of unions

type one = number | string;
type two = boolean | string;
type intersect = one & two;
let intersect: intersect;
intersect = 'string';
//intersect = 42;
//intersect = false;

type three = number & one;
let three: three = 42;
// three = 'foo'; an '&' will become an intersect if one or more are union types/combined types

type four = number & string;
//let four: four = never; 'never' is not a value of type never
// let four: four = 42; because nothing is in common between number and string(primitive types) the 'type four' is actually never

// intersection of singles
// intersection of JSON object
type AA = {
    name: string
}
type BB = {
    age: number
}

type AABB = AA & BB;

let aabb: AABB;
aabb = {
    name: 'tony',
    age: 42
}

// intersection of function
type ffaa = (r: number) => [boolean];
type ffbb = (x: number, y: number) => [number];
type ffaaFFBB = ffaa & ffbb;

let ffaaffbb: ffaaFFBB;
ffaaffbb = (): any => {
    return [true, 42];
}

console.log(ffaaffbb(1));
console.log(ffaaffbb(1, 2));
// console.log(fafb('hello'));
//console.log(fafb(1,2,3));

// union of class
class AAClass {
    name!: string
}

class BBClass {
    age!: number

    shout() {
        console.log(`shout ${this.age}`);
    }
}

class CCClass {
    name!: number
}

type AABBClass = AAClass & BBClass;

let aabbClass: AABBClass;

const abJson = {
    name: 'tony',
    age: 42,
    shout() {
    }
};

aabbClass = {
    name: 'tony',
    age: 42,
    shout() {
    }
};

aabbClass.shout();
console.log(typeof aabbClass);

let bClass = new BBClass();
bClass.age = 42;
console.log(bClass instanceof AAClass);

console.log(aabbClass instanceof AAClass);
console.log(aabbClass instanceof BBClass);
console.log(typeof aabbClass);



