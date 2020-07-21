const validatorDoSomething: (name: string, age: number) => { isValid: boolean, errorMessage: string } = (name: string, age: number): { isValid: boolean, errorMessage: string } => {
    console.log(name, age);
    return {errorMessage: '', isValid: true};
};

const doSomething: (name: string, age: number) => {} = (name: string, age: number): {} => {
    const {isValid, errorMessage}: { isValid: boolean, errorMessage: string } = validatorDoSomething(name, age);
    if(!isValid){
        throw new Error(errorMessage);
    }
    return {};
};

// how to put it in class
class Sample {
    protected validatorDoSomething(name: string, age: number): { isValid: boolean; errorMessage: string } {
        console.log(name, age);
        return {errorMessage: '', isValid: true};
    };

    doSomething(name: string, age: number): {} {
        const {isValid, errorMessage}: { isValid: boolean, errorMessage: string } = this.validatorDoSomething(name, age);
        if(!isValid){
            throw new Error(errorMessage);
        }
        return {};
    };
}