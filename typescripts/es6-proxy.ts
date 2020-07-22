let tracer = {
    foo: 'Welcome, foo',
    google() {
        console.log('google');
    }
};

let logClick = (original: any): void => {
    //TODO:logCick to api
    console.log('logClick:', original);
};

const proxyGet = (original: any, propertyKey: PropertyKey, receiver: any): any => {
    console.log(receiver);

    if (propertyKey in original) {
        logClick(original);
        return original[propertyKey];
    } else {
        return `Don't know, ${propertyKey.toString()}`;
    }
};

const proxySet = (original: any, propertyKey: PropertyKey, value: any, receiver: any): boolean => {
    console.log(receiver);

    if (propertyKey in original) {
        logClick(original);
        original[propertyKey] = value;
        return true;
    } else {
        throw new Error('no such members');
    }
};

let personProxy = new Proxy(tracer, {
    get: proxyGet,
    set: proxySet
});

console.log('proxy.foo:', personProxy.foo);   // === "Welcome, foo"
// @ts-ignore
console.log('proxy.world:', personProxy.world); // === "Hello, world"
personProxy.google();

personProxy.foo = 'tony';
console.log(personProxy.foo);
console.log(tracer.foo);