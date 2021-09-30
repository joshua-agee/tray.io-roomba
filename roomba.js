//define variables
let boundaries = []; //size of our space
let position = []; // roomba position
let dirt = []; // list of dirt positions
let path = []; //path taken by roomba
let dirtCollected = 0;
let finalPosition = [];

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
console.log(boundaries);
console.log(position);
console.log(dirt);
console.log(dirt[1][0]===position[0]&&dirt[1][1] === position[1]);
console.log(path);

// process path and collect dirt
//position = [X, Y]
function move(currentPosition, direction, boundaries){
    let newPosition = [];
    switch (direction){
        case 'N': //y+1
            if ((currentPosition[1] + 1 )> boundaries[1]){
                newPosition = [currentPosition[0], boundaries[1]];
            } else {
            newPosition = [currentPosition[0], currentPosition[1]+1];
            }
            break;
        case 'S': //y-1
            if ((currentPosition[1] - 1) < 0){
                newPosition = [currentPosition[0], 0];
            } else {
            newPosition = [currentPosition[0], currentPosition[1]-1];
            }
            break;
        case 'W': //x-1
            if ((currentPosition[0] - 1) < 0){
                newPosition = [0, currentPosition[1]];
            } else {
            newPosition = [currentPosition[0]-1, currentPosition[1]];
            }
            break;
        case 'E': //x+1
            if ((currentPosition[0] + 1 )> boundaries[0]){
                newPosition = [boundaries[0], currentPosition[1]];
            } else {
            newPosition = [currentPosition[0]+1, currentPosition[1]];
            }
            break;
    };
    return newPosition;
}
//compare position to locations of dirt, increment count and remove if matched
function pickupDirt(currentPosition, dirt){
    dirt.forEach(spot, index => {
        if(spot[0]===currentPosition[0] && spot[1]===currentPosition[1]){
            dirtCollected++;
            dirt.splice(index,1);
        };
    });
}

//initial position check for dirt
pickupDirt()
//loop over path, update position, collect dirt, return final position
path.forEach(direction => {

})
