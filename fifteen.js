var board;

// draw the squares: numOfRows^2
function drawBoard(numOfRows) {
  board = [];
  for (var i = 0; i < (numOfRows*numOfRows); i++) {
    var squareDiv = document.createElement("div");
    squareDiv.id = "square" + (i+1); // give each square a unique id
    squareDiv.className = "piece";
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

$("document").ready(function() {
  $("#squares").mouseover(function(event) {
    highlight(event.target);
  })
  $("#squares").click(function(event) {
    move(event.target);
  })
});

// move piece to empty space
function move(piece) {
  // check if next to empty square and then move it
  if(highlight(piece)) {

  }
}

// highlight piece if movable
function highlight(piece) {
  var pieceIndex = board.indexOf(piece);
  var boardSize = board.length;
  if(pieceIndex + 1 <= boardSize) {
    if (board[pieceIndex + 1].id == "square16") {
      // jquery hover: change appearence of piece that can be moved
      jQuery(function($) {
        $(piece).hover(function() {
          $(this).css({"border-color": "red", "color": "#006600", "text-decoration": "underline"})}, function(){
          $(this).css({"border-color": "black", "color": "white", "text-decoration": "none"});
        });
      });// end jquery hover
    }
  }
  if(pieceIndex - 1 >= 0) {
    if (board[pieceIndex - 1].id == "square16") {
      // jquery hover: change appearence of piece that can be moved
      jQuery(function($) {
        $(piece).hover(function() {
          $(this).css({"border-color": "red", "color": "#006600", "text-decoration": "underline"})}, function(){
          $(this).css({"border-color": "black", "color": "white", "text-decoration": "none"});
        });
      });// end jquery hover
    }
  }
  if (pieceIndex + 4 <= boardSize) {
    if (board[pieceIndex + 4].id == "square16") {
      // jquery hover: change appearence of piece that can be moved
      jQuery(function($) {
        $(piece).hover(function() {
          $(this).css({"border-color": "red", "color": "#006600", "text-decoration": "underline"})}, function(){
          $(this).css({"border-color": "black", "color": "white", "text-decoration": "none"});
        });
      });// end jquery hover
    }
  }
  if (pieceIndex - 4 <= boardSize) {
    if (board[pieceIndex - 4].id == "square16") {
      // jquery hover: change appearence of piece that can be moved
      jQuery(function($) {
        $(piece).hover(function() {
          $(this).css({"border-color": "red", "color": "#006600", "text-decoration": "underline"})}, function(){
          $(this).css({"border-color": "black", "color": "white", "text-decoration": "none"});
        });
      });// end jquery hover
    }
  }
}
