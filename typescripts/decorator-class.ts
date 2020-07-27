namespace decoratorClass {
    /* Type for a typescript class */
    type constructor<T = {}> = new (...args: any[]) => T;

    /* Type for a class decorator */
    type classDecoratorType = (base: constructor) => any;


    /* ***************************************
     * Use Case 1
     * ************************************* */

    function Frozen(base: constructor): any {
        Object.freeze(base);
        Object.freeze(base.prototype);
        return class Unknown {
            constructor(public gender: boolean) {
            }
        };
    }

    @Frozen
    class Icecream {
        constructor(public amount: number) {
        }

        eatIcecream(bites: number): number {
            this.amount = this.amount - bites;
            return this.amount;
        }
    }

    console.log(Object.isFrozen(Icecream));
    const icecream: Icecream = new Icecream(42);

    console.log('icecream', icecream);

    /* Freeze class can NOT extend */

    // class Gelato extends Icecream {
    //     constructor(amount: number) {
    //         super(amount);
    //     }
    //
    // }
    //
    // console.log(typeof Gelato);

    /* ***************************************
     * Use Case 2:
     * ************************************* */

    function Levelable(initialLevel: number): classDecoratorType {

        // return function Frozen(fuckYou: any): any {
        //     Object.freeze(fuckYou);
        //     Object.freeze(fuckYou.prototype);
        // };

        const decorator: classDecoratorType = function /*Frozen*/(base: constructor): any {
            const result = class _LevelPokemon_ extends base {
                level: number = initialLevel;
            };

            return result;
        };

        return decorator;
    }

    @Levelable(2)
    class Pokemom {
        constructor(public name: string, public experience: number) {
        }

        gainExperience(amount: number): number {
            this.experience += amount;
            return this.experience;
        }
    }

    console.log(typeof Pokemom);

    type Level = { level: number };
    type LevelPokemon = Pokemom & Level;

    const charmander: LevelPokemon = new Pokemom('foo', 0) as unknown as LevelPokemon;
    console.log('charmander:', charmander, charmander.level); /* name of the class is determined by ln# 57 */

    console.log(Levelable(2));

}

