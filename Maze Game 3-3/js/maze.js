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

1/31 fixed broken space(just logging wrong values), color settings started, finishing today
changing x,y to be centered. Finished variability in color, and size as well as start sideMenu
Left are deined maze, filling canvas with maze(goes off screen)
working on collision(not interacting), tweeking settings page

3/2 finishing collision(not implementing), filling canvas with maze(goes off screen),
settings menu finished



*/



//----------------------------defines all elements

var floors = document.getElementById('floor'),
    ctx = floors.getContext('2d'),

    //block width/height


    //gives height and width of canvas
    scrW = 850,
    scrH = 1000,

    //makes number of collums and rows

    //values
    x = 0,
    y = 0,

    mUnit = 2;

var N = 1, //<< 0,
    S = 2, //<< 1,
    W = 4, //<< 2,
    E = 8, //<< 3,

    height = 45,
    width = 45,

    spaceW = width,
    spaceH = height,

    rowNum = scrH/height | 0,
    collNum = scrW/width | 0,


    baseColor = "#fff",

    mainMen = true,
    sideMen = false,

    spaceSp = width - spaceW;

    var checkedB = Array,
        space,
        wallObs = []

        easy = false,
        medium = true,
        hard = false,
        multiNum = 2;



let xArr = x, yArr = y;


//defines character
class Player{
  constructor(){
    this.x = xArr;
    this.y = yArr;
    this.height = height - (height/1.85);
    this.width = width - (width/1.85);

    this.drawX =10;
    this.drawY = 10;

    this.color = '#888';
    this.mUnit = mUnit;

  }
  draw(){
    ctx.strokeStyle = this.color;
    ctx.fillStyle = '#000';
    ctx.lineWidth = 1.5;
    ctx.fillRect(this.drawX, this.drawY, this.width, this.height);
    ctx.strokeRect(this.drawX, this.drawY, this.width, this.height);
  }

  movement(directNum){
    //draws and erases character
    //different keys move in different directions
    //drawAll();
    if(directNum == 37){
      this.drawX -= this.mUnit;
      this.draw();

    }
    else if(directNum == 39){
      this.drawX += this.mUnit;
      this.draw();

    }
    else if(directNum == 38){
      this.drawY -= this.mUnit;
      this.draw();
    }

    else if(directNum == 40){
      this.drawY += this.mUnit;
      this.draw();
    }
    this.outLine();
    //this.colli();

  }
  outLine(){
    //top
      if(this.drawY < 0){
        this.drawY += this.mUnit;
      }
      //botom
      if(rat.drawY > floors.height - (rat.height)){
        rat.drawY -= this.mUnit;
      }
      //left
      if(rat.drawX < 0){
        rat.drawX += this.mUnit;
      }
      //right
      if(rat.drawX > floors.width - (rat.width)){
        rat.drawX-= this.mUnit;
      }
      this.colli();
  }
  colli(){
    //top
    if(rat.drawY > wallObs.y){
      rat.drawY -= rat.height;
      console.log('move');
    }
    //bottom
    if(rat.drawY < wallObs.y - height ){
      rat.drawY += rat.height;
      console.log('move');
    }
    if(rat.drawX > wallObs.x){
      rat.drawX -= rat.width;
      console.log('move');
    }
    if(rat.drawX < wallObs.x - width){
      rat.drawX += rat.width;
      console.log('move');
    }
    if(rat.drawY > wallObs.y && rat.drawY < wallObs.y - height &&
       rat.drawX > wallObs.x && rat.drawX < wallObs.x - width){
         rat.drawX -= rat.width;
         if(rat.drawY > wallObs.y && rat.drawY < wallObs.y - height &&
            rat.drawX > wallObs.x && rat.drawX < wallObs.x - width){
              rat.drawX += rat.width;
              if(rat.drawY > wallObs.y && rat.drawY < wallObs.y - height &&
                 rat.drawX > wallObs.x && rat.drawX < wallObs.x - width){
                   rat.drawY -= rat.height;
                   if(rat.drawY > wallObs.y && rat.drawY < wallObs.y - height &&
                      rat.drawX > wallObs.x && rat.drawX < wallObs.x - width){
                        rat.drawY += rat.height;
                      }
                 }
            }
    }
  }
}
