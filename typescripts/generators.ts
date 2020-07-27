namespace generators {
    const squirtle = {
        name: 'squirtle',
        age: 42
    };

    console.log(squirtle);

    const generator = function* () {
        console.log('before yield1');
        yield 1;
        console.log('before yield2');
        yield 2;
        console.log('before yield3');
        yield 3;
    };

    const gen = generator();

    console.log(gen.next());
    console.log(gen.next());
    console.log(gen.next());
    console.log(gen.next());
    console.log(gen.next());
    console.log(gen.next());

    function* infiniteSequence() {
        // let i = 0;
        while (true) {
            console.log('before yield');
            yield {
                greet: 'hello, this is a yield',
                age: Math.floor(Math.random() * 100)
            };
            console.log('after yield');

        }
    }

    let iteratorNumber = infiniteSequence();
    let counter = 0;
    while (counter++ < 10) {
        console.log('********************');
        console.log(iteratorNumber.next()); // { value: xxxx, done: false } forever and ever
        console.log('-------------------');
    }
}