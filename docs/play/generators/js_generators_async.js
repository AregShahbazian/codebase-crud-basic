function delay(ms) {
    setTimeout(
        () => {
            gen.next()
            console.log("after timeout")
            fetch();
        },
        ms
    )
}

function* generator() {
    const x = 10;

    yield delay(0);
}


const gen = generator();

gen.next();
console.log("logged 1st");