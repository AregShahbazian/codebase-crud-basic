function delay(ms) {
    setTimeout(
        () => {
            gen.next()
            console.log("after timeout")
        },
        ms
    )
}

function* generator() {
    yield delay(2000);
}


const gen = generator();

gen.next();
console.log("logged 1st");


