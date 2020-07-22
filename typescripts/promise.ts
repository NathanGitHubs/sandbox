function getPizza(): string { // async makes the return type a Promise but the constraint makes the payload of the Promise a type string
    return 'meat lover';
}

const outcome: string = getPizza();
console.log('outcome:', outcome);

async function getPizzaAsync(isMock: boolean) { // async makes the return type a Promise but the constraint makes the payload of the Promise a type string
    if (isMock) {
        const lambda = (resolve: Function, reject: Function): any => {
            const payload = 'meat lover';
            const error = `Store closed, cannot get ${payload}`;
            console.log('ln#16 getPizzaAsync', resolve, reject, payload, error);

            function runThis() {
                //return resolve(payload);
                return reject(error);
            }

            setTimeout(runThis, 2458);
        };
        return new Promise(lambda);
    } else {
        const url = 'http://www.google.com';
        return fetch(url);
    }

}

async function doNothing() {
    try {
        const payload = await getPizzaAsync(true);
        console.log('(new-way) your pizza is here:', payload);
    } catch (error) {
        console.error('(new-way) error happen your server:', error);
    } finally {
        console.log('(new-way) get keys and money back from Chris.');
    }
}

function doNothingOldWay() {
    getPizzaAsync(true)
        .then(function (payload) {
            console.log('(old-way) your pizza is here:', payload);
        })
        .catch(function (error) {
            console.error('(old-way) error happen your server:', error);
        })
        .finally(function () {
            console.log('(old-way) get keys and money back from Chris.');
        });
}

const o = doNothing();
doNothingOldWay();
console.log('program finished:', o);

// advanced promise/combined promises
type resolveType = (value?: (PromiseLike<number> | number)) => void;
type rejectType = (reason?: any) => void;
type outcomeType = Promise<number> | number | void;
type successType = ((payload: unknown) => unknown | PromiseLike<unknown>) | undefined | null;
type successesType = ((payloads: unknown[]) => unknown | PromiseLike<unknown>) | undefined | null;
type failType = ((reason: any) => void | PromiseLike<void>) | undefined | null;
type failsType = ((reason: any) => void | PromiseLike<void>) | undefined | null;

const parameter: (resolve: resolveType, reject: rejectType) => void = (resolve: resolveType, reject: rejectType): outcomeType => {
    resolve || reject;
    reject(42); // reject
    // abc(42); // resolve
};
let finalResult = 0;
const promise = new Promise(parameter);
const success: (payload: any) => any = (payload: any): any => {
    console.log('payload:', payload);
    return 6 + payload;
};

const moreHandling: (payload: any) => any = (payload: any): any => {
    console.log('payload:', payload);
    return 4 + payload;
};
const lastJob: (payload: any) => any = (payload: any): any => {
    console.log('payload:', payload);
    finalResult = finalResult + 1 + payload;
    console.log(finalResult);
};
const limbo: (payload: any) => any = (payload: any): any => {
    console.log('payload:', payload);
};
const finish: () => void = (): void => {
    console.log('the end');
};

promise.then(success)
       .then(moreHandling)
       .then(lastJob)
       .then(limbo)
       .catch(success)
       .finally(finish);

// promise.then(success).then(moreHandling).then(lastJob).then(limbo).finally(finish);
// promise.catch(success).catch(moreHandling).catch(lastJob).catch(limbo).finally(finish);
// function fetchAsync (url, timeout, onData, onError) {
//

// }
let fetchAsync = (url: string, timeout: number, onData: resolveType, onError: rejectType): outcomeType | void => {
    url || timeout || onData || onError;
    onData(42);
};
let fetchPromised = (url: string, timeout: number) => {
    return new Promise((resolve, reject) => {
        fetchAsync(url, timeout, resolve, reject);
    });
};
const successes: successesType = (payloads) => {
    let [foo, bar, baz] = payloads;
    console.log(`success: foo=${foo} bar=${bar} baz=${baz}`);
};
const fails: failsType = (err) => {
    console.log(`error: ${err}`);
};
const sjdafb = (): void => {
    console.log('hello');
};

Promise.all([
    fetchPromised('http://backend/foo.txt', 500),
    fetchPromised('http://backend/bar.txt', 500),
    fetchPromised('http://backend/baz.txt', 500)
])
       .then(successes)
       .catch(sjdafb);

