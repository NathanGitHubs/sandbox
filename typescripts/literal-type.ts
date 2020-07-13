type Animal = {
    caption: 'animal'
}

const animal: Animal = {
    caption: 'animal'
}

console.log('animal', animal);

let literal1: 'male' | 'female' | number | {
    name: string
    age: number
};

literal1 = 'male';
console.log('literal', literal1);

literal1 = 'female';
console.log('literal', literal1);

literal1 = 42;
console.log('literal', literal1);

literal1 = {
    name: 'poo',
    age: 42
};
console.log('literal', literal1);



















