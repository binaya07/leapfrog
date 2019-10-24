
// control counters, 3 fold repitition, game over -- draw condition check (game over conditions maybe required in minmax to .. maybe)

// to undo moves .. keep track of fen strings

var DEFAULT_POSITION = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

var DEFAULT_POSITION1 = 'rnbqkb1r/8/8/PPPPPPPP/3r4/8/PPPPPPPP/R3K1BR b KQkq - 0 1';


// var t = performance.now();

//var chess = new Chess(DEFAULT_POSITION1);

//console.log(chess.getKingMoves());

//console.log(chess.getCastleMoves());

// var r = performance.now();

// console.log(r-t);



var chess = new Chess(DEFAULT_POSITION);

var game = new Game(chess);

game.play();

setInterval(game.play, 2000);

// var b = Utils.convertArray120To64(chess.board);

// console.log(chess.getPawnMoves());

// game.addBoard(b);

// chess.makeMove([88,68]);

// var b = Utils.convertArray120To64(chess.board);

// console.log(chess.getPawnMoves());
// game.removeBoard();
// game.addBoard(b);

var fenElement = document.getElementsByClassName('fen-input')[0];
var fenButton = document.getElementsByClassName('fen-button')[0];


fenButton.onclick = function(){
    var fen = fenElement.value.trim();

    var chess = new Chess(fen);
    var b = Utils.convertArray120To64(chess.board);

    game.removeBoard();
    game.addBoard(b);

    
    //console.log(chess.getKingCheck());


};