const keyd = `
const value = {
    obj:"Pratap singh",
    age:23,
    city:"Noida"
}

console.log(value)
console.log(Object.entries(value));
console.log(value.obj)
`

let vals = eval(keyd)

console.log(vals);
