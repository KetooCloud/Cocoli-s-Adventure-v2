// Constants
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 500;
const GRAVITY = 0.1;
const JUMP_SPEED = 4;
const PIPE_SPEED = 2;
const PIPE_GAP = 120;
const PIPE_WIDTH = 50;
const PIPE_COLOR = "#006600";
const BIRD_SIZE = 20;
const BIRD_COLOR = "#FFCC00";

// Variables
var canvas;
var ctx;
var bird;
var pipes;
var score;
var isPlaying;

// Bird class
class Bird {
  constructor() {
    this.x = CANVAS_WIDTH / 2;
    this.y = CANVAS_HEIGHT / 2;
    this.speed = 0;
  }

  draw() {
    ctx.fillStyle = BIRD_COLOR;
    ctx.fillRect(this.x - BIRD_SIZE / 2, this.y - BIRD_SIZE / 2, BIRD_SIZE, BIRD_SIZE);
  }

  update() {
    this.speed += GRAVITY;
    this.y += this.speed;
  }

  jump() {
    this.speed = -JUMP_SPEED;
  }
}

// Pipe class
class Pipe {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = PIPE_WIDTH;
    this.height = CANVAS_HEIGHT - y;
  }

  draw() {
    ctx.fillStyle = PIPE_COLOR;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.x -= PIPE_SPEED;
  }

  isColliding(bird) {
    if (bird.x + BIRD_SIZE / 2 > this.x && bird.x - BIRD_SIZE / 2 < this.x + this.width) {
      if (bird.y - BIRD_SIZE / 2 < this.y || bird.y + BIRD_SIZE / 2 > this.y + this.height) {
        return true;
      }
    }
    return false;
  }
}

// Initialize game
function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  bird = new Bird();
  pipes = [];
  score = 0;
  isPlaying = true;

  // Generate initial pipes
  for (var i = 0; i < 3; i++) {
    var x = CANVAS_WIDTH + i * (PIPE_WIDTH + PIPE_GAP);
    var y = Math.random() * (CANVAS_HEIGHT - 200) + 100;
    pipes.push(new Pipe(x, y));
  }

  // Event listener for jumping
  canvas.addEventListener("click", function() {
    bird.jump();
  });

  // Start game loop
  setInterval(update, 10);
}

