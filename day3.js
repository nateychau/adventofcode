var fs = require("fs");

fs.readFile("./3.txt", function (err, data) {
  if (err) {
    return console.error(err);
  }
  let arr = data
    .toString()
    .split("\n")
    .map(row => row.split(''));
  
  let prod = 1; 
  prod *= findPath(arr, 1, 1);
  prod *= findPath(arr, 3, 1);
  prod *= findPath(arr, 5, 1);
  prod *= findPath(arr, 7, 1);
  prod *= findPath(arr, 1, 2);
  console.log(prod);
});

function findPath(grid, right, down){
  let row = 0;
  let col = 0; 
  let count = 0;
  while(row < grid.length){
    if(grid[row][col] === '#') count++;
    row += down;
    col = (col+right)%grid[0].length;
  }
  return count;
}