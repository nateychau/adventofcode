var fs = require("fs");

fs.readFile("./4.txt", function (err, data) {
  if (err) {
    return console.error(err);
  }
  let arr = data
    .toString()
    .split("\n\n");
  
  let count = 0;
  arr.forEach(passport => {
    if(isValid(passport)) count++;
  })

  console.log(count);

  
});

function isValid(passport){
  const fields = ['byr', 'iyr', 'eyr', 'hgt',
  'hcl', 'ecl', 'pid',];
  
  for(let i = 0; i < fields.length; i++){
    if(!passport.includes(fields[i])) return false;
    let field = fields[i];
    let idx = passport.indexOf(field) + 4;
    let target; 
    let valid;
    // console.log(field);
    switch(field){
      case 'byr':
        target = parseInt(passport.substring(idx, idx+4));
        if(target < 1920 || target > 2002) return false;
        break;
      case 'iyr':
        target = parseInt(passport.substring(idx, idx+4));
        if(target < 2010 || target > 2020) return false;
        break;
      case 'eyr':
        target = parseInt(passport.substring(idx, idx+4));
        if(target < 2020 || target > 2030) return false;
        break;
      case 'hgt':
        let num = '';
        let i = idx;
        valid = '0123456789';
        while(valid.includes(passport[i])){//passport[i] !== 'i' && passport[i] !== 'c' && passport[i] !== ' '){
          num += passport[i];
          i++;
        }
        let format = passport[i];
        // if(format !== 'i' && format !== 'c') console.log(num);
        num = parseInt(num);
        if(format === 'i'){
          if(num < 59 || num > 76) return false;
        } else if (format === 'c'){
          if(num < 150 || num > 193) return false;
        } else {
          return false;
        }
        break;
      case 'hcl': 
        if(passport[idx] !== '#') return false; 
        valid = '0123456789abcdef';
        // let hex = ''
        for(let j = idx + 1; j < idx + 7; j++){
          // console.log(hex);
          if(!valid.includes(passport[j])) return false;
        }
        break;
      case 'ecl':
        valid = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
        target = passport.substring(idx, idx+3);
        // console.log(target);
        if(!valid.includes(target)) return false; 
        break;
      case 'pid':
        let count = 0;
        let fragment = '';
        valid = '0123456789'
        while(valid.includes(passport[idx])){
          count++;
          idx++;
          fragment += passport[idx];
        }
        if(count !== 9) {
          
          console.log(fragment + '\n'); 
          return false;
        } 
        break;
    }
  }
  return true;
}