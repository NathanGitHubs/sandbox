function identity<T extends { name: string }>(arg: T): string {
    return `hello ${arg.name}.`;
}

let id = identity({
    name: 'foo',
    age: 42
});
console.log('identity', id);

function identity2(arg: { name: string }): string {
    return `hello ${arg.name}.`;
}

let id2 = identity2({
    name: 'foo',
    // age: 42
});
console.log('identity2', id2);

type X = { name: string };
type Y = { age: number };

function identity3<T extends X, U extends Y>(arg: T): U {
    return arg as unknown as U;
}

let id3 = identity3({
    name: 'foo',
    age: 42
});
console.log('identity3', id3);

id3.age = 4;
// id3.name = 'bar' bc we casted the return into a type U that is an obj with only {name: string} (type Y which has no name property)
console.log('identity3', id3);

// @ts-ignore
id3.name = 'bar';
// @ts-ignore
id3.gender = 'male';
console.log('identity3', id3);

abstract class HeroBase {
    protected constructor(public health: string) {
    }

    abilities: string[] = [];

    doNothing() {
    }
}

// const hero = new HeroBase('100'); not allowed bc constructor protected and class is abstract

// Non-Generic/Normal Functions
function displayHealth(hero: HeroBase): string {
    return hero.health;
}

console.log(displayHealth);
const d1 = displayHealth({
    health: '150',
    abilities: [],
    // unknown: 42 - extra properties are not allow unless you use generics
    doNothing() {
    },
    //doExtra() {} - extra methods/functions are not allow unless you use generics
});
console.log('d1', d1);

// Generic functions
function displayHealthGeneric<T extends HeroBase>(hero: T): string {
    return hero.health;
}

const d2 = displayHealthGeneric({
    health: '150',
    abilities: [],
    unknown: 42,
    doNothing() {
    },
    doExtra() {
    } // extra methods/functions are allowed bc duck punching is allowed in generics
});
console.log('d2', d2);

type AAA = {
    health: string;
    shield: number;
    getTimeLeft(matchTime: number): number;
}

function displayHealthByHealth<T extends AAA>(hero: T): string {
    const timeLeft = hero.getTimeLeft(42);
    return `health: ${hero.health}, shield: ${hero.shield}, time left: ${timeLeft}`;
}

const d3 = displayHealthByHealth({
    //members that match AAA type
    health: '150',
    shield: 50,
    // getTimeLeft(){
    //   const a = arguments;
    //   console.log('arguments', a);
    //   const [matchTime, ...restArgs] = a;
    //   console.log('matchTime, restArgs', matchTime, restArgs);
    //   return 1042 + matchTime;
    // },
    getTimeLeft(matchTime) {
        return 1042 + matchTime;
    },
    // extra members outside of AAA type
    abilities: [],
    unknown: 42,
    doNothing() {
    },
    doExtra() {
    } // extra methods/functions are allowed bc duck punching is allowed in generics
});
console.log('d3', d3);

function merge<T, U>(obj1: T, obj2: U): T & U {
    return Object.assign(obj1, obj2);
}

const mergedObj = merge({name: 'foo', age: 42}, {name: 'bar', gender: 'male'});
console.log('mergedObj:', mergedObj);

interface ICharacter {
    caption: string;
    age: number;
}

// function gameCharacterMerge<T extends ICharacter>(character1: T, character2: T): T{
function gameCharacterMerge(character1: ICharacter, character2: ICharacter): ICharacter {
    return merge(character1, character2);
}

const a1: ICharacter = {
    caption: 'string',
    // name: 'a1'
    age: 42
}

const a2 = {
    caption: 'string',
    name: 'a2',
    age: 42
}

const a3 = gameCharacterMerge(a1, a2);
console.log('a3', a3);

interface I2Character {
    caption: string;
    age: number;
}

class Agent implements I2Character {
    caption!: 'string';
    name!: string;
    age!: 42;
}

const b1: Agent = new Agent();
b1.age = 42;
b1.name = 'foo'
// b1.caption = 'agent 1'
console.log('b1', b1.caption);

// let b2: Agent = new Agent();
// b2.age = 42;
// b2.name = 'bar';
// b2.caption = 'string';

let b2: I2Character = {
    age: 42,
    // name: 'bar',
    caption: 'string',
    // gender: 'male'
}

// function gameCharacterMerge2<T extends I2Character>(character1: T, character2: T): T{
function gameCharacterMerge2(character1: I2Character, character2: I2Character): I2Character {
    return merge(character1, character2);
}

const b3 = gameCharacterMerge2(b1, b2);
console.log('b3', b3);
