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
const northIcon = "⬆️";
const southIcon = "⬇️";
const westIcon = "⬅️";
const eastIcon = "⬅️";
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

function addToMap(map, position, icon){
    position = position;
    icon = icon;
    map.push({position, icon});
}


// map.push({position, startIcon});
addToMap(map, position, startIcon);

// console.log(map[0]);
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
                // map.push({newPosition, northIcon});
                // addToMap(map, newPosition, northIcon);
                // console.log('hit north wall');
            } else {
            newPosition = [currentPosition[0], currentPosition[1]+1];
            // map.push({newPosition, northIcon});
            // addToMap(map, newPosition, northIcon);
            }
            addToMap(map, newPosition, northIcon);
            break;
        case 'S': //y-1
            if ((currentPosition[1] - 1) < 0){
                newPosition = [currentPosition[0], 0];
                // map.push({newPosition, southIcon});
                // addToMap(map, newPosition, southIcon);
                // console.log('hit south wall');
            } else {
            newPosition = [currentPosition[0], currentPosition[1]-1];
            // map.push({newPosition, southIcon});
            }
            addToMap(map, newPosition, southIcon);
            break;
        case 'W': //x-1
            if ((currentPosition[0] - 1) < 0){
                newPosition = [0, currentPosition[1]];
                // map.push({newPosition, westIcon});
                // addToMap(map, newPosition, westIcon);
                // console.log('hit west wall');
            } else {
            newPosition = [currentPosition[0]-1, currentPosition[1]];
            // map.push({newPosition, westIcon});
            }
            addToMap(map, newPosition, westIcon);
            break;
        case 'E': //x+1
            if ((currentPosition[0] + 1 )> boundaries[0]){
                newPosition = [boundaries[0], currentPosition[1]];
                // map.push({newPosition, eastIcon});
                // addToMap(map, newPosition, eastIcon);
                // console.log('hit east wall');
            } else {
            newPosition = [currentPosition[0]+1, currentPosition[1]];
            // map.push({newPosition, eastIcon});
            }
            addToMap(map, newPosition, eastIcon);
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
            // map.push({currentPosition, cleanIcon});
            addToMap(map, currentPosition, cleanIcon);
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

// map.push({lastPosition, endIcon});
addToMap(map, lastPosition, endIcon);
let finalPosition = lastPosition[0].toString().concat(' ', lastPosition[1].toString());
// console.log('results:');

console.log(finalPosition);
console.log(dirtCollected);

for(let i = 0; i<dirt.length; i++){
    let dirtSpot = dirt[i];
    // map.push({dirtSpot, dirtIcon});
    addToMap(map, dirtSpot, dirtIcon);
}
//build map
// console.log(map);
// console.log(map.length);

// let result = map.find(({position}) => position[0] == 4 && position[1] == 2);
// console.log(result);
//retrieve icon from map
function getIconFromMap(map, x, y){
    return map.find(({position}) => position[0] == x && position[1] == y).icon;
}
// console.log(getIconFromMap(map, 4,2));

//build map from results
let mapResult = [];
for(let y=0; y<=boundaries[1]; y++){
    let row=[];
    for(let x=0; x<= boundaries[0]; x++){
        try {
            // console.log(getIconFromMap(map, x, y));
            row.push(getIconFromMap(map, x, y));
        }
        catch(error) {
            // console.log(error);
            row.push(tileIcon);
        }
    }
    mapResult.unshift(row.toString());
    row = [];
}

console.log(mapResult);