/*
        Project Journal
12/1 used tutorial maze and created maze genorator and path filler
this uses the width of paths and walls and draws the blocks. Collition
is ging to have to take the squares that are drawn and allow movement in
only these places(array?) figure out queue = class from tutorial and way
touse it to make edges actual numbers. Fix bugs and make maze draw
(take it back a step and only draw the squares before madding where walls are)

12/2 added console logs tofind that .push isnt putting anthing into Array
allowing values into array with defining var as array; edge undefined and
checkedB.pop is native code but fixing while loop; taking algorthm break to
make sinple start screen;

12/13 fixing random values in checkedB, use queues to fix edges and checkedB
finish start screen,

1/3 old version editing to be like new verison on home computer, later combined to fix all issues
this one works on edge and had checkedB (possible start screen)

*/
// breakdown of maze code


//add player from maze.js after maze works HERE


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

    mUnit = 2;

let xArr = x, yArr = y;

let edge;// = new Sides();



var N = 1 << 0,
    S = 1 << 1,
    W = 1 << 2,
    E = 1 << 3,

    spaceW = width / 1.45,
    spaceH = height / 1.45,

    spaceSp = width - spaceW;

    var checkedB = Array;
    var space;

class Sides{
    constructor(){
      return this.index = 0;
       return this.direction = S;
    }
}




startUp();

//makes start screen and then runs maze
function startUp(){
  ctx.font = '20px San Serif';
  ctx.strokeText('Press to Start', scrW/2, scrH/2);
  window.addEventListener('click', runGame());
  //runGame();
}

function runGame(){

  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, scrW, scrH);
  ctx.fillStyle = "#fff";

  //pathMaker(ctx);
  primsAl(collNum, rowNum);
}
//preforms prim's algorithm
function primsAl(collNum,rowNum){
  checkedB = [];
  space = new Uint8Array(collNum * rowNum);
  let edge;



  //moves path away from walls
  checkedB.push({index: 0, direction: N}, Math.random());
  checkedB.push({index: 0, direction: E}, Math.random());
  //console.log(checkedB);

  for(s = 0; s < space.length; s++){
    edge = new Sides();
    //defines the current movement and next move
    var i0 = edge.index,        i1;
    let d0 = edge.direction,    d1;
    let x0 = i0 % collNum,      x1;
    let y0 = i0 / collNum | 0,  y1;

    //moves path        how much          x             y            next movement will be
         if (d0 === N) i1 = i0 - collNum, x1 = x0,      y1 = y0 - 1,   d1 = S;
         if (d0 === S) i1 = i0 + collNum, x1 = x0,      y1 = y0 + 1,   d1 = N;
         if (d0 === W) i1 = i0 - 1,       x1 = x0 - 1,  y1 = y0,       d1 = E;
    else               i1 = i0 + 1,       x1 = x0 + 1,  y1 = y0,       d1 = W;
    //console.log(i0);
    //if about to go out of bounds
    if (space[i1] === 0){
      space[i0] |= d0, space[i1] |= d1;
      //north wall
      if(y1 > 0          && space[i1 - collNum] === 0)   checkedB.push({index: i1, direction: N}, Math.random());
      //south wall
      if(y1 < rowNum - 1 && space[i1 + collNum] === 0)   checkedB.push({index: i1, direction: S}, Math.random());
      //west wall
      if(x1 > 0          && space[i1 - 1] === 0)         checkedB.push({index: i1, direction: W}, Math.random());
      //south wall
      if(x1 < collNum - 1 && space[i1 + 1] === 0)        checkedB.push({index: i1, direction: E}, Math.random());
    }
  }
}
function pathMaker(ctx){
  for(j = 0; j < space.length(); j++){
      /*spaceFiller(floorsWH, i);
      if(space[i] & S) southFill(ctx, i);
      if(space[i] & E) eastFill(ctx, i);*/

  }
}
