namespace sandbox {
	class Person {
	}
	
	const people: Person[] = new Array<Person>();
	console.log(people);
	
	people.push(new Person());
	people.push(new Person());
	people.push(new Person());
	people.push(new Person());
	people.push(new Person());
	
	console.log(people, people.length);
	
}
