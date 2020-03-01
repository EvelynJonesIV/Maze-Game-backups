//----------------------------defines all elements not in other file
var floors = document.getElementById('floor'),
    ctx = floors.getContext('2d'),

    //block width/height
    height = 45,
    width = 45,

    //gives height and width of canvas
    scrW = 850,
    scrH = 1000,

    //makes number of collums and rows
    rowNum = scrH/height,
    collNum = scrW/width,

    //values
    x = 0,
    y = 0,

    mUnit = 2;

let xArr = x, yArr = y;

    spaceW = width *2,
    spaceH = height *2;



//defines character
class Player{
  constructor(){
    this.x = xArr;
    this.y = yArr;
    this.height = height - (height/2.5);
    this.width = width - (width/2.5);

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
      //this.colli();
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
var rat = new Player();
