namespace decoratorProperty {
    // type constructor<T = {}> = new (...args: any[]) => T;
    /* Type for property decorator */
    type propertyDecoratorType = (target: Object, propertyName: string | symbol) => any;

    function Emoji(): propertyDecoratorType {
        const decorator: propertyDecoratorType = function (target: Object, propertyName: string | symbol): any {
            // @ts-ignore
            let field: any;

            const setter: (value: any) => void = (value: any): void => {
                if(value === '2'){
                    throw new Error('2 is not an allowed name');
                }
                field = value;
            };
            const getter: () => any = (): any => {
                return field;
            };

            Object.defineProperty(target, propertyName, {
                set: setter,
                get: getter
            });
            console.log('inside decorator', target, propertyName, field);

        };
        return decorator;
    }

    class Candy {

        @Emoji()
        name: string = 'default';

        age: number = 42;

        constructor(name: string) {
            this.name = name;
        }

        buyCandy(name: string): string {
            this.name = name;
            return this.name;
        }
    }

    console.log(typeof Candy);

    const candy: Candy = new Candy('foo');
    console.log('candy', candy, candy.name);
    candy.name = '1';
    console.log('candy', candy, candy.name);

    candy.name = '2';
    console.log('candy', candy, candy.name);

    candy.name = '3';
    console.log('candy', candy, candy.name);

    candy.name = '4';
    console.log('candy', candy, candy.name);

    candy.name = '5';
    console.log('candy', candy, candy.name);

    candy.name = '6';
    console.log('candy', candy, candy.name);
    console.log('candy json', JSON.stringify(candy));

}