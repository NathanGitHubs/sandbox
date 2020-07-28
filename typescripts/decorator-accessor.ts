namespace decoratorAccessor {
    type accessorDecoratorType = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any;

    function CheckGreaterThanZero(b: boolean): accessorDecoratorType {
        console.log(b);
        const decorator: accessorDecoratorType = function (target: any, propertyKey: string, descriptor: PropertyDescriptor): any {
            console.log(target, propertyKey, descriptor);

            const original = descriptor.set;
            console.log('original', original);

            descriptor.set = function (...args): any { // set does not use an any[]
                if (args[0] <= 0) {
                    throw new Error('0 and negative numbers are not allowed');
                }

                let result = original!.apply(this, args);

                console.log(result);

                return result;
            };
        };

        return decorator;
    }

    class Point {
        protected _x: number;
        protected _y: number;

        constructor(x: number, y: number) {
            this._x = x;
            this._y = y;
        }

        get x() {
            return this._x;
        }

        @CheckGreaterThanZero(false)
        set x(value) {
            this._x = value;
        }

        get y() {
            return this._y;
        }

        @CheckGreaterThanZero(false)
        set y(value) {
            this._y = value;
        }

    }

    console.log(typeof Point);

    const point: Point = new Point(1, 2);
    console.log('point:', point);

    point.x = 42;
    console.log('point:', point);

    try {
        point.x = 0;
        console.log('point:', point);
    } catch (e) {
        console.log('Error:', e.message);
        // throw new Error('something is wrong');
    } finally {
        //clean up
    }
}