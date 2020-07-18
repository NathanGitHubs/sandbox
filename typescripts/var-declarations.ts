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