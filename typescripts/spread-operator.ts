let arr1: number[] = [1, 2, 3, 4, 5];
let arr2: number[] = [10, 20, 30];
let arr3: number[] = [...arr1, ...arr2];

console.log('arr3:', arr3);

const lawyer = {
    name: 'lawyer',
    yell() {
    }
};

const doctor = {
    age: 42,
    greeting() {
    }
};

const combinedLD = {
    ...lawyer,
    ...doctor,
    title: 'doctor lawyer',
    doNothing() {
    }
};

console.log('combinedLD:', combinedLD);

//advanced
const [first, second, ...rip] = arr1;
console.log('first, second, rip:', first, second, rip);

let arr4: number[] = [...rip, ...arr2];
console.log('arr4:', arr4);

let {age, greeting, ...remaining} = doctor;
console.log('age, greeting, remaining,', age, greeting, remaining);

const newCombinedLD = {
    ...lawyer,
    ...remaining,
    title: 'doctor lawyer',
    doNothing() {
    }
};
console.log('newCombinedLD:', newCombinedLD);
