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

1/3 old version editing to be like new verison on home computer,
later combined to fix all issues
this one works on edge and had checkedB (possible start screen)

1/15 adding chack screen, merging later today to have edge checkedB and start screen all
completed


1/27 worked on start screen and brute forced the checkedB fixed edges

1/29 messing with numbers in edge, and checkedB to get different results in  the space Array

1/30 got start screen basics done, add settings page later.
Got random blocks to spawn, but need to change space output not have 5,6, and 12 (not directions)
Added player by connecting js files to html and calling on in startup.

*/
// breakdown of maze code


//connected to other js, importing rat

//let edge;



var N = 1, //<< 0,
    S = 2, //<< 1,
    W = 4, //<< 2,
    E = 8, //<< 3,

    spaceW = width ,//*1.05,
    spaceH = height ,//*1.05,

    baseColor = "#fff",

    mainMen = true,
    sideMen = false,


    spaceSp = width - spaceW;

    var checkedB = Array;
    var space;

//constructs edges
class Sides{
    constructor(){
      let arr = [N, S, E, W];
      this.direction = arr[Math.floor(Math.random() * 4)];//allDirects[Math.floor(Math.random()*allDirects.length)];
      this.index = Math.floor(Math.random() * 3);
      return this.direction, this.index;

    }
}
//start button initialized
class startButton{
  constructor(x,y, text, width){
    this.width = width;
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
startBut = new startButton(scrW/2 - (scrW/ 5.5)/2, scrH/2 - (scrH/5)/2, 'Press to Start', scrW/ 4);
setBut = new startButton(scrW/2 - (scrW/ 5.5)/2, scrH/2, 'Settings', scrW/ 4);
colorBut = new startButton(scrW/2 - (scrW/ 2)/2, scrH/2 - (scrH/5)/1.5, 'Colors', scrW/ 4);
widthBut = new startButton(scrW/2 - (scrW/ 2)/2, scrH/2 - (scrH/5)/6.25, 'Difficulty', scrW/ 4);

class colorChange{
  constructor(x,y,color){
    this.width = scrW/10;
    this.height = scrH/10;
    this.x = x;
    this.y = y;
    this.color = color;
  }
  draw(){


    ctx.fillStyle = this.color;
    ctx.lineWidth = 1.5;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    floors.onmousedown = function(e){
      if(e.offsetX >= this.x && e.offsetX <= this.x + this.width &&
         e.offsetY >= this.y && e.offsetY <= this.y + this.height){
           baseColor = this.color;
           console.log("color")
           //runGame();
         }
    }
  }
}


startUp();
//runGame();
//makes start screen and then runs maze
function startUp(){
  if(mainMen == true){
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, scrW, scrH);


    startBut.draw();
    setBut.draw();
    floors.onmousedown = function(e){
      if(e.offsetX >= startBut.x && e.offsetX <= startBut.x + startBut.width &&
         e.offsetY >= startBut.y && e.offsetY <= startBut.y + startBut.height && mainMen == true){
           mainMen = false;
           sideMen = false;
           runGame();
         }
      if(e.offsetX >= setBut.x && e.offsetX <= setBut.x + setBut.width &&
         e.offsetY >= setBut.y && e.offsetY <= setBut.y + setBut.height && mainMen == true){
           mainMen = false;
           sideMen = true;
           changeCS();
         }
    }

  }
}
function runGame(){
  sideMen = false;
  mainMen = false;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, scrW, scrH);
  ctx.fillStyle = baseColor;



  //pathMaker(ctx);
  primsAl(collNum, rowNum);
  pathMaker(ctx);

  rat.draw();

  window.addEventListener('keydown', function (e) {
      e.preventDefault();
      floors.keys = (floors.keys || []);
      floors.keys[e.keyCode] = (e.type == "keydown");
      var directNum = e.keyCode;
      pathMaker(ctx);
      rat.movement(directNum);
    });


  window.addEventListener('keyup', function (e) {
      floors.keys[e.keyCode] = (e.type == "keydown");
    });


}

function changeCS(){
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, scrW, scrH);

//labels
  colorBut.draw();
  widthBut.draw();

//making buttons
  //colors
  cBlue = new colorChange(scrW/2 + 10, scrH/2 - (scrH/5)/1.5, 'blue');
  cRed = new colorChange(scrW/2 + scrW/8, scrH/2 - (scrH/5)/1.5, 'red');
  cGreen = new colorChange(scrW/2 + scrW/4.2, scrH/2 - (scrH/5)/1.5, 'green');
  cPurple = new colorChange(scrW/2 + scrW/2.856, scrH/2 - (scrH/5)/1.5, 'purple');
  //sizes
  sBut = new startButton(scrW/2 + 10, scrH/2 - (scrH/5)/6.25, 'Easy', scrW/ 10);
  mBut = new startButton(scrW/2 + scrW/6.7, scrH/2 - (scrH/5)/6.25, 'Medium', scrW/ 6);
  hBut = new startButton(scrW/2 + scrW/2.856, scrH/2 - (scrH/5)/6.25, 'Hard', scrW/ 8);
  backBut = new startButton(scrW/2 - scrW/10, scrH/2 + (scrH/14), 'Back to Main Menu', scrW/ 2.6);
