const foo = (arg1, arg2) => {
    console.log(arg1 + " " + arg2)
};
foo(3);


const fooBind = foo.bind(null, 2);
fooBind(4)
