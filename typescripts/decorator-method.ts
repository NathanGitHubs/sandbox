namespace decoratorMethod {
    type methodDecoratorType = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;

    function CheckValidity(): methodDecoratorType {
        const decorator: methodDecoratorType = (target: any, propertyKey: string, descriptor: PropertyDescriptor): any => {
            // @ts-ignore
            function extracted() {
                console.log('inside decorator:', target, propertyKey, descriptor);

                const snack: Snack = new Snack('Doritos');
                const temp = snack.printSnack('cool ranch');
                console.log(temp);

                const temp2 = (descriptor.value.bind(snack))('nacho cheese');
                console.log(temp2);

                const temp3 = descriptor.value('fiery');
                console.log(temp3);
            }
            // extracted();

            const original = descriptor.value;
            console.log('original', original);

            descriptor.value = function (...args: any[]) {
                const that = this as unknown as Snack;
                if(that.brand !== 'Lays' && that.brand !== 'Doritos'){
                    throw new Error('not valid brand');
                }
                let result = original.apply(this, args); // works same as ln# 30

                return result;
            };

        };

        return decorator;
    }

    class Snack {
        brand: string = 'default';

        constructor(brand: string) {
            this.brand = brand;
        }

        @CheckValidity()
        printSnack(snackName: string): string {
            return `${JSON.stringify(this)}, ${this.brand}: ${snackName}`;
        }
    }

    console.log(typeof Snack);

    const snack: Snack = new Snack('Lays');
    const temp = snack.printSnack('salt and vinegar');
    console.log(temp);

}