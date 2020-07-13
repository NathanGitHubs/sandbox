//
const shoutArray = ([first, second, ...remaining]: number[]): void => {
    console.log('text:', first, second, remaining);
};

const arr6: number[] = [1, 2, 3, 4, 5];
shoutArray(arr6);

// object
const o1 = {
    title: 'tony',
    gender: 'male'
};

const o2 = {
    title: 'nathan',
    occupation: 'student'
};

const o3 = {
    title: 'tiffani',
    age: 42
};

const shoutText = (text: string): void => {
    console.log('text:', text);
};

shoutText('bar');

const shout = ({title, ...remaining}: { title: any }): void => {
    console.log('title:', title, remaining);
};

shout(o1);
