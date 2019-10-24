class Utils{
    
    static calculateAttackedPositions(chess){
        // calculates positions attacked by opponent
        chess.turn = this.changeTurn(chess.turn);
        chess.setIndexAndPieces();
      
        var moves = chess.getAllMovesExceptPawnAndCastle();
        moves.push.apply(moves, chess.getPawnAttacksOnly());

        var attackedPositions = new Set();

        for(var i = 0; i < moves.length; i++){
             attackedPositions.add(moves[i][1]);
        }

        chess.turn = this.changeTurn(chess.turn);
        chess.setIndexAndPieces();

        return attackedPositions;
    }

    static changeTurn(turn){
        if(turn == COLORS.WHITE){
            turn = COLORS.BLACK;
        }
        else{
            turn = COLORS.WHITE;
        }
        return turn;
    }

    static parseFen(fenString){
        // convert fen string to board array and other info...

        var sub = fenString.split(" ");
        var fenBoard = sub[0].split("/");

        var board = new Array(NUM_OF_SQUARES);

        var i = 0;
        var fenRow = 0;
        var fenColumn = 0;
        var fenColumnReset = 0;

        while(i < board.length){

            if(i <= 20 || i >= 99 || i % 10 == 9 || i % 10 == 0){
                board[i] = PIECES.OFF_BOARD;
                i++;
            }
            else{
                var emptySquares = parseInt(fenBoard[fenRow][fenColumn]);

                if(!emptySquares){
                    board[i] = fenBoard[fenRow][fenColumn];
                    i++;
                    fenColumnReset++;
                }
                else{
                    for(var j = 0; j < emptySquares; j++){
                        board[i] = PIECES.EMPTY;
                        i++;
                        fenColumnReset++;
                    }
                }

                fenColumn++;
                if(fenColumnReset % 8 == 0){
                    fenColumn = 0;
                    fenRow++;
                }
            }
        }

        var turn = sub[1];
        var castlingInfo = sub[2];
        var enPassantTarget = sub[3];
        var halfmoveClock = sub[4];
        var fullMoveNumber = sub[5];

        return [board, turn, castlingInfo, enPassantTarget, halfmoveClock, fullMoveNumber];
    }

    
    static convertArray120To64(board){
        // TODO: convert array size from 120 to 64 .. for visualization
        var b = [];

        for(var i = 0; i < board.length; i++){
            if(board[i] != PIECES.OFF_BOARD){
                b.push(board[i]);
            }
        }
        return b;
    }   
}