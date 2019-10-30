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
        var halfmoveClock = parseInt(sub[4]);
        var fullMoveNumber = parseInt(sub[5]);

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

    static validateMove(move, board, turn, kingIndex, currentPieces, opponentPieces){

        var src = move[0];
        var dest = move[1];

        board[dest] = board[src];
        board[src] = PIECES.EMPTY;

        if(src == kingIndex){
            kingIndex = dest;
        }

        // check king attacks from pawn
        if(turn == COLORS.WHITE){
            for(var k = 0; k < WHITE_PAWN_ATTACKS.length; k++){
                if(board[ kingIndex + WHITE_PAWN_ATTACKS[k] ] == PIECES.b_p){
                    return false;
                }
                
            }        
        }
        else{
            for(var k = 0; k < BLACK_PAWN_ATTACKS.length; k++){
                if(board[ kingIndex + BLACK_PAWN_ATTACKS[k] ] == PIECES.w_p){
                    return false;
                }
            }  
        }

        // check king attacks from knight
        for(var k = 0; k < KNIGHT_MOVES.length; k++){
            if(board[ kingIndex + KNIGHT_MOVES[k] ] == opponentPieces[2]){
                return false;
            }
        }

        // check king attacks from rook
        if(!this.validateFromSlidingPieces(board, kingIndex, ROOK_MOVES, 3, currentPieces, opponentPieces)){
            return false;
        }

        // check king attacks from bishop
        if(!this.validateFromSlidingPieces(board, kingIndex, BISHOP_MOVES, 1, currentPieces, opponentPieces)){
            return false;
        }

        // check king attacks from queen
        if(!this.validateFromSlidingPieces(board, kingIndex, QUEEN_MOVES, 4, currentPieces, opponentPieces)){
            return false;
        }

        // check king attacks from king
        for(var i = 0; i < KING_MOVES.length; i++){
            if(board[ kingIndex + KING_MOVES[k] ] == opponentPieces[5]){
                return false;
            }
        }
        
        return true;
    }

    
    static validateFromSlidingPieces(board, currentIndex, pieceMoves, opIndex, currentPieces, opponentPieces){
        
        var nextIndex;
        var flag = true;
    
        for(var k = 0; k < pieceMoves.length; k++){

            nextIndex = currentIndex + pieceMoves[k];

            while(true){
                if(board[nextIndex] == PIECES.OFF_BOARD || currentPieces.includes(board[nextIndex])){
                    break;
                }
                else if(opponentPieces.includes(board[nextIndex])){
                    if(board[nextIndex] == opponentPieces[opIndex]){
                        flag = false;
                        break;
                    }
                    break;
                }
                else{
                    nextIndex += pieceMoves[k];
                }
            }

            if(!flag){
                break;
            }
           
        }

        return flag;
    }
}