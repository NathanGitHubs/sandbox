namespace iterators {
    let person = {
        firstName: 'Chandler',
        lastName: 'Bing'
    };

    type IteratorResult = { done: boolean, value: any };
    type Iterator = { next: () => IteratorResult };

    // @ts-ignore
    person[Symbol.iterator] = function (): Iterator {
        const properties: string[] = Object.keys(this);
        let count: number = 0;
        let isDone: boolean = false;
        const next: () => IteratorResult = (): IteratorResult => {
            if (count >= properties.length) {
                isDone = true;
            }
            const propertyName: string = properties[count++];
            // @ts-ignore
            let value: any = this[propertyName];
            return {
                done: isDone,
                value: value
            };
        };
        return {next: next}; // [name of property]: [the arrow function next on ln# 14]
    };

    // @ts-ignore
    for (let p of person) {
        console.log(p);
    }

}