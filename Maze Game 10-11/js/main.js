//vars
var floors = document.getElementById('floor'),
    ctx = floors.getContext('2d'),
    height = 5,
    width = 5,
    scrW = floors.width,
    scrH = floors.height,
    rowNum = Math.round(scrH/height),
    collNum = Math.round(scrW/width),
    x = 0,
    y = 0,

    //later used for building mazeWalls
    path = 0;

const left = 'left',
      right = 'right',
      up = 'up',
      down = 'down';

var space = [];
let xArr = x, yArr = y;

//defines class and parameter
class Block{
  constructor(height,width,xArr,yArr){
    this.x = xArr;
    this.y = yArr;
    this.height = height;
    this.width = width;
    this.path = 0;
    this.color = '#ed4b11';
  }
  draw(){
    //if(this.path = 1){ctx.fillStyle = '#ed4b11';}
    //else if (this.path = 1 && rowNum > 25){ctx.strokeStyle = '#1d8a44';}
    //else{ctx.fillStyle = '#000';}
    ctx.fillStyle = '#000';
    ctx.strokeStyle = '#1d8a44';
    ctx.shadowColor = '#ed4b11';
    ctx.lineWidth = 2;
    ctx.fillRect(this.x + 0.05, this.y + 0.05, this.width, this.height);
    ctx.strokeRect(this.x + 0.05, this.y + 0.05, this.width, this.height);
  }
}


startUp();
function startUp(){
  //makes maze
  const wall = createFloor(collNum, rowNum);
  drawAll();
  //add player
}
//nested for loops
function createFloor(collNum, rowNum){
  for(let x = 0; x < collNum; x++){
    console.log("column here");
    for(let y = 0; y < rowNum; y++){
      console.log(x + ', ' + y);
      cell(space, x * 5, y * 5);
    }
  }
}




//for individual cells
function cell(space, x, y){
  //changes x and y
  let xArr = x,
      yArr = y;
  //let mazeWalls = new Block(height, width, xArr, yArr);
  space.push(new Block(height, width, xArr, yArr));

  //shows its working
  //console.log(new Block(height,width,x,y));
}
//draws all squares
function drawAll(){
  for (let i = 0; i < space.length; i++){
    space[i].draw();
  }
}
