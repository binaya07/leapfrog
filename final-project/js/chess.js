
// attackedPositions is a Set .... check has()

class Chess{

    constructor(fen, attackedPositions = null, parent = null){
        
        this.fen = fen;
        
        [this.board, this.turn, this.castlingInfo, this.enPassantTarget, this.halfmoveClock, this.fullMoveNumber] = Utils.parseFen(this.fen);
        
        this.setIndexAndPieces();

        this.castlingInfo = this.castlingInfo.split("");

        if(attackedPositions == null){

            // clone and send ... dont send  this

            //var clone = Object.assign({}, this); //-- remove last change turn from utils.calculateAttackedPositions
            this.attackedPositions = Utils.calculateAttackedPositions(this);
            //this.attackedPositions = [];
        }
        else{
            this.attackedPositions = attackedPositions;
        }

        this.isChecked = this.getKingCheck();

        this.moves = [];

        //this.currentBoardScore = 0;
        //this.evaluateBoard();

        //this.isCheckMate
        //this.isDraw
    }

    getKingCheck(){

        var check = false;

        if(this.turn == COLORS.WHITE){
            if(this.attackedPositions.has(this.board.indexOf(PIECES.w_k))){
                check = true;
            }
        }
        else{
            if(this.attackedPositions.has(this.board.indexOf(PIECES.b_k))){
                check = true;
            }
        }

        return check;
    }

    evaluateBoard(){
        // TODO: heuristic to evaluate current board score for current player -- MAYBE IN UTILS 
        // TODO: consider checkmate and draw conditions too..

    }

    checkCheckMate(){
        //if king checked and no valid moves
    }

    checkDraw(){
        // TODO: check stalemate, 50 moves, and other conditions (such as king and king, king and bishop of different colors, king and knight) --> maybe yo only in movegenerator
        
        // if king not checked and no valid moves --> stalemate
    }


    getPseudoLegalMoves(){
        var moves = [];

        moves.push.apply(moves , this.getPawnMoves());
        moves.push.apply(moves , this.getRookMoves());
        moves.push.apply(moves , this.getKnightMoves());
        moves.push.apply(moves , this.getBishopMoves());
        moves.push.apply(moves , this.getQueenMoves());
        moves.push.apply(moves , this.getKingMoves());
        moves.push.apply(moves , this.getCastleMoves());

        return moves;
    }

    validateMoves(){
        //TODO: Validate all generated moves..
        //basically, next move should not result in king check -- one possible option is to check from king's perspective
        //if king is checked, only those moves which removes the check are legal
        //if any moves results in check, those should be removed...


        var moves = this.getPseudoLegalMoves();

        // validate and pass to this.moves

        this.moves = moves;
    }

    getAllMovesExceptPawnAndCastle(){
        var moves = [];

        moves.push.apply(moves , this.getRookMoves());
        moves.push.apply(moves , this.getKnightMoves());
        moves.push.apply(moves , this.getBishopMoves());
        moves.push.apply(moves , this.getQueenMoves());
        moves.push.apply(moves , this.getKingMoves());
        
        return moves;
    }

    getPawnMoves(){

        // TODO: check en passant
        // implement pawn attacks below
        var pawnMoves = [];

        return pawnMoves;
    }

    getPawnAttacksOnly(){

        // gives the positions that can be attacked by pawns regardless of opponent pieces

        var pawnAttacks = [];
        var currentIndex;
        var nextIndex;

        for(var i = RANKS.RANK_1; i <= RANKS.RANK_8; i++){
            for(var j = FILES.FILE_A; j <= FILES.FILE_H; j++){

                currentIndex = 20 + i * 10 + j + 1;

                if(this.board[currentIndex] == this.currentPieces[0]){
                    // check for white pawns
                    if(this.currentPieces[0] == PIECES.w_p){
                        for(var k = 0; k < WHITE_PAWN_ATTACKS.length; k++){
                            nextIndex = currentIndex + WHITE_PAWN_ATTACKS[k];
                            
                            if(this.board[nextIndex] != PIECES.OFF_BOARD && !this.currentPieces.includes(this.board[nextIndex])){
                                pawnAttacks.push([currentIndex, nextIndex]);
                            }
                        }
                    }
                    // check for black pawns
                    else{
                        for(var k = 0; k < BLACK_PAWN_ATTACKS.length; k++){
                            nextIndex = currentIndex + BLACK_PAWN_ATTACKS[k];
                            
                            if(this.board[nextIndex] != PIECES.OFF_BOARD && !this.currentPieces.includes(this.board[nextIndex])){
                                pawnAttacks.push([currentIndex, nextIndex]);
                            }
                        }
                    }
                } 
            }
        }
        
        return pawnAttacks;
    }

