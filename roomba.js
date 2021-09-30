//define variables
let boundaries = []; //size of our space
let position = []; // roomba position
let dirt = []; // list of dirt positions
let path = []; //path taken by roomba


//load input file
var fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8');
// console.log(data);

//parse data
const lines = data.split(/\r?\n/)
for(let i =0; i< lines.length; i++){
    if (i == 0){
        boundaries.push(lines[i].split(" "));
    }
    if (i == 1){
        position.push(lines[i].split(" "));
    }
    if (i < lines.length -1){
        dirt.push([lines[i].split(" ")]);
    }
    let path_str = lines[i];
    path = path_str.split("");
}
console.log(`Boundaries: ${boundaries} \nPosition: ${position}\nDirt: ${dirt}\n Path: ${path}`);
console.log(dirt[0][0]);
