var p1 = new Promise( (resolve, reject) => {
    // resolve('Success!');
    // or
    reject ("Error!");
} );

p1.then( value => {
    console.log(value); // Success!
}, reason => {
    console.log(reason); // Error!
} );