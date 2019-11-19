/*
Last worked on collision and calling Blocks. algor() and Blocks.colli
Also changing path color

*/
//-----------------------------------------------------defines all elements
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
    path = 0,


    mUnit = 2;

//directions that dont change
const left = 'left',
      right = 'right',
      up = 'up',
      down = 'down';


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

    this.centerX = this.drawX + (this.width /2);
    this.centerY = this.drawY + (this.height /2);

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
      if(rat.drawY < 0){
        rat.drawY += this.mUnit;
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

  }
}
//makes player
var rat = new Player();


//------------------------------------------------defines cells
class Block{
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

    //ctx.fillStyle = '#000';
    //ctx.strokeStyle = '#21de65';
    //ctx.shadowColor = '#ed4b11';
    ctx.lineWidth = 1.5;
    ctx.fillRect(this.x + 0.05, this.y + 0.05, this.width, this.height);
    ctx.strokeStyle = '#000';
    ctx.strokeRect(this.x + 0.05, this.y + 0.05, this.width, this.height);
  }
  algor(){

    if (space[x] < 45){this.path = true;}
    //else if (this.x < 45){this.path = false;}


    console.log(this.path);
    if(this.path == false){

      wallObs.push(space[i]);
    }

    if(this.path == true ){ctx.fillStyle = '#ed4b11';}
    else if (this.path == true && rowNum > 25){ctx.strokeStyle = '#21de65';}
    else{ctx.fillStyle = '#000';}

    this.colli();
  }
  colli(){



  }
}



//------------------------------------------------------starts up game
startUp();
function startUp(){
  //makes and draws maze
  createFloor(collNum, rowNum);
  //new Player();
  drawAll();

  //space;

 rat.draw();
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

}

//-------------------------------------------------drawing and making maze
//make the cubes
function createFloor(collNum, rowNum){
  //nested for loops
  for(let x = 0; x < collNum; x++){
    //shows number of collums
    //console.log("column here");
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

//draws all squares
function drawAll(){
  //for loop to make blocks
  for (let i = 0; i < space.length; i++){
    space[i].draw();
  }
}
