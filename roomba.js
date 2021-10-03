//define variables
let boundaries = []; //size of our space
let position = []; // roomba position
let dirt = []; // list of dirt positions
let path = []; //path taken by roomba
let dirtCollected = 0;
let lastPosition = [];
let map = [];
const tileIcon = " ";
const dirtIcon = "💩";
const cleanIcon = "✨";
const northIcon = "🔼";
const southIcon = "🔽";
const westIcon = "◀️";
const eastIcon = "▶️";
const startIcon = "⭕️";
const endIcon = "❌";


//load input file
var fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8');

//parse initial data
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
    //unshift to ensure most recent is retrieved
    map.unshift({position, icon});
}

//add dirt to map
for(let i = 0; i<dirt.length; i++){
    let dirtSpot = dirt[i];
    addToMap(map, dirtSpot, dirtIcon);
}
//initial position
addToMap(map, position, startIcon);



//starting map
console.log("Starting position:")
// console.log(map);
console.log(makeMap());
// process path and collect dirt
//position = [X, Y]
function move(currentPosition, direction, boundaries){
    let newPosition = [];
    switch (direction){
        case 'N': //y+1
            if ((currentPosition[1] + 1 ) > boundaries[1]){
                newPosition = [currentPosition[0], boundaries[1]];
                // console.log('hit north wall');
            } else {
            newPosition = [currentPosition[0], currentPosition[1]+1];
            }
            addToMap(map, currentPosition, northIcon);
            break;
        case 'S': //y-1
            if ((currentPosition[1] - 1) < 0){
                newPosition = [currentPosition[0], 0];
                // console.log('hit south wall');
            } else {
            newPosition = [currentPosition[0], currentPosition[1]-1];
            }
            addToMap(map, currentPosition, southIcon);
            break;
        case 'W': //x-1
            if ((currentPosition[0] - 1) < 0){
                newPosition = [0, currentPosition[1]];
                // console.log('hit west wall');
            } else {
            newPosition = [currentPosition[0]-1, currentPosition[1]];
            }
            addToMap(map, currentPosition, westIcon);
            break;
        case 'E': //x+1
            if ((currentPosition[0] + 1 )> boundaries[0]){
                newPosition = [boundaries[0], currentPosition[1]];
                // console.log('hit east wall');
            } else {
            newPosition = [currentPosition[0]+1, currentPosition[1]];
            }
            addToMap(map, currentPosition, eastIcon);
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
            addToMap(map, currentPosition, cleanIcon);
            dirt.splice(i,1);
        }
    }
}

//pickupDirt(position, dirt);
//loop over path, update position, collect dirt, return final position

path.forEach((direction, index) => {
    let newPosition = move(position, direction, boundaries);
    // console.log(newPosition);
    pickupDirt(newPosition, dirt);
    lastPosition = newPosition;
    position = newPosition;
    console.log(`Step: ${index+1}:`);
    console.log(makeMap());
});

// map.push({lastPosition, endIcon});
addToMap(map, lastPosition, endIcon);
let finalPosition = lastPosition[0].toString().concat(' ', lastPosition[1].toString());
// console.log('results:');
console.log("Results:");
console.log(finalPosition);
console.log(dirtCollected);
console.log("Final Position:");

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
function makeMap(){
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
    return mapResult;
}

console.log(makeMap());