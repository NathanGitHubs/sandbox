let sss: Set<string> = new Set<string>();
sss.add('hello').add('goodbye').add('hello');
// s.size === 2
// s.has("hello") === true
for (const value of sss.values()) {
    // insertion order
    console.log('item.value', value);
}
console.log(sss);

// power up an iterator for enumeration/iteration
let iterator: IterableIterator<string> = sss.values();

// get first entry:
let firstItem: IteratorResult<string, string> = iterator.next();
if (!firstItem.done) {
// get value out of the iterator entry:
    const value1: string = firstItem.value;
    console.log('firstItem:', value1, firstItem); // 1
}

// get second entry:
let secondItem: IteratorResult<string, string> = iterator.next();
if (!secondItem.done) {
// get value out of the iterator entry:
    const value2: string = secondItem.value;
    console.log('secondItem:', value2, secondItem); // 1
}

// get third entry:
let thirdItem: IteratorResult<string, string> = iterator.next();
if (!thirdItem.done) {
// get value out of the iterator entry:
    const value3: string = thirdItem.value;
    console.log('thirdItem:', value3, thirdItem); // 1
}

// get fourth entry:
let fourthItem: IteratorResult<string, string>  = iterator.next();
if (!fourthItem.done) {
// get value out of the iterator entry:
    const value4: string = fourthItem.value;
    console.log('fourthItem:', value4, fourthItem); // 1
}

let numbers: any[] = [11, 22, 11, 22, 42];
let numberSet: Set<number> = new Set(numbers);
for (const value of numberSet.values()) {
    // insertion order
    console.log('item.value', value);
}
console.log(numberSet);
const hh: any = {
    age: 100
};
numberSet.add(hh);
numberSet.forEach((x: number): void => {
    console.log('x:', x);
});
console.log('size:', numberSet.size);

numberSet.delete(hh);
numberSet.forEach((x: number): void => {
    console.log('x:', x);
});
console.log('size:', numberSet.size);

numberSet.clear();
numberSet.forEach((x: number): void => {
    console.log('x:', x);
});
console.log('size:', numberSet.size);
