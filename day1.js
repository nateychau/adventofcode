var fs = require("fs");

fs.readFile("./input1.txt", function (err, data) {
  if (err) {
    return console.error(err);
  }
  let arr = data
    .toString()
    .split("\n")
    .map((el) => parseInt(el));
  
  findParts(arr, 2020);
  
  for(let i = 0; i < arr.length; i++){
    let num = arr[i];
    let diff = 2020 - num;
    let subProd = findParts(arr.slice(i + 1, arr.length-1), diff);
  }
  console.log(num * subProd);




});

const findParts = (arr, sum) => {
  let set = new Set();
  for(let i = 0; i < arr.length; i++){
      let num = arr[i];
      let diff = sum - num;
      if(set.has(num)){
        // console.log(num * diff);
        return num * diff;
      } else {
        set.add(diff);
      }
    }
}