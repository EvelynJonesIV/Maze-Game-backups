

//connected to other js, importing rat


//constructs edges
class Sides{
    constructor(){
      let arr = [N, S, E, W];
      this.direction = arr[Math.floor(Math.random() * 4)];
      this.index = Math.floor(Math.random() * 3);
      return this.direction, this.index;

    }
}

class NotMove{
  constructor(x,y){
    this.x = x;
    this.y = y;
    return this.x, this.y;
  }
}
//constructor for buttons and labels in settings
class startButton{
  constructor(x,y, text, width){
    this.width = width;
    this.height = scrH/ 10;
    this.x = x - scrW/20;
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

startBut = new startButton(scrW/2, scrH/2 - (scrH/5)/2, 'Press to Start', scrW/ 4);
setBut = new startButton(scrW/2, scrH/2, 'Settings', scrW/ 4);
colorBut = new startButton(scrW/2 - (scrW/ 2)/2.5, scrH/2 - (scrH/5)/1.85, 'Colors', scrW/ 4);
widthBut = new startButton(scrW/2 - (scrW/ 2)/2.5, scrH/2, 'Challenge',scrW/ 4);
backBut = new startButton(scrW/2, (scrH/1.665), 'Back', scrW/ 4);


//constructor for making settings buttons
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
  }
  change(){
//colors
    floors.onmousedown = function(e){
      if(e.offsetX >= cBlue.x && e.offsetX <= cBlue.x + cBlue.width &&
         e.offsetY >= cBlue.y && e.offsetY <= cBlue.y + cBlue.height &&
         sideMen == true){
           baseColor = cBlue.color;
      }
      if(e.offsetX >= cRed.x && e.offsetX <= cRed.x + cRed.width &&
         e.offsetY >= cRed.y && e.offsetY <= cRed.y + cRed.height &&
         sideMen == true){
           baseColor = cRed.color;
      }
      if(e.offsetX >= cGreen.x && e.offsetX <= cGreen.x + cGreen.width &&
         e.offsetY >= cGreen.y && e.offsetY <= cGreen.y + cGreen.height &&
         sideMen == true){
           baseColor = cGreen.color;
      }
      if(e.offsetX >= cPurple.x && e.offsetX <= cPurple.x + cPurple.width &&
         e.offsetY >= cPurple.y && e.offsetY <= cPurple.y + cPurple.height &&
         sideMen == true){
           baseColor = cPurple.color;
      }

//challenges
      if(e.offsetX >= cEasy.x && e.offsetX <= cEasy.x + cEasy.width &&
         e.offsetY >= cEasy.y && e.offsetY <= cEasy.y + cEasy.height &&
         sideMen == true){
         spaceH = 75,
         spaceW = 75,
         width = 75,
         height = 75;
         easy = true;
         medium = false;
         hard = false;
      }
      if(e.offsetX >= cMed.x && e.offsetX <= cMed.x + cMed.width &&
         e.offsetY >= cMed.y && e.offsetY <= cMed.y + cMed.height &&
         sideMen == true){
         spaceH = 50,
         spaceW = 50,
         width = 50,
         height = 50;
         easy = false;
         medium = true;
         hard = false;
      }
      if(e.offsetX >= cHard.x && e.offsetX <= cHard.x + cHard.width &&
         e.offsetY >= cHard.y && e.offsetY <= cHard.y + cHard.height &&
         sideMen == true){
         spaceH = 25;
         spaceW = 25;
         height = 25;
         width = 25;
         easy = false;
         medium = false;
         hard = true;
      }
//back button
      if(e.offsetX >= backBut.x && e.offsetX <= backBut.x + backBut.width &&
         e.offsetY >= backBut.y && e.offsetY <= backBut.y + backBut.height &&
         sideMen == true){
           startUp();
           mainMen = true;
      }
    }

  }

}

