// // @ts-ignore
// let x: (a: number) => number = (a: number) => 0;
// // @ts-ignore
// let y: (b: number, s: string) => number = (b: number, s: string) => 0;
//
// y = x; // OK because To check if x is assignable to y, we first look at the parameter list.
// // Each parameter in x must have a corresponding parameter in y with a compatible type
//
// // x = y; Error because y has a required second parameter that

let m: (age: number, caption: boolean) => { name: string; age: number } = (age: number, caption: boolean): { name: string; age: number } => {
    console.log(age, caption);
    return {
        name: 'M Alice',
        age: age
    };
};

let result: { name: string; age: number } = m(42, false);
console.log('result', result);

let n: (age: number) => { name: string; age: number; gender: string } = (age: number): { name: string; age: number; gender: string } => {
    return {
        name: 'N Alice',
        age: age,
        gender: 'caption.toString()'
    };
};

m = n;
// n = m;
result = m(142, false);
console.log('result:', result);

let result2: { name: string; age: number; gender: string } = n(42);
// console.log('result2',result2)

let myAdd: (x: number, y: number) => string = function (x: number, y: number): string {
    console.log('x y:', x, y);
    return 'foo';
};

enum EventType {
    Mouse,
    Keyboard
}

interface Events {
    timestamp: number;
}

interface MouseEvents extends Events {
    x: number;
    y: number;
}

interface KeyEvents extends Events {
    keyCode: number;
}

function listenEvent(eventType: EventType, iDontCare: (n: MouseEvents) => Events) {
    if (eventType === EventType.Mouse) {
        let e: MouseEvents = {
            timestamp: 42,
            x: 0,
            y: 1
        };
        iDontCare(e);
    }
}

// Unsound, but useful and common
const mm: (e: MouseEvents) => MouseEvents = (e: MouseEvents) => {
    console.log(e.x + ',' + e.y);
    return {
        timestamp: 42,
        x: 0,
        y: 1
    };
};

listenEvent(EventType.Mouse, mm); // not allowed because mm does not have the same signature of iDontCare()

// Undesirable alternatives in presence of soundness
const nn: (e: Events) => MouseEvents = (e: Events) => {
    console.log((e as MouseEvents).x + ',' + (e as MouseEvents).y);
    return {
        timestamp: 42,
        x: 0,
        y: 1
    };
};
listenEvent(EventType.Mouse, nn);

const oo: (e: Events) => MouseEvents = ((e: MouseEvents) => {
    console.log(e.x + ',' + e.y);
    return {
        timestamp: 42,
        x: 0,
        y: 1
    };
}) as (e: Events) => MouseEvents;
listenEvent(EventType.Mouse, oo);

// Still disallowed (clear error). Type safety enforced for wholly incompatible types
// const pp: (e: number) => void = (e: number) => console.log(e);
// listenEvent(EventType.Mouse, pp);// number is not Event

type AAAA = (...args: any[]) => void;

function invokeLater(args: any[], callback: AAAA) {
    console.log('invoke later:', args, callback);
    callback(...args);
}

// Unsound - invokeLater "might" provide any number of arguments
const callback1: (x: any, y: any) => void = (x, y): void => {
    console.log('callback1:',x + ', ' + y);
};
invokeLater([1, 2], callback1);

// Confusing (x and y are actually required) and undiscoverable
const callback2: (x?: any, y?: any) => void = (x?, y?): void => {
    console.log('callback2:',x + ', ' + y);
};
invokeLater([1, 2], callback2);