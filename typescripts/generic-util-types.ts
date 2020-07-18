interface CourseGoal {
    title: string,
    description: string,
    date: Date
}

function createGoal(
    title: string,
    description: string,
    date: Date
): CourseGoal {
    const courseGoal: Partial<CourseGoal> = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.date = date;
    // console.log(date);
    return courseGoal as CourseGoal; // even if ln# 15 was commented then it would still work but date = undefined
}

let date = new Date();

const courseGoal = createGoal('foo', 'bar', date);
// console.log('courseGoal:', courseGoal, courseGoal.date); this goes with ln# 16 and the courseGoal.date = ln#17 comment
console.log('courseGoal:', courseGoal);

interface H {
    name: string,
}

interface H {
    age: number
}

// type I = G & H;
// const i: I = {age: 0, name: ""};

const h: H = {age: 0, name: ""};