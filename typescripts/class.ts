class Employee {
    'name': string;

    age!: number;

    readonly power: number = 6;

    private _title: string = '';
    set title(value: string) {
        this._title = value;
    }

    get title(): string {
        return this._title;
    }

    constructor(public gender: string, readonly id: number) {
    }
}

const employee = new Employee('female', 1);
employee.name = 'tony';
employee.age = 42;
employee.title = 'dr';

// employee.power = 7;
// employee.id = 2;

console.log('', employee.name, employee.age, employee.title, employee.gender, employee.id, employee.power);

/* overwrite property */
abstract class Character {
    health!: number;

    protected constructor(public armor: number) {
    }

    static version: string = 'version 3.1';

    static random() {
        return -1;
    }

    greeting(): void {
        console.log('greetings, my health is:', this.health);
    }

    abstract makeNoise(value: boolean): string;
}

class Dva extends Character {
    // health: number = 1000;

    constructor(public weapon: string, armor: number) {
        super(armor);
    }

    static random() {
        return Character.random() + 9;
    }

    makeNoise(value: boolean): string {
        return value.toString();
    }
}

// const character = new Character(10);
const dva = new Dva('bunny blaster', 150);
console.log(Character.version, Character.random());

// console.log(Character.version);
console.log(Dva.version, Dva.random(), dva.health);

/*******************************
*
* Computed property name
* Computed method name
*
********************************/
const quux = (): string => {
    return 'quux';
};

let objectA = {
    foo: 'bar',
    ['baz' + quux()]: 42
};

console.log('objectA:', objectA);

