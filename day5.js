var fs = require("fs");

fs.readFile("./5.txt", function (err, data) {
  if (err) {
    return console.error(err);
  }
  let arr = data
    .toString()
    .split("\n");
  
  let max = 0;
  let min = Infinity;
  let seats = [];
  arr.forEach(seat => {
    let row = findRow(seat.slice(0, 7));
    let col = findCol(seat.slice(7,seat.length));
    let id = row*8 + col;
    if(id > max) max = id;
    if(id < min) min = id;
    seats.push(id);
  });

  for(let i = min; i <= max; i++){
    if(!seats.includes(i)) console.log(i);
  }
  

  console.log(max);
  console.log(min);

  
});

function findRow(seat){
  let min = 1;
  let max = 128;
  
  for(let i = 0; i < seat.length; i++){
    if(seat[i] === 'F'){
      max = max - Math.ceil((max - min)/2);
    } else {
      min = min + Math.ceil((max - min)/2);
    }
    // console.log(min);
    // console.log(max);
  }
  return min - 1;
}

function findCol(seat){
  let min = 1;
  let max = 8;

  for(let i = 0; i < seat.length; i++){
    if(seat[i] === 'L'){
      max = max - Math.ceil((max - min)/2);
    } else {
      min = min + Math.ceil((max - min)/2);
    }
    // console.log(min);
    // console.log(max);
  }

  return min - 1;
}

// console.log(findRow('BBFFBBF'));
// console.log(findCol('RLL'));