    getRookMoves(){
        var rookMoves = [];
        var currentIndex;

        for(var i = RANKS.RANK_1; i <= RANKS.RANK_8; i++){
            for(var j = FILES.FILE_A; j <= FILES.FILE_H; j++){

                currentIndex = 20 + i * 10 + j + 1;

                if(this.board[currentIndex] == this.currentPieces[3]){
                    rookMoves.push.apply(rookMoves, this.getSlidingPiecesMoves(currentIndex, ROOK_MOVES));
                }
            }
        }

        return rookMoves;
    }

    getKnightMoves(){
        var knightMoves = [];
        var nextIndex;
        var currentIndex;

        for(var i = RANKS.RANK_1; i <= RANKS.RANK_8; i++){
            for(var j = FILES.FILE_A; j <= FILES.FILE_H; j++){

                currentIndex = 20 + i * 10 + j + 1;

                if(this.board[currentIndex] == this.currentPieces[2]){
                 
                    for(var k = 0; k < KNIGHT_MOVES.length; k++){
                        nextIndex = currentIndex + KNIGHT_MOVES[k];
                       
                        if(this.board[nextIndex] != PIECES.OFF_BOARD && !this.currentPieces.includes(this.board[nextIndex])){
                            knightMoves.push([currentIndex, nextIndex]);
                        }
                    }
                }
            }
        }

        return knightMoves;
    }

    getBishopMoves(){
        var bishopMoves = [];
        var currentIndex;

        for(var i = RANKS.RANK_1; i <= RANKS.RANK_8; i++){
            for(var j = FILES.FILE_A; j <= FILES.FILE_H; j++){

                currentIndex = 20 + i * 10 + j + 1;

                if(this.board[currentIndex] == this.currentPieces[1]){
                    bishopMoves.push.apply(bishopMoves, this.getSlidingPiecesMoves(currentIndex, BISHOP_MOVES));
                }
            }
        }

        return bishopMoves;
    }

    getQueenMoves(){
        var queenMoves = [];
        var currentIndex;

        for(var i = RANKS.RANK_1; i <= RANKS.RANK_8; i++){
            for(var j = FILES.FILE_A; j <= FILES.FILE_H; j++){

                currentIndex = 20 + i * 10 + j + 1;

                if(this.board[currentIndex] == this.currentPieces[4]){
                    queenMoves.push.apply(queenMoves, this.getSlidingPiecesMoves(currentIndex, QUEEN_MOVES));
                }
            }
        }

        return queenMoves;
    }
    
    getKingMoves(){

        var kingMoves = [];
        var nextIndex;
        
        // generate normal king moves

        for(var i = 0; i < KING_MOVES.length; i++){
            nextIndex = this.kingIndex + KING_MOVES[i];

             // checking if next index falls off board and doesnot contain same piece
             if(this.board[nextIndex] != PIECES.OFF_BOARD && !this.currentPieces.includes(this.board[nextIndex])){
                kingMoves.push([this.kingIndex, nextIndex]);
            }
        }

        return kingMoves;
    }

