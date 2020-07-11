const age: number = 42;
let foo: string = 'bar';

console.log(foo, age);

// age = 42 not allowed bc of const keyword
foo = 'quack';

const person = {
    name: 'nathan',
}

// person = {
//     name: 'tony'
// }

person.name = 'tony';
console.log('person (ln#: 18)', person);
console.log('person name (ln#: 19)', person.name);