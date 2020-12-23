var fs = require("fs");

fs.readFile("./2.txt", function (err, data) {
  if (err) {
    return console.error(err);
  }
  let arr = data
    .toString()
    .split("\n")
    // .map((el) => parseInt(el));

  arr = arr.map(row => row.split(' '));
  arr.forEach((row, i) => {
    let nums = row[0].split('-').map(num => parseInt(num));
    let char = row[1][0];
    arr[i] = [nums, char, row[2]];
  })
  // console.log(arr);

  let count = 0;
  arr.forEach(row => {
    let min = row[0][0];
    let max = row[0][1];
    let char = row[1];
    let password = row[2];
    if(isValid2(min, max, char, password)) count++;
  })
  console.log(count);
});

function isValid(min, max, char, password){
  let charCount = 0;
  for(let i = 0; i < password.length; i++){
    if(password[i] === char) charCount++;
  }
  return charCount >= min && charCount <= max;
}

function isValid2(a, b, char, password){
  if(password[a-1] === char && password[b-1] !== char){
    return true;
  } else if (password[b-1] === char && password[a-1] !== char){
    return true;
  }
  return false; 
}