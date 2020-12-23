const { count } = require("console");
var fs = require("fs");

fs.readFile("./7.txt", function (err, data) {
  if (err) {
    return console.error(err);
  }
  let arr = data
    .toString()
    .split("\n")
    .map(rule => {
      rule = rule.split('s contain ');
      rule[1] = rule[1].split(', ');
      return rule;
    });
  
  let rules = {};
  arr.forEach(rule => {
    rules[rule[0]] = rule[1]; 
  })
  // console.log(rules);
  console.log(findContained(rules, 'shiny gold bag'));
});


const findContainers = (rules, target, set=new Set()) => {
  set.add(target);
  let count = 0;
  for(let i = 0; i < rules.length; i++){
    let rule = rules[i];
    let container = rule[0];
    let contained = rule[1];
    contained.forEach(bag => {
      if(bag.includes(target) && !set.has(container)){
        count += findContainers(rules, container, set);
        count++;
      }
    })
  }
  return count;
}

const findContained = (rules, target) => {
  
  let rule = rules[target]; 
  // console.log(target);
  if(rule[0].includes('no')){
    console.log(rule);
    return 1;
  } 

  let count = 1;
  for(let i = 0; i < rule.length; i++){
    let multiple = rule[i].slice(0, 1);
    let newTarget;
    // console.log(multiple)
    if(rule[i][rule[i].length - 1] === 's'){
      newTarget = rule[i].slice(2, rule[i].length - 1);
    } else if (rule[i][rule[i].length -1] === '.' && rule[i][rule[i].length-2] === 'g'){
      newTarget = rule[i].slice(2, rule[i].length - 1);
    } else if (rule[i][rule[i].length-1]==='.'){
      newTarget = rule[i].slice(2, rule[i].length - 2)
    } 
    else {
      newTarget = rule[i].slice(2, rule[i].length);
    }
    // if(!set.has(newTarget)){
    console.log(multiple + ' * ' +newTarget);
    count += (parseInt(multiple) * findContained(rules, newTarget));
    // }
  }
  return count;
}