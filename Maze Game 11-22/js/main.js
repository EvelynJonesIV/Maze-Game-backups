/*
                              JOURNAL

11/8 Last worked on collision and calling Blocks. algor() and Blocks.colli
Also changing path color

11/20 Working on algorithm and pushing array elements to wallObs
Have to research making my js into a google app to put on cabinet

11/22 trying to import graph, and start from scratch. Used directd graph instead
of undirected graph. looking for graphing libraries ---- found d3 with similar
projects

found similar programs and am finding random maze generation

please see maze.js for all further notes and versions

*/
//-----------------------------------------------------defines all elements
/*var floors = document.getElementById('floor'),
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
    path = 0,


    mUnit = 2;

//holds all 'blocks' and wall collision
var space = [],
    wallObs = [];

let xArr = x, yArr = y;


//--------------------------------------------------defining/ making/moving player
//defines character
class Player{
  constructor(){
    this.x = xArr;
    this.y = yArr;
    this.height = height - (height/2.5);
    this.width = width - (width/2.5);

    this.drawX = 3;
    this.drawY = 3;

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
    drawAll();
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
    if(rat.drawY < wallObs.y - height){
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
  }
}
//makes player
var rat = new Player();*/


//------------------------------------------------defines cells
/*class Block{
  constructor(height,width,xArr,yArr,path){
    this.x = xArr;
    this.y = yArr;
    this.height = height;
    this.width = width;

    this.path = false;
    this.check = true;
    this.color = '#ed4b11';
  }


  draw(){

    ctx.fillStyle = this.color;
    //ctx.strokeStyle = '#21de65';
    //ctx.shadowColor = '#ed4b11';
    ctx.lineWidth = 1.5;
    ctx.fillRect(this.x + 0.05, this.y + 0.05, this.width, this.height);
    ctx.strokeStyle = '#000';
    ctx.strokeRect(this.x + 0.05, this.y + 0.05, this.width, this.height);
  }
}


*/
//------------------------------------------------------starts up game
/*
startUp();
function startUp(){
  //makes and draws maze
  //createFloor(collNum, rowNum);
  //drawAll();
  //new Player();
 rat.draw();
 makeMaze(rowNum, collNum);
  //add event listeners for movement
  window.addEventListener('keydown', function (e) {
      e.preventDefault();
      floors.keys = (floors.keys || []);
      floors.keys[e.keyCode] = (e.type == "keydown");
      var directNum = e.keyCode;
      rat.movement(directNum);
        })

  window.addEventListener('keyup', function (e) {
      floors.keys[e.keyCode] = (e.type == "keydown");
        })

}*/
/*
//-------------------------------------------------drawing and making maze
//make the cubes
function createFloor(collNum, rowNum){
  //nested for loops
  for(let x = 0; x < collNum; x++){
    //shows number of collums
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
  space.push(new Block(height, width, xArr, yArr,path));

//  console.log(space.path);
}

function algor(){
    for(i = 0; i < space.length; i++){
      wallObs.push(space[i]);
    }
  }

*/
//draws all squares
function drawAll(){

  //for loop to make blocks
  for (let i = 0; i < space.length; i++){
    space[i].draw();
  }
  algor();
}
