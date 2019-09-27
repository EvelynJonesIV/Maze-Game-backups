//vars
var floors = document.getElementById('floor'),
    //ctx = floors.getContext('2d'),
    //space = [][],
    height = 10,
    width = 10,
    rowNum = 10,
    collNum = 10;

const left = 'left',
      right = 'right',
      up = 'up',
      down = 'down';

var space = [];
/*class player{
    y: number;
    x: number;
}*/



startUp();
function startUp(){

}
//nested for loops
function createFloor(collNum, rowNum){
  for(let x=0; x<collNum; x++){
    space[x] = [];
    console.log("column here");
    for(let y=0;y<rowNum;y++){
      addWall(space, x, y);
      console.log(space[x][y]);
    }
  }
}
//making assigned x/y
function addWall(space, x ,y){
  space[x] = space[x] || [];
  cell();
  space[x][y] = x + '|' + y;
}
const wall = createFloor(collNum, rowNum);

//for individual cells
function cell(){

  //ctx.fillRect(20, 20, 150, 100);
}