// Main game loop
function update() {
  // Clear canvas
  ctx.clearRect(0, 0,
Raw
Oflappy.html
<html>
<head>
 <title>Flappy Bird</title>
   <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
 <link href='https://fonts.googleapis.com/css?family=Pacifico' rel='stylesheet'>
  <link href='https://fonts.googleapis.com/css?family=Permanent Marker' rel='stylesheet'>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
 </head>
 <style>
 #div1 {
  font-size:48px; }
     body { background-color: #721bc4 ; font-family: 'Pacifico'; }
     h1{ background-color: #a666e3 ; text-shadow:5px 5px 5px  #dfd2ec ; text-align:center;}
     canvas{ animation: mymove 5s infinite;  border: 5px solid   #0a3cda  ; border-style:dotted; border-radius: 15px 50px; }
     @keyframes mymove {
    50% {box-shadow: 10px 20px 30px blue;} }
     h3{ font-family:'Permanent Marker'; }
 </style> 
 <body>
     <div id="div1" class="fa"></div>
     
<canvas id="myCanvas" width=320 height=480 
 style="background:url('http://s2js.com/img/etc/flappyback.png');  background-size: 100%; height: 95% " 
</canvas>
    <h3> <i onclick="myFunction(this)" class="fa fa-thumbs-up"></i></h3>
<script> 
function smile() {
  var a;
  a = document.getElementById("div1");
  a.innerHTML = "&#xf118;";
  setTimeout(function () {
      a.innerHTML = "&#xf11a;";
    }, 1000);
  setTimeout(function () {
      a.innerHTML = "&#xf119;";
    }, 2000);
  setTimeout(function () {
      a.innerHTML = "&#xf11a;";
    }, 3000);
}
smile();
setInterval(smile, 4000);

function myFunction(x) {
    x.classList.toggle("fa-thumbs-down");
}
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//
 var ctx = myCanvas.getContext("2d"); 
 var FPS = 40;                  
 var jump_amount = -10;              
 var max_fall_speed= +10;             
 var acceleration = 1;          
 var pipe_speed = -2;                
 var game_mode = 'prestart';          
 var time_game_last_running;        
 var bottom_bar_offset = 0;         
 var pipes = [];                      


 function MySprite (img_url) {
    this.x = 0;
    this.y = 0; 
    this.visible= true;
    this.velocity_x = 0;
    this.velocity_y = 0;
    this.MyImg = new Image();
    this.MyImg.src = img_url || '';
    this.angle = 0;                                 
    this.flipV = false;             
    this.flipH = false;                              
    }
 MySprite.prototype.Do_Frame_Things = function() {
    ctx.save();
    ctx.translate(this.x + this.MyImg.width/2, this.y + this.MyImg.height/2);
    ctx.rotate(this.angle * Math.PI / 180);                       
    if (this.flipV) ctx.scale(1,-1);                              
    if (this.flipH) ctx.scale(-1,1);
   if (this.visible) ctx.drawImage(this.MyImg, -this.MyImg.width/2, -this.MyImg.height/2);
    this.x = this.x + this.velocity_x;
    this.y = this.y + this.velocity_y;                            
    ctx.restore();                                               
    }
 function ImagesTouching(thing1, thing2) {
     if (!thing1.visible  || !thing2.visible) return false;         
     if (thing1.x >= thing2.x + thing2.MyImg.width || thing1.x + thing1.MyImg.width <= thing2.x) return false;  
     if (thing1.y >= thing2.y + thing2.MyImg.height || thing1.y + thing1.MyImg.height <= thing2.y) return false;
     return true;                                                                                            
     }
function Got_Player_Input(MyEvent) {
   switch (game_mode) {
      case 'prestart': {
                        game_mode = 'running';
                        break;
                        } 
      case 'running': {
                        bird.velocity_y = jump_amount;
                        break;
                        } 
      case 'over': if (new Date() - time_game_last_running > 1000) {
                    reset_game();
                    game_mode = 'running';
                    break;
                    } 
       } 
   MyEvent.preventDefault();
   }
 addEventListener("touchstart", Got_Player_Input);     
 addEventListener("mousedown", Got_Player_Input);     
 addEventListener("keydown", Got_Player_Input);     
function make_bird_slow_and_fall() {
    if (bird.velocity_y < max_fall_speed) {
         bird.velocity_y = bird.velocity_y + acceleration;    
         }  
    if (bird.y > myCanvas.height - bird.MyImg.height)  {      
         bird.velocity_y = 0;
         game_mode = 'over';
         }
    }
function add_pipe(x_pos, top_of_gap, gap_width) {             
    var top_pipe = new MySprite();
    top_pipe.MyImg = pipe_piece;                              
    top_pipe.x = x_pos;                                       
    top_pipe.y = top_of_gap - pipe_piece.height;              
    top_pipe.velocity_x = pipe_speed;            
    pipes.push(top_pipe);         
    var bottom_pipe = new MySprite();
    bottom_pipe.MyImg = pipe_piece;
    bottom_pipe.flipV = true;                                
    bottom_pipe.x = x_pos;
    bottom_pipe.y = top_of_gap + gap_width;
    bottom_pipe.velocity_x = pipe_speed;
    pipes.push(bottom_pipe );
    }
function make_bird_tilt_appropriately() {
    if (bird.velocity_y < 0)  {
                 bird.angle= -15;                   
                 }
       else if (bird.angle < 70) {                   
                 bird.angle = bird.angle + 4;        
                 }
    }
function show_the_pipes() {                          
    for (var i=0; i < pipes.length; i++) {
             pipes[i].Do_Frame_Things(); 
             }
    }
function check_for_end_game() {
   for (var i=0; i < pipes.length; i++) 
     if (ImagesTouching(bird, pipes[i])) game_mode = "over";   
   }
function display_intro_instructions () {
   ctx.font= "25px Arial";
   ctx.fillStyle= "red";
   ctx.textAlign="center";
   ctx.fillText("Press, touch or click to start", myCanvas.width / 2, myCanvas.height / 4);  
   }
function display_game_over () {
   var score = 0;                                             
   for (var i=0; i < pipes.length; i++) 
        if (pipes[i].x < bird.x) score = score + 0.5;           
   ctx.font= "30px Arial";
   ctx.fillStyle= "red";
   ctx.textAlign="center";
   ctx.fillText("Game Over", myCanvas.width / 2, 100);  
   ctx.fillText("Score: " + score, myCanvas.width / 2, 150);  
   ctx.font= "20px Arial";
   ctx.fillText("Click, touch, or press to play again", myCanvas.width / 2, 300);  
   }
function display_bar_running_along_bottom() {
     if (bottom_bar_offset < -23) bottom_bar_offset = 0;
     ctx.drawImage(bottom_bar, bottom_bar_offset, myCanvas.height - bottom_bar.height);
     }
function reset_game() {
      bird.y = myCanvas.height / 2;
      bird.angle= 0;
      pipes=[];                           // erase all the pipes from the array
      add_all_my_pipes();                 // and load them back in their starting positions 
      }
function add_all_my_pipes() {
    add_pipe(500,  100, 140);
    add_pipe(800,   50, 140);
    add_pipe(1000, 250, 140);
    add_pipe(1200, 150, 120);
    add_pipe(1600, 100, 120);
    add_pipe(1800, 150, 120);
    add_pipe(2000, 200, 120);
    add_pipe(2200, 250, 120);
    add_pipe(2400,  30, 100);
    add_pipe(2700, 300, 100);
    add_pipe(3000, 100,  80);
    add_pipe(3300, 250,  80);
    add_pipe(3600,  50,  60);
    var finish_line = new MySprite("http://s2js.com/img/etc/flappyend.png");
    finish_line.x = 3900;
    finish_line.velocity_x = pipe_speed;
    pipes.push(finish_line);
    }
 var pipe_piece = new Image();
 pipe_piece.onload = add_all_my_pipes;                       
 pipe_piece.src = "http://s2js.com/img/etc/flappypipe.png" ;
function Do_a_Frame () {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);   
    bird.Do_Frame_Things(); 
    display_bar_running_along_bottom();
    switch (game_mode) {
        case 'prestart': {
                          display_intro_instructions();
                          break;
                          } 
        case 'running': {
                         time_game_last_running = new Date(); 
                         bottom_bar_offset = bottom_bar_offset + pipe_speed; 
                         show_the_pipes();
                         make_bird_tilt_appropriately();
                         make_bird_slow_and_fall();
                         check_for_end_game();
                         break;
                         }
        case 'over': {
                      make_bird_slow_and_fall();
                      display_game_over();
                      break;
                      } 
        } 
    }
 var bottom_bar = new Image();
 bottom_bar.src = "http://s2js.com/img/etc/flappybottom.png" ;

 var bird = new MySprite("http://s2js.com/img/etc/flappybird.png");
 bird.x = myCanvas.width / 3;
 bird.y = myCanvas.height / 2;

 setInterval(Do_a_Frame, 1000/FPS);                            
 </script>  
</body>
</html>