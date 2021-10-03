//define variables
let boundaries = []; //size of our space
let position = []; // roomba position
let dirt = []; // list of dirt positions
let path = []; //path taken by roomba
let dirtCollected = 0;
let lastPosition = [];
const tileIcon = "🔲";
const dirtIcon = "💩";
const cleanIcon = "✨";
const northIcon = "⬆";
const southIcon = "⬇";
const westIcon = "⬅";
const eastIcon = "➡";
const startIcon = "⭕️";
const endIcon = "❌";

let map = [];

const { Console } = require('console');
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

map.push([position, startIcon]);

console.log(map[0]);
// console.log(`Boundaries: ${boundaries} \nPosition: ${position}\nDirt: ${dirt}\n Path: ${path}`);
// console.log(boundaries);
// console.log(position);
// console.log(dirt);
// console.log(dirt[1][0]===position[0]&&dirt[1][1] === position[1]);
// console.log(path);

// process path and collect dirt
//position = [X, Y]
function move(currentPosition, direction, boundaries){
    let newPosition = [];
    switch (direction){
        case 'N': //y+1
            if ((currentPosition[1] + 1 ) > boundaries[1]){
                newPosition = [currentPosition[0], boundaries[1]];
                map.push([newPosition, northIcon]);
                // console.log('hit north wall');
            } else {
            newPosition = [currentPosition[0], currentPosition[1]+1];
            map.push([newPosition, northIcon]);
            }
            break;
        case 'S': //y-1
            if ((currentPosition[1] - 1) < 0){
                newPosition = [currentPosition[0], 0];
                map.push([newPosition, southIcon]);
                // console.log('hit south wall');
            } else {
            newPosition = [currentPosition[0], currentPosition[1]-1];
            map.push([newPosition, southIcon]);
            }
            break;
        case 'W': //x-1
            if ((currentPosition[0] - 1) < 0){
                newPosition = [0, currentPosition[1]];
                map.push([newPosition, westIcon]);
                // console.log('hit west wall');
            } else {
            newPosition = [currentPosition[0]-1, currentPosition[1]];
            map.push([newPosition, westIcon]);
            }
            break;
        case 'E': //x+1
            if ((currentPosition[0] + 1 )> boundaries[0]){
                newPosition = [boundaries[0], currentPosition[1]];
                map.push([newPosition, eastIcon]);
                // console.log('hit east wall');
            } else {
            newPosition = [currentPosition[0]+1, currentPosition[1]];
            map.push([newPosition, westIcon]);
            }
            break;
    };
    return newPosition;
}
//compare position to locations of dirt, increment count and remove if matched
function pickupDirt(currentPosition, dirt){
    for(let i = 0; i<dirt.length; i++){
        if(dirt[i][0]===currentPosition[0]&&dirt[i][1]===currentPosition[1]){
            // console.log('Yum!');
            dirtCollected++;
            map.push([currentPosition, cleanIcon]);
            dirt.splice(i,1);
        }
    }
}

//initial position check for dirt
//pickupDirt(position, dirt);
//loop over path, update position, collect dirt, return final position
// console.log('Starting position:');
// console.log(position);
// console.log('Moving!');
path.forEach(direction => {
    let newPosition = move(position, direction, boundaries);
    // console.log(newPosition);
    pickupDirt(newPosition, dirt);
    lastPosition = newPosition;
    position = newPosition;
});

let finalPosition = lastPosition[0].toString().concat(' ', lastPosition[1].toString());
// console.log('results:');
map.push([finalPosition, endIcon]);
console.log(finalPosition);
console.log(dirtCollected);

for(let i = 0; i<dirt.length; i++){
    map.push(dirt[i], dirtIcon);
}
//build map
console.log(map);