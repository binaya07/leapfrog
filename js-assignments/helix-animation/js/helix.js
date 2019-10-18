var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
canvas.width = 550;
canvas.height = 550;
var rows = 10;
var cols = 15;
var maxRadius = 15;
var colOffset = 15;
var rowOffset = 15;
var movingDown = true;


function helix() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var col = 0; col < cols; col++) {

      if(rowOffset > 200){
        movingDown = false;
      }
      if(rowOffset <= 15){
        movingDown = true;
      }

      for (var row = 0; row < rows; row++) {
        
        var radius;

        if(movingDown){
          rowOffset = rowOffset + 0.01 + col / 1000;
          radius = 15 + row - rowOffset / 10;
        }
        else{
          rowOffset = rowOffset - 0.01 - col/ 1000;
          radius = 15 - row - rowOffset / 14;
        } 
        if(radius > maxRadius){
          radius = maxRadius;
        }
        else if(radius < 0){
          radius = 0;
        }

        ctx.beginPath();

        ctx.arc(col * 32 + colOffset, row * 32 + rowOffset, radius, 0, Math.PI * 2);
        ctx.arc(col * 32 + colOffset, row * 32 - rowOffset + 215, radius, 0, Math.PI * 2);
      
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
        
      }
          
  }
}


//helix();

setInterval(helix, 1000/60);