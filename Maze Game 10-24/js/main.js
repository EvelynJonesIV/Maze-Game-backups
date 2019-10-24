//vars
var floors = document.getElementById('floor'),
    ctx = floors.getContext('2d'),

    //block width/height
    height = 15,
    width = 15,

    //gives height and width of canvas
    scrW = floors.width,
    scrH = floors.height,

    //makes number of collums and rows
    rowNum = scrH/height,
    collNum = scrW/width,

    //values
    x = 0,
    y = 0,

    //later used for building mazeWalls
    path = 0;

//directions that dont change
const left = 'left',
      right = 'right',
      up = 'up',
      down = 'down';


//holds all 'blocks' and wall collision
var space = [],
    wallObs = [];

let xArr = x, yArr = y;

//defines character
class Player{
  constructor(){
    this.x = xArr;
    this.y = yArr;
    this.height = height - (height/3);
    this.width = width - (width/3);

    this.drawX = 0;
    this.drawY = 0;

    this.centerX = this.drawX + (this.width /2);
    this.centerY = this.drawY + (this.height /2);

    this.color = '#111';

    //keys
    this.isUpKey = false;
    this.isRightKey = false;
    this.isDownKey = false;
    this.isLeftKey = false;

  }
  draw(){
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 1.5;
    ctx.fillRect(this.x + 3, this.y + 3, this.width, this.height);
    ctx.strokeRect(this.x + 3, this.y + 3, this.width, this.height);
  }
}

//makes player
var mouse = new Player();


//class and parameters
//defines every cell built
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
    if(this.path == 1){ctx.fillStyle = '#ed4b11';}
    else if (this.path == 1 && rowNum > 25){ctx.strokeStyle = '#21de65';}
    //else{ctx.fillStyle = '#000';}


    //ctx.fillStyle = '#000';
    ctx.strokeStyle = '#21de65';
    //ctx.shadowColor = '#ed4b11';
    ctx.lineWidth = 1.5;
    ctx.fillRect(this.x + 0.05, this.y + 0.05, this.width, this.height);
    ctx.strokeRect(this.x + 0.05, this.y + 0.05, this.width, this.height);
  }
}


startUp();
function startUp(){
  //makes and draws maze
  const wall = createFloor(collNum, rowNum);
  new Player();
  drawAll();


  //shows blocks values
  console.log(Player);
  console.log(floors.width + ' ' + floors.height);


  //add player later
}
//make the amount of
function createFloor(collNum, rowNum){
  //nested for loops
  for(let x = 0; x < collNum; x++){
    //shows number of collums
    console.log("column here");
    for(let y = 0; y < rowNum; y++){
      //calls to function for making new blocks
      cell(space, x, y);
    }
  }
}




//for individual cells
function cell(space, x, y){
  //changes x and y for height and width
  let xArr = x * width,
      yArr = y * height;
  //adds block to space array
  space.push(new Block(height, width, xArr, yArr));
}

//draws all squares
function drawAll(){
  //for loop to make blocks
  for (let i = 0; i < space.length; i++){
    space[i].draw();
  }
  mouse.draw();
}
