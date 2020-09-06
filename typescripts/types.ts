namespace types {
	enum gender {
		male,
		female
	}
	
	console.log('gender.female =', gender.female);
	
	enum icecream {
		vanilla = 'vanilla',
		chocolate = 'chocolate',
		strawberry = 'strawberry'
	}
	
	console.log('icecream:', icecream);
	console.log('icecream.chocolate:', icecream.chocolate);
	
	// @ts-ignore
	interface IIdentity {
		fullName: string;
	}
	
	// @ts-ignore
	class Person {
		constructor(public address: string) {
		}
	}
	
	// @ts-ignore
	const tuple: [number, boolean] = [42, true];

// function
	function noAssignment1(p: number): void {
		console.log('p', p);
	}
	
	noAssignment1(42);
	
	// tslint:disable-next-line:only-arrow-functions
	const noAssignment2: (p: number) => void = function(p: number): void {
		console.log('p', p);
	};
	noAssignment2(42);
	
	const noAssignment3: (p: number) => void = (p: number): void => {
		console.log('p', p);
	};
	noAssignment3(42);

// literal type
	let literal: 'male' | 'female' | number | {
		name: string
		age: number
	};
	
	literal = 'male';
	console.log('literal', literal);
	
	literal = 'female';
	console.log('literal', literal);
	
	literal = 42;
	console.log('literal', literal);
	
	literal = {
		name: 'poo',
		age : 42
	};
	console.log('literal', literal);
}
