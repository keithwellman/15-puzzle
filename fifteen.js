// Extra features implemented:
// End of game notification - uses the explode effect
//

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
        $(document.getElementById(event.target.id)).css({"border-color": "black", "color": "white", "text-decoration": "none"});
      }
    }
  );
  $(".puzzle").click(function(event) {
    move(event.target.id.toString());
  });
});

var god = [];
var selectBg;
var selectedBg;
var bg;
function setBg() {
  selectBg = document.getElementById("bgSelect");
  selectedBg = selectBg.value;
  if (selectedBg == "HAL") {
    bg = "background.jpg";
    for (var i = 1; i < 16; i++) {
      document.getElementById("square"+i).style.backgroundImage = "url('"+bg+"')";
    }
  }
  else if (selectedBg == "cs") {
    bg = "cs.jpg";
    for (var i = 1; i < 16; i++) {
      document.getElementById("square"+i).style.backgroundImage = "url('"+bg+"')";
    }
  }
  else if (selectedBg == "Always Sunny") {
    bg = "sunny.jpg";
    for (var i = 1; i < 16; i++) {
      document.getElementById("square"+i).style.backgroundImage = "url('"+bg+"')";
    }
  }
  else if (selectedBg == "enjoy") {
    bg = "enjoy.png";
    for (var i = 1; i < 16; i++) {
      document.getElementById("square"+i).style.backgroundImage = "url('"+bg+"')";
    }
  }
}

// draw the squares: numOfRows^2
function drawBoard(numOfRows) {
  board = [];
  boardObj = [];
  for (var i = 0; i < (numOfRows*numOfRows); i++) {
    var squareDiv = document.createElement("div");
    squareDiv.id = "square" + (i+1); // give each square a unique id
    squareDiv.className = "piece";
    if (i < ((numOfRows*numOfRows)-1)) {
      squareDiv.innerHTML = "<p>"+(i+1)+"</p>"; // display the number on the square
    }
    document.getElementById("squares").appendChild(squareDiv);
    board[i] = squareDiv.id; //store each square id in an array
    boardObj[i] = squareDiv; //store each square object in array
  }
}

function shuffleBoard() {
  //shuffle the board
  for (var i = 0; i < 200; i++) {
    var randomNum = Math.floor(Math.random() * 15) + 1;
    var godCode = move("square"+randomNum);
    if (godCode != -1) {
      god.push(godCode.pieceIndex); // creates an array of moves
      // document.getElementById("cheat").innerHTML += "square"+randomNum+"\n";
    }
  }
  // clear style after shuffle
  jQuery(function($) {
    for (var i = 1; i < 16; i++) {
      var squ = "#square"+i;
      $(squ).css({"border-color": "black", "color": "white", "text-decoration": "none"});
    }
  });
}

function swapElements(obj1, obj2) {
    var temp = document.createElement("div");
    obj1.parentNode.insertBefore(temp, obj1); //inert tmp before obj1
    obj2.parentNode.insertBefore(obj1, obj2); //insert obj1 before obj2
    temp.parentNode.insertBefore(obj2, temp); //insert obj2 before temp
    temp.parentNode.removeChild(temp); //remove temp
    winner();
}

// move piece to empty space
function move(piece) {
  // check if next to empty square and then move it
  var pieceObj = highlight(piece);
  if(pieceObj >= 0 || pieceObj.pieceIndex >= 0) {
    // swap the empty piece with the clicked piece in the board and boardObj arrays
    var tmp = board[pieceObj.pieceIndex];
    var tmpObjPiece = boardObj[pieceObj.pieceIndex];
    var tmpObjEmpty = boardObj[pieceObj.emptyPieceIndex];
    board[pieceObj.pieceIndex] = board[pieceObj.emptyPieceIndex];
    boardObj[pieceObj.pieceIndex] = boardObj[pieceObj.emptyPieceIndex];
    board[pieceObj.emptyPieceIndex] = tmp;
    boardObj[pieceObj.emptyPieceIndex] = tmpObjPiece;
    // jQuery(function ($) {
    //   // swap the pieces
    //   // detach the empty piece, insert it before the clicked piece, then put the
    //   // empty piece after the piece that was next to the empty piece
    //   var detachedPiece = $(tmpObjPiece).detach();
    //   $(detachedPiece).insertAfter(tmpObjEmpty);
    //   $(tmpObjEmpty).insertAfter(boardObj[pieceObj.pieceIndex - 1]);
    // });
    swapElements(tmpObjPiece, tmpObjEmpty);
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
  // index +1 is square16 - unless it's in the next row postion 3, 7, or 11
  // index -1 is square16 - unless it's in the previous row position 12, 8, or 4
  // index +4 is square16
  // index -4 is square16

  // verify array position exists first and then check if the piece is next to the empty space
  // returns the index of empty space
  if(pieceIndex + 1 <= boardSize) {
    if (board[pieceIndex + 1] == "square16" && pieceIndex != 3 && pieceIndex != 7 && pieceIndex !=11) {
      //change appearence of piece that can be moved
      document.getElementById(piece).style.borderColor = "red";
      document.getElementById(piece).style.color = "#006600";
      document.getElementById(piece).style.textDecoration = "underline";
      pieceInfo.pieceIndex = pieceIndex;
      pieceInfo.emptyPieceIndex = pieceIndex + 1;
      return pieceInfo;
    }
  }
  if(pieceIndex - 1 >= 0) {
    if (board[pieceIndex - 1] == "square16" && pieceIndex != 12 && pieceIndex != 8 && pieceIndex !=4) {
      //change appearence of piece that can be moved
      document.getElementById(piece).style.borderColor = "red";
      document.getElementById(piece).style.color = "#006600";
      document.getElementById(piece).style.textDecoration = "underline";
      pieceInfo.pieceIndex = pieceIndex;
      pieceInfo.emptyPieceIndex = pieceIndex - 1;
      return pieceInfo;
    }
  }
  if (pieceIndex + 4 <= boardSize) {
    if (board[pieceIndex + 4] == "square16") {
      //change appearence of piece that can be moved
      document.getElementById(piece).style.borderColor = "red";
      document.getElementById(piece).style.color = "#006600";
      document.getElementById(piece).style.textDecoration = "underline";
      pieceInfo.pieceIndex = pieceIndex;
      pieceInfo.emptyPieceIndex = pieceIndex + 4;
      return pieceInfo;
    }
  }
  if (pieceIndex - 4 >= 0) {
    if (board[pieceIndex - 4] == "square16") {
      //change appearence of piece that can be moved
      document.getElementById(piece).style.borderColor = "red";
      document.getElementById(piece).style.color = "#006600";
      document.getElementById(piece).style.textDecoration = "underline";
      pieceInfo.pieceIndex = pieceIndex;
      pieceInfo.emptyPieceIndex = pieceIndex - 4;
      return pieceInfo;
    }
  }
  return -1;
}

function winner() {
  var win = true;
  for (var i = 0; i < board.length; i++) {
    var x = i+1;
    if (board[i].toString() != "square"+x) {
      win = false;
    }
  }
  if (win) {
    jQuery(function ($) {
      $(".puzzle").hide("explode", 1000, function() {
        alert("you won!");
        window.location.reload();
      });
    });
  }
}