var rat = new Player();
startUp();
//runGame();
//makes start screen and then runs maze
function startUp(){
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, scrW, scrH);
  ctx.fillStyle = baseColor;
  sideMen = false;

  startBut.draw();
  setBut.draw();
  floors.onmousedown = function(e){
    if(e.offsetX >= startBut.x && e.offsetX <= startBut.x + startBut.width &&
       e.offsetY >= startBut.y && e.offsetY <= startBut.y + startBut.height &&
       mainMen == true){
         runGame();
         mainMen = false;
       }
    if(e.offsetX >= setBut.x && e.offsetX <= setBut.x + setBut.width &&
       e.offsetY >= setBut.y && e.offsetY <= setBut.y + setBut.height &&
        mainMen == true){
         changeCS();
         mainMen = false;
       }
  }
}
function runGame(){

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
  sideMen = true;

  //labels for settings
  colorBut.draw();
  widthBut.draw();
  //to main menu
  backBut.draw();

//to change color scheme
  cBlue = new colorChange(scrW/2 + 10, scrH/2 - (scrH/5)/1.85, '#2ECEF2');
  cRed = new colorChange(scrW/2 + scrW/8, scrH/2 - (scrH/5)/1.85, '#F2512E');
  cGreen = new colorChange(scrW/2 + scrW/4.2, scrH/2 - (scrH/5)/1.85, '#267810');
  cPurple = new colorChange(scrW/2 + scrW/2.85, scrH/2 - (scrH/5)/1.85, '#7B0E7B');

  cEasy = new startButton(scrW/2 + scrW/16.3, scrH/2, 'Easy', scrW/ 10);
  cMed = new startButton(scrW/2 + scrW/5, scrH/2, 'Medium', scrW/ 6.25);
  cHard = new startButton(scrW/2 + scrW/2.5, scrH/2, 'Hard', scrW/ 10);

  cBlue.draw();
  cRed.draw();
  cGreen.draw();
  cPurple.draw();



//click detection for color
  cPurple.change();

//click detection for difficulty
  cEasy.draw();
  cMed.draw();
  cHard.draw();




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
    edge.index += 1;
    newDirects = [1, 2, 4, 8];
    edge.direction = newDirects[Math.floor(Math.random()*newDirects.length)];//allDirects[Math.floor(Math.random()*allDirects.length)];
    //defines the current movement and next move

    var i0 = edge.index,          i1;
    let d0 = edge.direction,      d1;
    let x0 = i0 % collNum,        x1;
    let y0 = i0 / collNum | 0,    y1;

    //moves path        how much           x             y              next movement will be
         if (d0 === N) {i1 = i0 - collNum, x1 = x0,      y1 = y0 - 1,   d1 = S}
         if (d0 === S) {i1 = i0 + collNum, x1 = x0,      y1 = y0 + 1,   d1 = N}
         if (d0 === W) {i1 = i0 - 1,       x1 = x0 - 1,  y1 = y0,       d1 = E}
    else               {i1 = i0 + 1,       x1 = x0 + 1,  y1 = y0,       d1 = W}
    //if about to go out of bounds
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
}
function pathMaker(ctx){
  //black base
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, scrW, scrH);
  if(easy == true && medium == false && hard == false){
    multiNum = .5;
  }
  if(easy == false && medium == true && hard == false){
    multiNum = 2;
  }
  if(easy == false && medium == false && hard == true){
    multiNum = 4;
  }
  //changes for path color
  for(i = 0; i < space.length; i++){
    ctx.fillStyle = baseColor;
    //draws each element in space[]
    spaceFiller(scrH, i);
    if(space[i] == S || space[i] ==  N || space[i] <=  3 || space[i] ==  5) southFill(ctx, i);
    if(space[i] == E || space[i] ==  W || space[i] ==  4 || space[i] == 6) eastFill(ctx, i);

  }
  console.log(wallObs);
}

function spaceFiller(scrH,i){
  const xD = (i * multiNum) % spaceW ,
        yD = (i * multiNum) / spaceH | 0;

  ctx.fillRect(
    xD * spaceW + (xD + 1) * spaceSp,
    yD * spaceW + (yD + 1) * spaceSp,
    spaceH, spaceW);
    console.log('space',xD * spaceW + (xD + 1) * spaceSp, yD * spaceW + (yD + 1) * spaceSp);

}
function southFill(ctx,i){
  //fills up and down boxes
  const xD = (i * multiNum) % spaceW,
        yD = (i * multiNum) / spaceH | 0;

  ctx.fillRect(
    xD * spaceW + (xD + 1) * spaceSp,
    (yD + 1) * (spaceH + spaceSp),
    spaceW, spaceH);

    //wallObs.push(new NotMove(xD * spaceW + (xD + 1) * spaceSp,(yD + 1) * (spaceH + spaceSp)));
    //console.log("weast", xD * spaceW + (xD + 1) * spaceSp, (yD + 1) * (spaceH + spaceSp));
}

function eastFill(ctx,i){
  //fills sides of boxes
  const xD = (i * multiNum) % spaceW,
        yD = (i * multiNum) / spaceH | 0;

  ctx.fillRect(
    (xD + 1) * (spaceW + spaceSp),
    yD * spaceH + (yD + 1) * spaceSp,
    spaceW, spaceH);
    //wallObs.push(new NotMove((xD + 1) * (spaceW + spaceSp), yD * spaceH + (yD + 1) * spaceSp));

    //console.log("east", (xD + 1) * (spaceW + spaceSp), yD * spaceH + (yD + 1) * spaceSp);
}