    getCastleMoves(){
        var kingMoves = [];

        // Castling move
        if(!this.isChecked){

            if(this.turn == COLORS.WHITE){
                
                for(var i = 0; i < this.castlingInfo.length; i++){
                    if(this.castlingInfo[i] == PIECES.w_k){
                        var blocked = false;

                        for(var j = 0; j < CASTLE_WHITE_KING_SIDE.length; j++){
                            if(this.attackedPositions.has(CASTLE_WHITE_KING_SIDE[j]) || 
                            this.board[CASTLE_WHITE_KING_SIDE[j]] != PIECES.EMPTY){
                                blocked = true;
                                break;
                            }
                        }

                        if(!blocked){
                            kingMoves.push([this.kingIndex, this.kingIndex + 2]);
                        }
                    }
                    else if(this.castlingInfo[i] == PIECES.w_q){
                        var blocked = false;

                        for(var j = 0; j < CASTLE_WHITE_QUEEN_SIDE.length; j++){
                            if(this.attackedPositions.has(CASTLE_WHITE_QUEEN_SIDE[j]) || 
                            this.board[CASTLE_WHITE_QUEEN_SIDE[j]] != PIECES.EMPTY){
                                blocked = true;
                                break;
                            }
                        }

                        if(!blocked){
                            kingMoves.push([this.kingIndex, this.kingIndex - 2]);
                        }
                    }
                }
            }
            else{
                
                for(var i = 0; i < this.castlingInfo.length; i++){
                    if(this.castlingInfo[i] == PIECES.b_k){
                        var blocked = false;

                        for(var j = 0; j < CASTLE_BLACK_KING_SIDE.length; j++){
                            if(this.attackedPositions.has(CASTLE_BLACK_KING_SIDE[j]) || 
                            this.board[CASTLE_BLACK_KING_SIDE[j]] != PIECES.EMPTY){
                                blocked = true;
                                break;
                            }
                        }

                        if(!blocked){
                            kingMoves.push([this.kingIndex, this.kingIndex + 2]);
                        }
                    }
                    else if(this.castlingInfo[i] == PIECES.b_q){
                        var blocked = false;

                        for(var j = 0; j < CASTLE_BLACK_QUEEN_SIDE.length; j++){
                            if(this.attackedPositions.has(CASTLE_BLACK_QUEEN_SIDE[j]) || 
                            this.board[CASTLE_BLACK_QUEEN_SIDE[j]] != PIECES.EMPTY){
                                blocked = true;
                                break;
                            }
                        }

                        if(!blocked){
                            kingMoves.push([this.kingIndex, this.kingIndex - 2]);
                        }
                    }
                }
            }
        }

        return kingMoves;
    }

    getSlidingPiecesMoves(currentIndex, pieceMoves){

        var moves = [];
        var nextIndex;

        for(var k = 0; k < pieceMoves.length; k++){

            nextIndex = currentIndex + pieceMoves[k];

            while(true){
                if(this.board[nextIndex] == PIECES.OFF_BOARD || this.currentPieces.includes(this.board[nextIndex])){
                    break;
                }
                else if(this.opponentPieces.includes(this.board[nextIndex])){
                    moves.push([currentIndex, nextIndex]);
                    break;
                }
                else{
                    moves.push([currentIndex, nextIndex]);
                    nextIndex += pieceMoves[k];
                }
            }
           
        }

        return moves;
    }

    getNextAttackedPosiitons(){
        // same as calculated above .. but for reason of sending to another move
    }

    makeMove(){
        // TODO: makes move .. update board, turn, castling info .. basically fen string .. return fen .. 
        // TODO: check pawn promotion , en passant
        // if king moves..castling is void for that side and if rook moves or is captured
        // maybe keep track of captured pieces [to show in UI] -- keep track from main
        // if move = [95, 97] or [95, 93] or similar for black and 95 == 'K' then it's castle move


        // remove fen from cosntructor .. update all and play same instance
    }

    setIndexAndPieces(){
        
        if(this.turn == COLORS.WHITE){
            this.kingIndex = this.board.indexOf(PIECES.w_k);
            this.currentPieces = WHITE_PIECES;
            this.opponentPieces = BLACK_PIECES;
        }
        else{
            this.kingIndex = this.board.indexOf(PIECES.b_k);
            this.currentPieces = BLACK_PIECES;
            this.opponentPieces = WHITE_PIECES;
        }
    }

}
