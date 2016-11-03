$("document").ready(function() {
  // on mouseenter check if it's a movable piece
  $(".piece").on('mouseenter', this,
    function (event) {
      highlight(event.target.id.toString());
    }
  );
  // on mouseleave remove the red border and green text
  $(".piece").on('mouseleave', this,
    function (event) {
      if (event.target.id.toString() != "square16") {
        $('#'+event.target.id.toString()).css({"border-color": "black", "color": "white", "text-decoration": "none"});
      }
    }
  );
  $(".piece").click(function(event) {
    move(event.target.id.toString());
  });
});

var god = [];

// draw the squares: numOfRows^2
function drawBoard(numOfRows) {
  board = [];
  boardObj = [];
  for (var i = 0; i < (numOfRows*numOfRows); i++) {
    var squareDiv = document.createElement("div");
    squareDiv.id = "square" + (i+1); // give each square a unique id
    squareDiv.className = "piece";
    if (i < ((numOfRows*numOfRows)-1)) {
      squareDiv.innerHTML = "<span>"+(i+1)+"</span>"; // display the number on the square
    }
    document.getElementById("squares").appendChild(squareDiv);
    board[i] = squareDiv.id; //store each square id in an array
    boardObj[i] = squareDiv; //store each square object in array
  }
}

function shuffleBoard() {
  //shuffle the board
  for (var i = 0; i < 20; i++) {
    var randomNum = Math.floor(Math.random() * 16) + 1;
    // var godCode =
    move("square"+randomNum);
    // if (godCode != -1) {
    //   god.push(godCode.pieceIndex); // creates an array of moves
    // }
  }
  // alert(god);
  // clear style after shuffle
  jQuery(function($) {
    for (var i = 1; i < 16; i++) {
      $("#square"+i).css({"border-color": "black", "color": "white", "text-decoration": "none"});
    }
  });
}

// move piece to empty space
function move(piece) {
  // check if next to empty square and then move it
  var pieceObj = highlight(piece);
  if(pieceObj >= 0 || pieceObj.pieceIndex >= 1) {
    // swap the empty piece with the clicked piece in the board and boardObj arrays
    var tmp = board[pieceObj.pieceIndex];
    var tmpObjPiece = boardObj[pieceObj.pieceIndex];
    var tmpObjEmpty = boardObj[pieceObj.emptyPieceIndex];
    board[pieceObj.pieceIndex] = board[pieceObj.emptyPieceIndex];
    boardObj[pieceObj.pieceIndex] = boardObj[pieceObj.emptyPieceIndex];
    board[pieceObj.emptyPieceIndex] = tmp;
    boardObj[pieceObj.emptyPieceIndex] = tmpObjPiece;
    jQuery(function ($) {
      // swap the pieces
      // detach the empty piece, insert it before the clicked piece, then put the
      // empty piece after the piece that was next to the empty piece
      var detachedPiece = $(tmpObjPiece).detach();
      $(detachedPiece).insertAfter(tmpObjEmpty);
      $(tmpObjEmpty).insertAfter(boardObj[pieceObj.pieceIndex - 1]);
    });
    return pieceObj;
  }
  //handle the edge case of the top left position being clicked
  else if (pieceObj.pieceIndex == 0) {
    // swap the empty piece with the clicked piece in the board and boardObj arrays
    var tmp = board[pieceObj.pieceIndex];
    var tmpObjPiece = boardObj[pieceObj.pieceIndex];
    var tmpObjEmpty = boardObj[pieceObj.emptyPieceIndex];
    board[pieceObj.pieceIndex] = board[pieceObj.emptyPieceIndex];
    boardObj[pieceObj.pieceIndex] = boardObj[pieceObj.emptyPieceIndex];
    board[pieceObj.emptyPieceIndex] = tmp;
    boardObj[pieceObj.emptyPieceIndex] = tmpObjPiece;
    jQuery(function ($) {
      // swap the pieces
      // detach the empty piece, insert it before the clicked piece, then put the
      // empty piece after the piece that was next to the empty piece
      var detachedPiece = $(tmpObjPiece).detach();
      $(detachedPiece).insertAfter(tmpObjEmpty);
      $(tmpObjEmpty).insertBefore(boardObj[pieceObj.pieceIndex + 1]);
    });
    return pieceObj;
  }
  return -1;
}

// highlight piece if movable
function highlight(piece) {
  var pieceIndex = board.indexOf(piece);
  var boardSize = board.length;
  var pieceInfo = {pieceIndex: "", emptyPieceIndex: -1, thepiece: piece};

  // piece should highlight if:
  // index +1 is square16
  // index -1 is square16
  // index +4 is square16
  // index -4 is square16

  // verify array position exists first and then check if the piece is next to the empty space
  // returns the index of empty space
  if(pieceIndex + 1 <= boardSize) {
    if (board[pieceIndex + 1] == "square16") {
      //jquery hover: change appearence of piece that can be moved
      jQuery(function($) {
        $('#'+piece).css({"border-color": "red", "color": "#006600", "text-decoration": "underline"});
      });
      pieceInfo.pieceIndex = pieceIndex;
      pieceInfo.emptyPieceIndex = pieceIndex + 1;
      return pieceInfo;
    }
  }
  if(pieceIndex - 1 >= 0) {
    if (board[pieceIndex - 1] == "square16") {
      // jquery hover: change appearence of piece that can be moved
      jQuery(function($) {
        $('#'+piece).css({"border-color": "red", "color": "#006600", "text-decoration": "underline"});
      });// end jquery hover
      pieceInfo.pieceIndex = pieceIndex;
      pieceInfo.emptyPieceIndex = pieceIndex - 1;
      return pieceInfo;
    }
  }
  if (pieceIndex + 4 <= boardSize) {
    if (board[pieceIndex + 4] == "square16") {
      // jquery hover: change appearence of piece that can be moved
      jQuery(function($) {
        $('#'+piece).css({"border-color": "red", "color": "#006600", "text-decoration": "underline"});
      });// end jquery hover
      pieceInfo.pieceIndex = pieceIndex;
      pieceInfo.emptyPieceIndex = pieceIndex + 4;
      return pieceInfo;
    }
  }
  if (pieceIndex - 4 >= 0) {
    if (board[pieceIndex - 4] == "square16") {
      // jquery hover: change appearence of piece that can be moved
      jQuery(function($) {
        $('#'+piece).css({"border-color": "red", "color": "#006600", "text-decoration": "underline"});
      });// end jquery hover
      pieceInfo.pieceIndex = pieceIndex;
      pieceInfo.emptyPieceIndex = pieceIndex - 4;
      return pieceInfo;
    }
  }
  return -1;
}
