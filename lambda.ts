class Dog {
    constructor(public name: string) {
    }
    bark() {
        console.log('this:', this);
        console.log(`bark bark bark ${this.name}`);
    }
    lazyBark() {
        setTimeout(() =>{
            console.log(`lazy bark bark ${this.name}`);
        }, 1000);
    }
}

const dog1 = new Dog('Juliet');
dog1.bark();
dog1.lazyBark();