if(sideMen == true){
    //activating buttons
    cBlue.draw();
    cRed.draw();
    cGreen.draw();
    cPurple.draw();

    sBut.draw();
    mBut.draw();
    hBut.draw();

    backBut.draw();

    floors.onmousedown = function(e){
      if(e.offsetX >= cBlue.x && e.offsetX <= cBlue.x + cBlue.width &&
         e.offsetY >= cBlue.y && e.offsetY <= cBlue.y + cBlue.height && sideMen == true){
           baseColor = 'blue';
        }
      if(e.offsetX >= cRed.x && e.offsetX <= cRed.x + cRed.width &&
         e.offsetY >= cRed.y && e.offsetY <= cRed.y + cRed.height && sideMen == true){
           baseColor = 'red';
        }
      if(e.offsetX >= cGreen.x && e.offsetX <= cGreen.x + cGreen.width &&
         e.offsetY >= cGreen.y && e.offsetY <= cGreen.y + cGreen.height && sideMen == true){
           baseColor = 'green';
        }
      if(e.offsetX >= cPurple.x && e.offsetX <= cPurple.x + cPurple.width &&
         e.offsetY >= cPurple.y && e.offsetY <= cPurple.y + cPurple.height && sideMen == true){
           baseColor = 'purple';
        }
      if(e.offsetX >= sBut.x && e.offsetX <= sBut.x + sBut.width &&
         e.offsetY >= sBut.y && e.offsetY <= sBut.y + sBut.height && sideMen == true){
           width = 15;
           height = 15;
        }
      if(e.offsetX >= mBut.x && e.offsetX <= mBut.x + mBut.width &&
         e.offsetY >= mBut.y && e.offsetY <= mBut.y + mBut.height && sideMen == true){
           width = 25;
           height = 25;
        }
      if(e.offsetX >= hBut.x && e.offsetX <= hBut.x + hBut.width &&
         e.offsetY >= hBut.y && e.offsetY <= hBut.y + hBut.height && sideMen == true){
           width = 30;
           height = 30;
        }
      if(e.offsetX >= backBut.x && e.offsetX <= backBut.x + backBut.width &&
         e.offsetY >= backBut.y && e.offsetY <= backBut.y + backBut.height && sideMen == true){
           sideMen = false;
           mainMen = true;
           startUp();
        }
    }
  }
}

//preforms prim's algorithm
function primsAl(collNum,rowNum){
  checkedB = [];
  space = new Uint8Array(collNum * rowNum);
  //for(i = 0; i < space.length; i++){
    let edge = new Sides();

  //moves path away from walls
  checkedB.push({index: 0, direction: N}, Math.random());
  checkedB.push({index: 0, direction: E}, Math.random());


  for(s = 0; s < space.length; s++){
    edge.index += 1;
    newDirects = [1, 2, 4, 8];
    edge.direction = newDirects[Math.floor(Math.random()*newDirects.length)];
    //defines the current movement and next move

    var i0 = edge.index,          i1;
    let d0 = edge.direction,      d1;
    let x0 = i0 % collNum,        x1;
    let y0 = i0 / collNum | 0,    y1;


    //moves path        how much           x             y              next movement will be
         if (d0 === N) {i1 = i0 - collNum, x1 = x0,      y1 = y0 - 1,   d1 = S}//, console.log(d0, d1)}
         if (d0 === S) {i1 = i0 + collNum, x1 = x0,      y1 = y0 + 1,   d1 = N}//, console.log(d0, d1)}
         if (d0 === W) {i1 = i0 - 1,       x1 = x0 - 1,  y1 = y0,       d1 = E}//, console.log(d0, d1)}
    else               {i1 = i0 + 1,       x1 = x0 + 1,  y1 = y0,       d1 = W}//, console.log(d0, d1, "else")}
    //if about to go out of bounds
    //console.log(space[i1]);
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
  //console.log(checkedB);
  //console.log(space);
}
function pathMaker(ctx){
  //black base
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, scrW, scrH);

  //changes for path color
  ctx.fillStyle = baseColor;
  for(i = 0; i < space.length; i++){
    //draws each element in space[]
      //spaceFiller(scrH, i);
      if(space[i] == S || space[i] ==  N || space[i] ==  1 || space[i] ==  2) southFill(ctx, i);
      if(space[i] == E || space[i] ==  W || space[i] ==  4 || space[i] ==  8) eastFill(ctx, i);

  }
}

function spaceFiller(scrH,i){
  const xD = i % spaceW,
        yD = i / spaceH | 0;

  ctx.fillRect(
    xD * spaceW + (xD + 1) * spaceSp,
    yD * spaceW + (yD + 1) * spaceSp,
    spaceH, spaceW);
    console.log(xD * spaceW + (xD + 1) * spaceSp, yD * spaceW + (yD + 1) * spaceSp);

}
function southFill(ctx,i){
  //fills up and down boxes
  const xD = i % spaceW,
        yD = i / spaceH | 0;

  ctx.fillRect(
    xD * spaceW + (xD + 1) * spaceSp,
    (yD + 1) * (spaceH + spaceSp),

    spaceW, spaceH);

    console.log("weast", xD * spaceW + (xD), (yD + 1) * (spaceH + spaceSp));
}

function eastFill(ctx,i){
  //fills sides of boxes
  const xD = i % spaceW,
        yD = i / spaceH | 0;

  ctx.fillRect(
    (xD + 1) * (spaceW + spaceSp),
    yD * spaceH + (yD + 1) * spaceSp,
    spaceW, spaceH);

    console.log("east", (xD + 1) * (spaceH + spaceSp), yD * spaceW + (yD + 1) * spaceSp);
}
