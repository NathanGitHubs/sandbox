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
