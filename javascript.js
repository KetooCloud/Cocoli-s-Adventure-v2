<!DOCTYPE html>
<html>
<head>
  <title>Flappy Bird Cumpleañero</title>
  <meta charset="utf-8">
  <style>
    body {
      background-color: #721bc4;
      font-family: 'Pacifico', cursive;
    }
    canvas {
      display: block;
      margin: auto;
      border: 5px dotted #0a3cda;
      border-radius: 15px 50px;
      background: url('http://s2js.com/img/etc/flappyback.png');
      background-size: 100%;
    }
  </style>
</head>
<body>
<canvas id="myCanvas" width="320" height="480"></canvas>

<script>
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  const FPS = 40;
  const jump_amount = -10;
  const max_fall_speed = 10;
  const acceleration = 1;
  const pipe_speed = -2;
  let game_mode = 'prestart';
  let pipes = [];
  let time_game_last_running;
  let bottom_bar_offset = 0;
  let birthday_message_shown = false;

  function MySprite(img_url) {
    this.x = 0;
    this.y = 0;
    this.visible = true;
    this.velocity_x = 0;
    this.velocity_y = 0;
    this.MyImg = new Image();
    this.MyImg.src = img_url || '';
    this.angle = 0;
    this.flipV = false;
    this.flipH = false;
  }

  MySprite.prototype.Do_Frame_Things = function () {
    ctx.save();
    ctx.translate(this.x + this.MyImg.width / 2, this.y + this.MyImg.height / 2);
    ctx.rotate(this.angle * Math.PI / 180);
    if (this.flipV) ctx.scale(1, -1);
    if (this.flipH) ctx.scale(-1, 1);
    if (this.visible) ctx.drawImage(this.MyImg, -this.MyImg.width / 2, -this.MyImg.height / 2);
    this.x += this.velocity_x;
    this.y += this.velocity_y;
    ctx.restore();
  };

  function ImagesTouching(a, b) {
    if (!a.visible || !b.visible) return false;
    return !(a.x + a.MyImg.width < b.x || a.x > b.x + b.MyImg.width ||
             a.y + a.MyImg.height < b.y || a.y > b.y + b.MyImg.height);
  }

  function Got_Player_Input(e) {
    switch (game_mode) {
      case 'prestart':
        game_mode = 'running';
        break;
      case 'running':
        bird.velocity_y = jump_amount;
        break;
      case 'over':
        if (new Date() - time_game_last_running > 1000) {
          reset_game();
          game_mode = 'running';
        }
        break;
    }
    e.preventDefault();
  }

  addEventListener("touchstart", Got_Player_Input);
  addEventListener("mousedown", Got_Player_Input);
  addEventListener("keydown", Got_Player_Input);

  function make_bird_fall() {
    if (bird.velocity_y < max_fall_speed) {
      bird.velocity_y += acceleration;
    }
    if (bird.y > canvas.height - bird.MyImg.height) {
      bird.velocity_y = 0;
      game_mode = 'over';
    }
  }

  function add_pipe(x, gap_y, gap_height) {
    const top = new MySprite(pipe_piece.src);
    top.x = x;
    top.y = gap_y - pipe_piece.height;
    top.velocity_x = pipe_speed;
    pipes.push(top);

    const bottom = new MySprite(pipe_piece.src);
    bottom.flipV = true;
    bottom.x = x;
    bottom.y = gap_y + gap_height;
    bottom.velocity_x = pipe_speed;
    pipes.push(bottom);
  }

  function show_pipes() {
    pipes.forEach(pipe => pipe.Do_Frame_Things());
  }

  function check_collisions() {
    for (let pipe of pipes) {
      if (ImagesTouching(bird, pipe)) {
        game_mode = "over";
      }
    }
  }

  function display_intro() {
    ctx.font = "24px Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("Toca para comenzar", canvas.width / 2, canvas.height / 3);
  }

  function display_game_over() {
    const score = calculate_score();
    ctx.font = "30px Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("Fin del juego", canvas.width / 2, 100);
    ctx.fillText("Puntaje: " + score, canvas.width / 2, 150);
    ctx.font = "18px Arial";
    ctx.fillText("Haz clic o toca para reiniciar", canvas.width / 2, 300);
  }

  function calculate_score() {
    let score = 0;
    for (let pipe of pipes) {
      if (pipe.x < bird.x) score += 0.5;
    }
    return score;
  }

  function show_birthday_message(score) {
    if (score >= 12 && !birthday_message_shown) {
      birthday_message_shown = true;

      setTimeout(() => {
        alert("🎉 ¡Feliz Cumpleaños! 🎂\nTu código es: RIRKPDCTHDCHF4NXAJ");
      }, 300);

      // Mostrar en canvas también
      ctx.font = "22px Arial";
      ctx.fillStyle = "yellow";
      ctx.fillText("🎂 ¡Feliz Cumpleaños! 🎉", canvas.width / 2, 220);
      ctx.fillText("Código: RIRKPDCTHDCHF4NXAJ", canvas.width / 2, 260);
    }

    if (score >= 12 && birthday_message_shown) {
      ctx.font = "22px Arial";
      ctx.fillStyle = "yellow";
      ctx.fillText("🎂 ¡Feliz Cumpleaños! 🎉", canvas.width / 2, 220);
      ctx.fillText("Código: RIRKPDCTHDCHF4NXAJ", canvas.width / 2, 260);
    }
  }

  function reset_game() {
    bird.y = canvas.height / 2;
    bird.angle = 0;
    pipes = [];
    birthday_message_shown = false;
    add_all_pipes();
  }

  function add_all_pipes() {
    add_pipe(500, 100, 140);
    add_pipe(800, 50, 140);
    add_pipe(1000, 250, 140);
    add_pipe(1200, 150, 120);
    add_pipe(1600, 100, 120);
    add_pipe(1800, 150, 120);
    add_pipe(2000, 200, 120);
    add_pipe(2200, 250, 120);
    add_pipe(2400, 30, 100);
    add_pipe(2700, 300, 100);
    add_pipe(3000, 100, 80);
    add_pipe(3300, 250, 80);
    add_pipe(3600, 50, 60);

    const finish_line = new MySprite("http://s2js.com/img/etc/flappyend.png");
    finish_line.x = 3900;
    finish_line.velocity_x = pipe_speed;
    pipes.push(finish_line);
  }

  function Do_a_Frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bird.Do_Frame_Things();
    show_pipes();
    switch (game_mode) {
      case 'prestart':
        display_intro();
        break;
      case 'running':
        time_game_last_running = new Date();
        bottom_bar_offset += pipe_speed;
        make_bird_fall();
        check_collisions();
        const score = calculate_score();
        show_birthday_message(score);
        break;
      case 'over':
        make_bird_fall();
        display_game_over();
        break;
    }
  }

  const pipe_piece = new Image();
  pipe_piece.onload = add_all_pipes;
  pipe_piece.src = "http://s2js.com/img/etc/flappypipe.png";

  const bird = new MySprite("http://s2js.com/img/etc/flappybird.png");
  bird.x = canvas.width / 3;
  bird.y = canvas.height / 2;

  setInterval(Do_a_Frame, 1000 / FPS);
</script>
</body>
</html>
