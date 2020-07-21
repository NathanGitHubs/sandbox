var aggregation = (baseClass: any, ...mixins: any) => {
    let base = class _Combined extends baseClass {
        constructor(...args: any) {
            super(...args);
            mixins.forEach((mixin: any) => {
                mixin.prototype.initializer.call(this);
            });
        }
    };
    let copyProps = (target: any, source: any) => {
        Object.getOwnPropertyNames(source)
            .concat(Object.getOwnPropertySymbols(source) as unknown as string[])
            .forEach((prop) => {
                if (prop.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/))
                    return;
                Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop)!);
            });
    };
    mixins.forEach((mixin: any) => {
        copyProps(base.prototype, mixin.prototype);
        copyProps(base, mixin);
    });
    return base;
};

class Colored {
    age!: number;

    initializer() {
        this._color = 'white';
    }

    get color() {
        return this._color;
    }

    private _color: any;
    set color(v: any) {
        this._color = v;
    }
}

class ZCoord {
    private _z: any;

    initializer() {
        this._z = 0;
    }

    get z() {
        return this._z;
    }

    set z(v) {
        this._z = v;
    }
}

class Shape {
    private _x: any;
    private _y: any;

    constructor(x: any, y: any) {
        this._x = x;
        this._y = y;
    }

    get x() {
        return this._x;
    }

    set x(v) {
        this._x = v;
    }

    get y() {
        return this._y;
    }

    set y(v) {
        this._y = v;
    }
}

type RectangleCombined = Shape & Colored & ZCoord;

class Rectangle extends aggregation(Shape, Colored, ZCoord) {
}

var rect: RectangleCombined = (new Rectangle(7, 42)) as RectangleCombined;
rect.z = 1000;
rect.color = 'red';
console.log(rect.x, rect.y, rect.z, rect.color);

console.log(Object.keys(rect));

const color: Colored = new Colored();
console.log(Object.keys(color));
console.log('rect', rect);
color.initializer();

console.log('color', color, color.color);

type ColoredKeys = keyof Colored;
const fuqu: ColoredKeys = 'age';

console.log(Object.keys(color));
console.log('getOwnPropertyNames: ', Object.getOwnPropertyNames(color));
// console.log(ColoredKeys.toString());
color.age = 42;
console.log(JSON.stringify(color));