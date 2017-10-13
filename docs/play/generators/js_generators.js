function* generator() {
    const x = 10;

    yield "hello";

    yield "bye";
}


const gen = generator();

console.log(gen.next());
console.log("logged 1st");
console.log(gen.next());
console.log("logged 2nd");
console.log(gen.next());