//vars
var floors = document.getElementById('floor'),
    //ctx = floors.getContext('2d'),
    height = 10,
    width = 10,
    rowNum = 10,
    collNum = 10;

const left = 'left',
      right = 'right',
      up = 'up',
      down = 'down';

var space = [];

//defines class
class Block{
  constructor(height,width,x,y){
    this.y = x;
    this.x = y;
    this.height = height;
    this.width = width;
    this.path = 0;
    //this.color = #;

  }
}


startUp();
function startUp(){

}
//nested for loops
function createFloor(collNum, rowNum){
  for(let x=0; x<collNum; x++){
    console.log("column here");
    for(let y=0;y<rowNum;y++){
      addWall(space, x, y);
    }
  }
}
//making assigned x/y
function addWall(space, x ,y){
  cell(space, x, y);
}
const wall = createFloor(collNum, rowNum);

//for individual cells
function cell(space, x, y){
  let xArr = x, yArr = y;
  let mazeWalls = new Block(height, width, xArr, yArr);
  console.log(new Block(height,width,x,y));

  //ctx.fillRect(20, 20, 150, 100);
}
