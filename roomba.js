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
        boundaries.push(parseInt(lines[i].split(" ")[0]));
        boundaries.push(parseInt(lines[i].split(" ")[1]));
    }
    if (i == 1){
        position.push(parseInt(lines[i].split(" ")[0]));
        position.push(parseInt(lines[i].split(" ")[1]));
    }
    if (i < lines.length -1){
        dirt.push([parseInt(lines[i].split(" ")[0]),parseInt(lines[i].split(" ")[1])]);
    }
    let path_str = lines[i];
    path = path_str.split("");
}
console.log(`Boundaries: ${boundaries} \nPosition: ${position}\nDirt: ${dirt}\n Path: ${path}`);
console.log(position);
console.log(dirt[1][0]===position[0]);
