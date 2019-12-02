/*
        Project Journal
12/1 used tutorial maze and created maze genorator and path filler
this uses the width of paths and walls and draws the blocks. Collition
is ging to have to take the squares that are drawn and allow movement in
only these places(array?) figure out queue = class from tutorial and way
touse it to make edges actual numbers. Fix bugs and make maze draw
(take it back a step and only draw the squares before madding where walls are)


*/
// breakdown of maze code
//add player from maze.js after maze works
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

    Queue = class{},
    //values
    x = 0,
    y = 0,

    mUnit = 2;

let xArr = x, yArr = y;
let edge;

var N = 1 << 0,
    S = 1 << 1,
    W = 1 << 2,
    E = 1 << 3,

    spaceW = width / 1.45,
    spaceH = height / 1.45;

    spaceSp = width - spaceW;

    var checkedB = new Queue();
    var space = new Uint8Array(collNum * rowNum);

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, scrW, scrH);
    ctx.fillStyle = "#fff"

function startUp(){
  pathMaker(ctx);
}

//preforms prim's algorithm
function primsAl(collNum,rowNum){
  checkedB = new Uint8Array;
  space = newUint8Array(collNum * rowNum);


  //moves path away from walls
  checkedB.push({index: 0, direction: N}, Math.random());
  checkedB.push({index: 0, direction: E}, Math.random());

  while(edge = checkedB.pop()){
    //defines the current movement and next move
    let i0 = edge.index, i1;
    let d0 = edge.direction, d1;
    let x0 = i0 % collNum, x1;
    let y0 = i0 / collNum | 0, y1;
    //moves path        how much          x         y           next movement will be
         if (d0 === N) i1 = i0 - collNum, x1 = x0, y1 = y0 - 1, d1 = S;
    else if (d0 === S) i1 = i0 + collNum, x1 = x0, y1 = y0 + 1, d1 = N;
    else if (d0 === W) i1 = i0 - 1,     x1 = x0 - 1, y1 = y0,   d1 = E;
    else               i1 = i0 + 1,     x1 = x0 + 1, y1 = y0,   d1 = W;
    //if about to go out of bounds
    if (space[i1] === 0){
      spaces[i0] |= d0, space[i1] |= d1;
      //north wall
      if(y1 > 0 && space[i1 - collNum] === 0){checkedB.push({index: i1, direction: N}, Math.random());}
      //south wall
      if(y1 < rowNum - 1 && space[i1 + collNum] === 0){checkedB.push({index: i1, direction: S}, Math.random());}
      //west wall
      if(x1 > 0 && space[i1 - 1] === 0){checkedB.push({index: i1, direction: W}, Math.random());}
      //south wall
      if(x1 < collNum - 1 && space[i1 + 1] === 0){checkedB.push({index: i1, direction: E}, Math.random());}
    }
  }
  return space;
}

function pathMaker(ctx){
  for(let y = 0, i = 0; y < spaceH; ++y){
    for (let q = 0; x < spaceW; ++q, ++i){
      spaceFiller(floorsWH, i);
      if (space[i] & S) southFill(ctx, i);
      if (space[i] & E) eastFill(ctx, i);
    }
  }
}
function spaceFiller(ctx, i){
  const xD = i % spaceW;
  const yD = i / spaceW | 0;
  ctx.fillRect(
    xD * spaceW + (xD + 1) * spaceSp,
    yD * spaceW + (yD + 1) * spaceSp,
    spaceSp, spaceW
  );
}
function southFill(ctx, i){
  const xD = i % spaceW;
  const yD = i / spaceW | 0;
  ctx.fillRect(
    xD * spaceW + (xD + 1) * spaceSp,
    (yD + 1) * (spaceW + spaceSp),
    spaceW, spaceSp
  );
}

function eastFill(ctx, i){
  const xD = i % spaceW;
  const yD = i / spaceW | 0;
  ctx.fillRect(
    (xD + 1) * (spaceSp + spaceSp),
    yD * spaceW + (yD + 1) * spaceSp,
    spaceW, spaceSp
  );
}
