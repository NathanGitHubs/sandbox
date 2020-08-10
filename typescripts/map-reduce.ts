namespace mapReduce {
    /* ****************
     * Mapper/Transformer: a 1-to-1 transformation of a collection resulting in a new collection of the same size
     */
    const collection: string[] = ['tony', 'nathan', 'tiffani'];

    const mapper: (text: string) => string = (text: string): string => {
        return text.toUpperCase();
    };

    const mapped: string[] = collection.map<string>(mapper);

    console.log(mapped);

    /* ****************
     * Reducer: takes a collection of many elements and reduces it into a single output
     */
    const numbers: number[] = [1, 2, 3, 4, 5, 6];

    const initialAccumulated: number = 0;
    // const initialAccumulated: string[] = [];

    const reducer: (accumulated: number, current: number) => number = (accumulated: number, current: number): number => {
        return accumulated + (current);

    };
    const reduced: number = numbers.reduce<number>(reducer, initialAccumulated);
    console.log(reduced);

    /* ****************
     * forEach:
     */
    const animals: string[] = ['dog', 'rat', 'horse', 'dragon', 'rabbit'];

    const thisArg: any = {age: 42};
    const callback: (value: string, index: number, array: string[]) => void = function(this: any, value: string, index: number, array: string[]): void {
        console.log('forEach: ', this, value, index, array);
    };
    const nothing: any = animals.forEach(callback, thisArg);
    console.log(nothing);

    /* ****************
     * every:
     */
    const numerals: number[] = [1, 3, 14, 2, 8, 25];
    const predicate: (value: number, index: number, array: number[]) => unknown = function(this: any, value: number, index: number, array: number[]): unknown {
        console.log('predicate:', this, value, index, array);
        return value > 1;
    };
    const every: boolean = numerals.every(predicate, thisArg);
    console.log('every:', every);

    const some: boolean = numerals.some(predicate, thisArg);
    console.log('some:', some);

    const find: number | undefined = numerals.find(predicate, thisArg);
    console.log('find:', find);

    const findIndex: number | undefined = numerals.findIndex(predicate, thisArg);
    console.log('findIndex:', findIndex);

    const filter: number[] = numerals.filter(predicate, thisArg);
    console.log('filter:', filter);

    const concat: number[] = numerals.concat([55, 63, 72, 91]);
    console.log('concat:', concat);

    const mapConcat: string[] = numerals.map((text: number): string => {
        return text.toString();
    }).concat(['tony', 'nathan', 'tiffani']);
    console.log('mapConcat:', mapConcat);

    // const fill = numerals.fill(5, 3, 4);
    // console.log('fill:', fill);

    const includes: boolean = numerals.includes(14, 2);
    console.log('includes:', includes);

    const indexOf: number = numerals.indexOf(25);
    console.log('indexOf:', indexOf);

    const flat: number[] = numerals.flat();
    console.log(flat);

    const flatMap: number[] = numerals.flatMap((value: number): number[] => {
        const factors: number[] = [];
        for (let i: number = 0; i <= value; i++) {
            if (value % i === 0) {
                factors.push(i);
            }
        }
        return factors;
    });
    console.log('flatMap:', flatMap);

    const join: string = numerals.join(', ');
    console.log('join:', join);

    // const keys = numerals.keys();
    const keys: IterableIterator<number> = numerals.values();
    const nextKey1: IteratorResult<number, any> = keys.next();
    const nextKey2: IteratorResult<number, any> = keys.next();
    const nextKey3: IteratorResult<number, any> = keys.next();
    console.log('keys:', nextKey1, nextKey2, nextKey3);

    // const splice = numerals.splice(4);
    // console.log('splice:', splice);
    // console.log('after splice numerals:', numerals);

    const comparer: (a: number, b: number) => number = (a: number, b: number): number => {
        if (a === b) {
            return 0;
        }
        if (a > b) {
            return 1;
        }
        return -1;
    };
    const sort: number[] = numerals.sort(comparer);
    console.log('sort:', sort);
}

