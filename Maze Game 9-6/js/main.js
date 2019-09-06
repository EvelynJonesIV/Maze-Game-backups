//vars
var floor = document.getElementById('floor'),
    map2 = floor.getContext('2d');


function startUp(){
  alert("Welcome to Game!");

  map2.beginPath();
  map2.strokeStyle = "red";
  map2.rect(20, 20, 150, 100);
  map2.stroke();

}
/*
ctx.beginPath();
ctx.lineWidth = "6";
ctx.strokeStyle = "red";
ctx.rect(5, 5, 290, 140);
ctx.stroke();*/
