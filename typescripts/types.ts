/*
const variable; type = ????

number
boolean
string
void
any
never
null
undefined

*/
enum gender {
    male,
    female
}

console.log('gender.female =', gender.female);

enum icecream {
    vanilla = 'vanilla',
    chocolate = 'chocolate',
    strawberry = 'strawberry'
}

console.log('icecream:', icecream);
console.log('icecream.chocolate:', icecream.chocolate);

interface IIdentity {
    fullName: string
}

class Person {
    constructor(public address: string) {
    }
}

const tuple: [number, boolean] = [42, true];

// function
function noAssignment1(p: number) {
    console.log('p', p);
}

noAssignment1(42);

const noAssignment2: (p: number) => void = function (p: number) {
    console.log('p', p);
};
noAssignment2(42);

const noAssignment3: (p: number) => void = (p: number): void => {
    console.log('p', p);
};
noAssignment3(42);

// literal type
let literal: 'male' | 'female' | number | {
    name: string
    age: number
};

literal = 'male';
console.log('literal', literal);

literal = 'female';
console.log('literal', literal);

literal = 42;
console.log('literal', literal);

literal = {
    name: 'poo',
    age: 42
};
console.log('literal', literal);