let delayTime = 2000, //mS
  timeToPlay = 10;
let lineLength = 30; //chars, else table starts to shake
let linesNumber = 21; //rows of school subjects
let mkValues = [  //all values of marks
  [ 'mark mG', 5 ],
  [ 'mark mG', 4 ],
  [ 'mark mY', 3 ],
  [ 'mark mR', 2 ],
  [ 'mark mR', 1 ],
  [ 'mark lsB', 'п' ],
  [ 'mark lsB', 'б' ],
  [ 'mark lsY', 'о' ],
  ['mark lsR', 'н']
];
let i = 0;
let all = [];
for(let i = 0; i < linesNumber; i++){
  all[i] = [];
  for(let j = 0; j < lineLength; j++){
    all[i][j] = false;
  }
}
let lines = [];
for (let line = 0; line < linesNumber; line++){
  lines[line] = document.querySelector('.line' + (line+1));
}

let midleMarks = [];
for (let line = 0; line < linesNumber; line++){
  midleMarks[line] = document.querySelector('.mdm' + (line+1));
}
let midleMarksValues = [];
for (let line = 0; line < linesNumber; line++){
  midleMarksValues[line] = 0;
}
let finalMarks = [];
for (let line = 0; line < linesNumber; line++){
  finalMarks[line] = document.querySelector('.fm' + (line+1));
}

let space ='<span class="mark mO" style="opacity: 0">#</span>'; //invisible mark to fill table
for( let row = 0; row < linesNumber; row++){
  for( let char = 0; char < lineLength; char++){
    lines[row].innerHTML += space;
  }
}

let drops = []; //drops which you see
for(let row = 0; row < linesNumber; row++){ 
  drops[row] = 0 /*Math.floor(Math.random() * 15)*/;
}

function clear(){
  for (let row = 0; row < linesNumber; row++){
    for( let char = 0; char < lineLength; char++){
      if (lines[row].children[char].style.opacity > 0){
        lines[row].children[char].style.opacity -= .04;
      }else{
        all[row][char] = true;
      }
    }
    
    //midleMarks[row].style.opacity -= .02;
    //finalMarks[row].style.opacity -= .02;
    midleMarks[row].style.opacity -= (Math.random() * .2).toFixed(2);
    finalMarks[row].style.opacity -= (Math.random() * .2).toFixed(2);
  }
  let count = 0;
  for(let row = 0; row < linesNumber; row++){
    if(!all[row].includes(false)){
      count++;
    }
  }
  if(count == 21){
    clearInterval(clr);
    console.log('done');
  }
}

function setMark(){
  let mark = document.createElement('span');
  let mkValue = mkValues[Math.floor(Math.random() * mkValues.length)];
  mark.classList = mkValue[0];
  mark.style.opacity = 1;
  mark.innerHTML = mkValue[1];
  return mark;
}

function setOtherMarks(row){
  let value = (5 - midleMarksValues[row]/drops[row]).toFixed(2);
  let mkClass
  for(let cls = 4; cls >= 0; cls--){
    if(Math.round(value) <= mkValues[cls][1]){
      mkClass = mkValues[cls][0];
      break;
    }
  }
  finalMarks[row].classList = mkClass;
  finalMarks[row].innerHTML = Math.round(value);
  midleMarks[row].classList = mkClass;
  value *= 100;
  midleMarks[row].innerHTML = Math.floor(value/100) + ',' + (value % 100).toFixed();
}

function rain3(){
  for (let row = 0; row < linesNumber; row++){
    for( let char = 0; char < lineLength; char++){
      lines[row].children[char].style.opacity -= .08;
    }
    drops[row]++;
    setOtherMarks(row);
    if(drops[row] > Math.random() * 100 + 10 || drops[row] >= lineLength){ 
      drops[row] = 0;
      midleMarksValues[row] = 0;
    }
    let mark = setMark();
    lines[row].replaceChild(mark, lines[row].children[drops[row]]);
    if(Number.isInteger(parseInt(mark.innerHTML))){
      midleMarksValues[row] += parseInt(mark.innerHTML);
    }
  }
}
let clr;
setTimeout(function(){  //delay for start matrix
  let intro = setInterval(rain3, 1000/30);

  //inter = setInterval(function(){
    //i++;
    //console.log(i);
    //if (i == timeToPlay){
      //clearInterval(intro);
      //clearInterval(inter);
      //clr = setInterval(clear, 1000/30);
    //}
  //}, 1000);

}, delayTime);

