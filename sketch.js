// By : Benhard Sim
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

let w; // = width / 3;
let h; // = height / 3;

let ai = 'X';
let human = 'O';
let currentPlayer = human;

// tombol reset
document.getElementById("reset-BTN").addEventListener("click", () => {
  board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
  ];
  count = 0;
  loop();
  let txt = document.getElementById("reset-BTN")
  txt.innerHTML = "Reset";
  txt.style.fontSize = "2rem";
  txt.style.fontWeight = BOLD;
  document.getElementById("win-text").innerHTML = ""
})

function setup() {
  let cnv = createCanvas(400, 400);
  cnv.position(185, 300)
  w = width / 3;
  h = height / 3;
  bestMove();
}

function equals3(a, b, c) {
  return a == b && b == c && a != '';
}

function checkWinner() {
  let winner = null;

  // mengecek bidang vertical
  for (let i = 0; i < 3; i++) {
      if (equals3(board[i][0], board[i][1], board[i][2])) {
          winner = board[i][0];
          stroke(255, 0, 0);
          strokeWeight(6);
          line(w * i + w / 2, 0, h * i + w / 2, height)
      }
  }

  // mengecek bidang horizontal
  for (let i = 0; i < 3; i++) {
      if (equals3(board[0][i], board[1][i], board[2][i])) {
          winner = board[0][i];
          stroke(255, 0, 0);
          strokeWeight(6);
          line(0, h * i + h / 2, width, h * i + h / 2)
          hold = true;
      }
  }

  // mengecek bidang Diagonal
  if (equals3(board[0][0], board[1][1], board[2][2])) {
      winner = board[0][0];
      stroke(255, 0, 0);
      strokeWeight(6);
      line(20, 20, width - 20, height - 20);
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
      winner = board[2][0];
      stroke(255, 0, 0);
      strokeWeight(6);
      line(20, height - 20, width - 20, 20);
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
          if (board[i][j] == '') {
              openSpots++;
          }
      }
  }

  if (winner == null && openSpots == 0) {
      return 'tie';
  } else {
      return winner;
  }
}

function mousePressed() {
  if (currentPlayer == human) {
      // Human make turn
      let i = floor(mouseX / w);
      let j = floor(mouseY / h);
      // If valid turn
      if (board[i][j] == '') {
          board[i][j] = human;
          currentPlayer = ai;
          bestMove();
      }
  }
}

function draw() {
  background(255);
  strokeWeight(4);

  stroke(0);
  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);

  for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 3; i++) {
          let x = w * i + w / 2;
          let y = h * j + h / 2;
          let spot = board[i][j];
          textSize(32);
          let r = w / 4;
          if (spot == human) {
              noFill();
              stroke(0)
              ellipse(x, y, r * 2);
              textSize(20);
              text(i + " " + j, w * i + 20, h * j + 20);
          } else if (spot == ai) {
              stroke(0)
              line(x - r, y - r, x + r, y + r);
              line(x + r, y - r, x - r, y + r);
              noFill();
              textSize(20);
              text(i + " " + j, w * i + 20, h * j + 20);
          }
      }
  }
  let result = checkWinner();
  if (result != null) {
      noLoop();
      let txt = document.getElementById("reset-BTN")
      txt.style.fontSize = "1.2rem";
      txt.style.fontWeight = BOLD;
      txt.innerHTML = "Play Again";
      let resultP = createP('');
      resultP.style('font-size', '32pt');
      if (result == 'tie') {
          document.getElementById("win-text").innerHTML = "Draw !!"
      } else {
          document.getElementById("win-text").innerHTML = `${result} is the Winner`
      }
  }
}
