var fs = require("fs");

fs.readFile("./6.txt", function (err, data) {
  if (err) {
    return console.error(err);
  }
  let arr = data
    .toString()
    .split("\n\n")
    .map(group => group.split('\n'));
  
  let sum = 0;
  arr.forEach(group => {
    sum += countYes2(group);
  });

  console.log(sum);

});

const countYes = (group) => {
  let set = new Set();
  group.forEach(member => {
    for(let i = 0; i < member.length; i++){
      set.add(member[i]);
    }
  })

  return set.size;
}

const countYes2 = (group) => {
  let count = 0;
  let firstMember = group[0];
  for(let i = 0; i < firstMember.length; i++){
    let subcount = 1;
    for(let j = 1; j < group.length; j++){
      if(group[j].includes(firstMember[i])){
        subcount++;
      } 
    }
    if(subcount === group.length) count++;
  }

  return count;
}