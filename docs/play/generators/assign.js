var o1 = {a: 1};
var o2 = {b: 2};
var o3 = {c: {c1: 31, c2: 32}};

var obj = Object.assign({}, o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }

/* Changing top level property only affects the changed object, because top level properties are duplicated by
Object.assign*/
o1.a = 11
console.log(obj);
console.log(o1)


/* Changing nested objects will affect both objects, because the nested object is shared, and not duplicated by
Object.assign*/
o3.c.c1 = 3010
console.log(obj);
console.log(o3)



