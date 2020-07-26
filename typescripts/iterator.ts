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
        const fuckYou: () => { done: boolean, value: any } = (): { done: boolean, value: any } => {
            if (count >= properties.length) {
                isDone = true;
            }
            const temp: string = properties[count++];
            // @ts-ignore
            let value: any = this[temp];
            return {
                done: isDone,
                value: value
            };
        };
        return {next: fuckYou};
    };

    // @ts-ignore
    for (let p of person) {
        console.log(p);
    }

}