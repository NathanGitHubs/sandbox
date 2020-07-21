let s = [0, 1, null]; // inferred type is (number | null) []
console.log(s);
// x = 'one'; not allowed bc of type inference


let has = 46;
// has = 'string';
let bad;
bad = 42;
bad = 'string';
console.log(bad, has);

