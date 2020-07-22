let sss = new Set<string>();
sss.add('hello').add('goodbye').add('hello');
// s.size === 2
// s.has("hello") === true
for (let value of sss.values()) {
    // insertion order
    console.log('item.value', value);
}
console.log(sss);

//power up an iterator for enumeration/iteration
let iterator = sss.values();

//get first entry:
let firstItem = iterator.next();
if (!firstItem.done) {
//get value out of the iterator entry:
    let value1 = firstItem.value;
    console.log('firstItem:', value1, firstItem); //1
}

//get second entry:
let secondItem = iterator.next();
if (!secondItem.done) {
//get value out of the iterator entry:
    let value2 = secondItem.value;
    console.log('secondItem:', value2, secondItem); //1
}

//get third entry:
let thirdItem = iterator.next();
if (!thirdItem.done) {
//get value out of the iterator entry:
    let value3 = thirdItem.value;
    console.log('thirdItem:', value3, thirdItem); //1
}

//get fourth entry:
let fourthItem = iterator.next();
if (!fourthItem.done) {
//get value out of the iterator entry:
    let value4 = fourthItem.value;
    console.log('fourthItem:', value4, fourthItem); //1
}

let numbers: any[] = [11, 22, 11, 22, 42];
let numberSet = new Set(numbers);
for (let value of numberSet.values()) {
    // insertion order
    console.log('item.value', value);
}
console.log(numberSet);
const hh = {
    age: 100
};
numberSet.add(hh);
numberSet.forEach((x) => {
    console.log('x:', x);
});
console.log('size:', numberSet.size);

numberSet.delete(hh);
numberSet.forEach((x) => {
    console.log('x:', x);
});
console.log('size:', numberSet.size);

numberSet.clear();
numberSet.forEach((x) => {
    console.log('x:', x);
});
console.log('size:', numberSet.size);