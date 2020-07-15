interface IGod {
    name?: string;
    readonly age: number;
    title: string;

    yell(): void;
}

const god: IGod = {
    age: 0,
    name: "",
    title: "",
    yell(): void {
    }

}

class God implements IGod {
    readonly name?: string;
    age: number = 42;
    readonly title!: string;

    yell(): void {
    }

    classProp!: boolean;

    classMethod(): void {
    };
}

const godgod: God = new God();
godgod.age = 81;
//godgod.name = 'tony'; not allowed because of the constraint is to the class God which name is readonly

const godgodgod: IGod = new God();
//godgodgod.age = 52; not allowed because of the constraint is to the interface IGod which age is readonly
godgodgod.name = 'tony';

console.log('god, godgod, godgodgod', god, godgod, godgodgod);