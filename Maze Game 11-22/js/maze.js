/*
This is the undirected graph remade using d3, mostly used to show statistics
but also has the capability to be versitile

11/22
made file and put usable code(player) here. found similar in testing.html
transforms maze into span tree
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

    mUnit = 2;

let xArr = x, yArr = y;


var N = 1 << 0,
    S = 1 << 1,
    W = 1 << 2,
    E = 1 << 3,

    spaceW = width,
    spaceH = height;

    function makeMaze(width, height) {
      var spaces = new Array(width * height), // each cell’s edge bits
          remaining = d3.range(width * height), // cell indexes to visit
          previous = new Array(width * height); // current random walk

      // Add the starting cell.
      var start = remaining.pop();
      spaces[start] = 0;

      // While there are remaining cells,
      // add a loop-erased random walk to the maze.
      while (!loopErasedRandomWalk());

      return spaces;

      function loopErasedRandomWalk() {
        var tLeft,
            tRight,
            bLeft,
            bRight;

        // Pick a location that’s not yet in the maze (if any).
        do if ((tLeft = remaining.pop()) == null) return true;
        while (spaces[tLeft] >= 0);

        // Perform a random walk starting at this location,
        previous[tLeft] = tLeft;
        while (true) {
          bLeft = tLeft % width;
          bRight = tLeft / width | 0;

          // picking a legal random direction at each step.
          tRight = Math.random() * 4 | 0;
          if (tRight === 0) {
            if (bRight <= 0)
              continue;
            --bRight, tRight = tLeft - width; }
          else if (tRight === 1) {
             if (bRight >= height - 1)
              continue;
            ++bRight, tRight = tLeft + width; }


          else if (tRight === 2) {
            if (bLeft <= 0)
              continue;
            --bLeft, tRight = tLeft - 1; }
          else {
            if (bLeft >= width - 1)
              continue;
            ++bLeft, tRight = tLeft + 1; }

          // If this new cell was visited previously during this walk,
          // erase the loop, rewinding the path to its earlier state.
          if (previous[tRight] >= 0)
            eraseWalk(tLeft, tRight);

          // Otherwise, just add it to the walk.
          else previous[tRight] = tLeft;

          // If this cell is part of the maze, we’re done walking.
          if (spaces[tRight] >= 0) {

            // Add the random walk to the maze by backtracking to the starting cell.
            // Also erase this walk’s history to not interfere with subsequent walks.
            while ((tLeft = previous[tRight]) !== tRight) {
              if (tRight === tLeft + 1)
                spaces[tLeft] |= E, spaces[tRight] |= W;
              else if (tRight === tLeft - 1)
                spaces[tLeft] |= W, spaces[tRight] |= E;
              else if (tRight === tLeft + width)
                spaces[tLeft] |= S, spaces[tRight] |= N;
              else
                spaces[tLeft] |= N, spaces[tRight] |= S;
              previous[tRight] = NaN;
              tRight = tLeft;
            }

            previous[tRight] = NaN;
            return;
          }

          tLeft = tRight;
        }
      }

      function eraseWalk(tLeft, i2) {
        var tRight;
        do tRight = previous[tLeft], previous[tLeft] = NaN, tLeft = tRight; while (tRight !== i2);
      }
    }




/*
player - adding start screen soon after
*/


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
  /*colli(){
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
  }*/
}
//makes player
var rat = new Player();



/*
starting game
*/
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

}
