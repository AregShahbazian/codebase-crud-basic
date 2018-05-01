/*
* Run this using node in commandline
* */

function makeApiall(x) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(x);
        }, 2000);
    });
}

async function action() {
    let x = await makeApiall(10);
    // console.log(x); // 10
    return x
}
// action();

async function thunk() {
    let x = await action();
    console.log(x); // 10
}

thunk()