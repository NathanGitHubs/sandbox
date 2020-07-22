let map = new Map();
let symbol = Symbol();
map.set('hello', 42);
map.set(symbol, 34);
// m.get(s) === 34
// m.size === 2
let key = {
    name: 'foo'
};
let value = {
    age: 42
};
map.set(key, value);
for (let entry of map.entries()) {
    console.log('length:', entry.length);
    const [key, val] = entry;
    console.log(key, val);
}

console.log(map.get('hello'));
console.log(map.get('bar'));

let notKey = {
    name: 'foo'
};
console.log(map.get(notKey));
console.log(map.get(key));

interface IPlayer {
    name: string
}

interface IWeapons {
    weaponName: string
}

const weapons = new Map<IPlayer, IWeapons[]>();
// const player = 'hello';
const player: IPlayer = {
    name: 'bar'
};

// const weapon = [1,2,3,4];
const weapon: IWeapons[] = [
    {weaponName: 'quux'},
    {weaponName: 'que'}
];
weapons.set(player, weapon);
for (let entry of weapons.entries()) {
    console.log('length:', entry.length);
    const [key, val] = entry;
    console.log(key, val);
}

weapons.forEach((x, y) => {
    console.log('key:', y, 'value:', x);
});
console.log('size:', weapons.size);

weapons.delete(player);

weapons.forEach((x, y) => {
    console.log('key:', y, 'value:', x);
});
console.log('size:', weapons.size);
