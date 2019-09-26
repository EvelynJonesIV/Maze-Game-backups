//vars
var floors = document.getElementById('floor'),
    //ctx = floors.getContext('2d'),
    //walls = [][],
    height = 10,
    width = 10,
    rowNum = 10,
    collNum = 10;

const left = 'left',
      right = 'right',
      up = 'up',
      down = 'down',
      walls = [];
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
    walls[x] = [];
    console.log("column here");
    for(let y=0;y<rowNum;y++){
      addWall(walls, x, y);
      console.log(walls[x][y]);
    }
  }
}

function addWall(walls, x ,y){
  walls[x][y] = cell();
}
const wall = createFloor(collNum, rowNum);

//for individual cells
function cell(){
  //ctx.fillRect(20, 20, 150, 100);
}
