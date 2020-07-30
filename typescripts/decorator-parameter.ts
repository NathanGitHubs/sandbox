namespace decoratorParameter {
    type parameterDecoratorType = (target: Object, methodName: string, parameterIndex: number) => any;
    type methodDecoratorType = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;

    enum StrategyKind {
        MinimumCharacter = 'MinimumCharacter'
    }

    type parameter = {
        parameterIndex: number,
        benchmarkValue: any,
        strategy: StrategyKind
    }
    type validator = {
        parameters: parameter[]
    }
    type methodValidator = {
        methodName: string,
        validators: validator[]
    }

    function MinimumCharacter(numberOfCharacters: number): parameterDecoratorType {
        const decorator: parameterDecoratorType = function (target: Object, methodName: string, parameterIndex: number): any {
            console.log(target, methodName, parameterIndex, numberOfCharacters);

            const parameter: parameter = {
                parameterIndex: parameterIndex,
                benchmarkValue: numberOfCharacters,
                strategy: StrategyKind.MinimumCharacter

            };
            const validator: validator = {
                parameters: [parameter]
            };
            const methodValidator: methodValidator = {
                methodName: methodName,
                validators: [validator]
            };

            // @ts-ignore
            target['methodMap'] = target['methodMap'] || new Map<string, methodValidator[]>();
            // (target['methodMap'] as unknown as methodValidator[]).push(methodValidator);

            // @ts-ignore
            const methodMap: Map<string, methodValidator[]> = target['methodMap'];

            const methodMapValue: methodValidator[] | undefined = methodMap.get(methodName);
            if (methodMapValue) {
                methodMapValue.push(methodValidator);
            } else {
                methodMap.set(methodName, [methodValidator]);
            }
        };

        return decorator;

    }

    function ValidateParameters(): methodDecoratorType {
        const decorator: methodDecoratorType = (target: any, methodName: string, descriptor: PropertyDescriptor): any => {
            console.log(target, methodName, descriptor);

            const original = descriptor.value;
            console.log('original', original);

            descriptor.value = function (...args: any[]) {
                const methodMap: Map<string, methodValidator[]> = target['methodMap'];
                console.log(methodMap);

                const methodMapValue: methodValidator[] | undefined = methodMap.get(methodName);
                console.log(methodMapValue);

                if (methodMapValue) {
                    methodMapValue.forEach((methodValidator) => {
                        const validators: validator[] = methodValidator.validators;
                        validators.forEach((validator) => {
                            const parameters: parameter[] = validator.parameters;
                            parameters.forEach((parameter) => {
                                const parameterIndex: number = parameter.parameterIndex;
                                const benchmarkValue: any = parameter.benchmarkValue;
                                const strategy: StrategyKind = parameter.strategy;
                                const argument: any = args[parameterIndex];

                                if (strategy === StrategyKind.MinimumCharacter) {
                                    if (argument.length < benchmarkValue) {
                                        throw new Error(`class: ${target.constructor.name} at method ${methodName}, at argument index: ${parameterIndex}: ${argument} must be greater than ${benchmarkValue}`);
                                    }
                                } else {
                                    throw new Error('unknown validation/strategy request');
                                }
                            });
                        });
                    });
                }

                let result = original.apply(this, args); // works same as ln# 30
                return result;
            };

        };

        return decorator;
    }

    class Greeter {
        greeting: string;

        constructor(message: string) {
            this.greeting = message;
        }

        @ValidateParameters()
        greet(temp: number, age: number, @MinimumCharacter(8) personName: string) {
            return 'Hello ' + personName + ', ' + this.greeting + age + temp;
        }

        @ValidateParameters()
        fuckYou(@MinimumCharacter(6) personName: string) {
            return 'Hello ' + personName + ', ' + this.greeting;
        }
    }

    console.log(typeof Greeter);

    const greeter: Greeter = new Greeter('how are you');
    console.log(greeter.greet(142, 42, 'nathan'));
}