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

1/15 adding chack screen, merging later today to have edge checkedB and start screen all
completed


1/27 worked on start screen and brute forced the checkedB fixed edges

1/29 messing with numbers in edge, and checkedB to get different results in  the space Array

*/
// breakdown of maze code


//add player from maze.js after maze works HERE

/*
var floors = document.getElementById('floor'),
    ctx = floors.getContext('2d'),

    //block width/height
    height = 25,
    width = 25,

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
*/
let edge;



var N = 1 || 1 << 0,
    S = 2 || 1 << 1,
    W = 4 || 1 << 2,
    E = 8 || 1 << 3,

    allDirects = [N,S,W,E],

    spaceW = width / 1.45,
    spaceH = height / 1.45,

    baseColor = "#fff",

    spaceSp = width - spaceW;

    var checkedB = Array;
    var space;

//constructs edges
class Sides{
    constructor(){
      this.direction = allDirects[Math.floor(Math.random()*allDirects.length)];
      this.index = Math.floor(Math.random() * 3);
      return this.direction, this.index;

    }
}
//start button initialized
class startButton{
  constructor(x,y, text){
    this.width = scrW/ 4.75;
    this.height = scrH/ 10;
    this.x = x;
    this.y = y;
    this.text = text;
 }
 draw(){
   ctx.strokeStyle = this.color;
   ctx.fillStyle = baseColor;
   ctx.lineWidth = 1.5;
   ctx.fillRect(this.x, this.y, this.width, this.height);
   ctx.strokeRect(this.x, this.y, this.width, this.height);

   ctx.font = '35px San Serif';
   ctx.strokeText(this.text, this.x + this.width/14, this.y + this.height/1.75);
 }
}
startBut = new startButton(scrW/2 - (scrW/ 4.75)/2, scrH/2 - (scrH/5)/2, 'Press to Start');
setBut = new startButton(scrW/2 - (scrW/ 4.75)/2, scrH/2, 'Settings')


startUp();

//makes start screen and then runs maze
function startUp(){

  startBut.draw();
  setBut.draw();
  floors.onmousedown = function(e){
    if(e.offsetX >= startBut.x && e.offsetX <= startBut.x + startBut.width &&
       e.offsetY >= startBut.y && e.offsetY <= startBut.y + startBut.height){
         runGame();
       }
  }
}
function runGame(){

  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, scrW, scrH);
  ctx.fillStyle = baseColor;
  rat.draw();

  //pathMaker(ctx);
  primsAl(collNum, rowNum);
  pathMaker(ctx);
}
//preforms prim's algorithm
function primsAl(collNum,rowNum){
  checkedB = [];
  space = new Uint8Array(collNum * rowNum);
  let edge = new Sides();



  //moves path away from walls
  checkedB.push({index: 0, direction: N}, Math.random());
  checkedB.push({index: 0, direction: E}, Math.random());


  for(s = 0; s < space.length; s++){
    //if(s <= 50) edge.push(new Sides());
    //defines the current movement and next move
    var i0 = edge.index,          i1;
    let d0 = edge.direction,      d1;
    let x0 = i0 % collNum,        x1;
    let y0 = i0 / collNum | 0,    y1;


    //moves path        how much          x             y            next movement will be
         if (d0 === N) i1 = i0 - collNum, x1 = x0,      y1 = y0 - 1,   d1 = S, console.log(d0, d1);
         if (d0 === S) i1 = i0 + collNum, x1 = x0,      y1 = y0 + 1,   d1 = N, console.log(d0, d1);
         if (d0 === W) i1 = i0 - 1,       x1 = x0 - 1,  y1 = y0,       d1 = E, console.log(d0, d1);
    else               i1 = i0 + 1,       x1 = x0 + 1,  y1 = y0,       d1 = W, console.log(d0, d1, "else");
    //console.log(i0, i1, d0, d1, x0, x1, y0, y1);
    //if about to go out of bounds
    console.log(space[i1]);
    if (space[i1] === 0){

      space[i0] |= d0, space[i1] |= d1;
      //north wall
      if(y1 > 0           && space[i1 - collNum] === 0)   checkedB.push({index: i1, direction: N}, Math.random());
      //south wall
      if(y1 < rowNum - 1  && space[i1 + collNum] === 0)   checkedB.push({index: i1, direction: S}, Math.random());
      //west wall
      if(x1 > 0           && space[i1 - 1] === 0)         checkedB.push({index: i1, direction: W}, Math.random());
      //south wall
      if(x1 < collNum - 1 && space[i1 + 1] === 0)         checkedB.push({index: i1, direction: E}, Math.random());
    }
  }
  //console.log(edge);
  console.log(checkedB);
  console.log(space);
}
function pathMaker(ctx){
  for(i = 0; i < space.length; i++){
      spaceFiller(scrW, i);
      if(space[i] == (S || N)) southFill(ctx, i);
      if(space[i] == (E || W)) eastFill(ctx, i);

  }
}

function spaceFiller(scrH,i){
  const xD = i % spaceW,
        yD = i % spaceH;

  ctx.fillRect(
    xD * spaceW + (xD + 1) * spaceSp,
    yD * spaceW + (yD + 1) * spaceSp,
    spaceSp, spaceW);
    console.log(xD * spaceW + (xD + 1) * spaceSp, yD * spaceW + (yD + 1) * spaceSp);
    console.log("block");

}
function southFill(ctx,i){
  //fills up and down boxes
  const xD = i % spaceW,
        yD = i / spaceH | 0;

  ctx.fillRect(
    xD * spaceW + (xD + 1) * spaceSp,
    (yD + 1) * (spaceW + spaceSp),
    spaceW, spaceSp);

  ctx.fillRect(
    xD * spaceW + (xD + 1) * spaceSp,
    (yD + 1) * (spaceW + spaceSp),
    spaceW, spaceSp);

    console.log(xD, yD);
    console.log("weast", xD * spaceW + (xD + 1) * spaceSp, (yD + 1) * (spaceW + spaceSp));
}

function eastFill(ctx,i){
  //fills sides of boxes
  const xD = i % spaceW,
        yD = i / spaceH | 0;

  ctx.fillRect(
    (xD + 1) * (spaceSp + spaceSp),
    yD * spaceW + (yD + 1) * spaceSp,
    spaceW, spaceSp);

    console.log(xD, yD);
    console.log("east", (xD + 1) * (spaceSp + spaceSp), yD * spaceW + (yD + 1) * spaceSp);
}
