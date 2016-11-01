var board;

// draw the squares: numOfRows^2
function drawBoard(numOfRows) {
  board = [];
  for (var i = 0; i < (numOfRows*numOfRows); i++) {
    var squareDiv = document.createElement("div");
    squareDiv.id = "square" + (i+1); // give each square a unique id
    if (i < ((numOfRows*numOfRows)-1)) {
      squareDiv.innerHTML = "<span>"+(i+1)+"</span>"; // display the number on the square
    }
    document.getElementById("squares").appendChild(squareDiv);
    board[i] = squareDiv; //store each square in an array
  }
}

function shuffleBoard() {
  //shuffle the board
  alert(board);
}
