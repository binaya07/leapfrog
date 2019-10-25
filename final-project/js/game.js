
class Game{
    constructor(chess){
        this.chess = chess;

        this.boardContainer = document.getElementsByClassName('board')[0];

        this.boardContainer.onclick = this.checkClick;
    }

    addBoard(boardArray){
        for(var i = RANKS.RANK_1; i <= RANKS.RANK_8; i++ ){

            var row = document.createElement('div');
            var rank = 8 - i;
            var rankId = 'rank-' + rank;
            row.classList.add('rank-row');
            row.setAttribute('id', rankId);
                        
            this.boardContainer.appendChild(row);

            for(var j = FILES.FILE_A; j <= FILES.FILE_H; j++){

                var col = document.createElement('div');
                col.classList.add('square');
                var fileId = FILE_REPR[j] + rank;
                col.setAttribute('id', fileId);

                if((i+j) % 2 == 0){
                    col.classList.add('light-square');
                }
                else{
                    col.classList.add('dark-square');
                }

                row.appendChild(col);
                
                if(j == 0){
                    var rankInfo = document.createElement('span');
                    rankInfo.classList.add('rank-info');
                    rankInfo.innerHTML = rank;

                    col.appendChild(rankInfo);
                }

                if(i == RANKS.RANK_8){
                    var fileInfo = document.createElement('span');
                    fileInfo.classList.add('file-info');
                    fileInfo.innerHTML = FILE_REPR[j];

                    col.appendChild(fileInfo);                
                }

                var boardIndex = i * 8 + j;
                
                switch(boardArray[boardIndex]){
                    case PIECES.b_p:
                        var img = this.addPiece('black', 'pawn', 'images/bP.png');
                        col.appendChild(img); 
                        break;

                    case PIECES.w_p:
                        var img = this.addPiece('white', 'pawn', 'images/wP.png');
                        col.appendChild(img); 
                        break;

                    case PIECES.b_r:
                        var img = this.addPiece('black', 'rook', 'images/bR.png');
                        col.appendChild(img); 
                        break;

                    case PIECES.w_r:
                        var img = this.addPiece('white', 'rook', 'images/wR.png');
                        col.appendChild(img); 
                        break;

                    case PIECES.b_b:
                        var img = this.addPiece('black', 'bishop', 'images/bB.png');
                        col.appendChild(img); 
                        break;

                            
                    case PIECES.w_b:
                        var img = this.addPiece('white', 'bishop', 'images/wB.png');
                        col.appendChild(img); 
                        break;
                    
                    case PIECES.b_n:                        
                        var img = this.addPiece('black', 'knight', 'images/bN.png');
                        col.appendChild(img); 
                        break;
                    
                    case PIECES.w_n:
                        var img = this.addPiece('white', 'knight', 'images/wN.png');
                        col.appendChild(img); 
                        break;
                
                    case PIECES.b_q:
                        var img = this.addPiece('black', 'queen', 'images/bQ.png');
                        col.appendChild(img); 
                        break;
                            
                    case PIECES.w_q:
                        var img = this.addPiece('white', 'queen', 'images/wQ.png');
                        col.appendChild(img); 
                        break;

                    case PIECES.b_k:
                        var img = this.addPiece('black', 'king', 'images/bK.png');
                        col.appendChild(img); 
                        break;
                            
                    case PIECES.w_k:
                        var img = this.addPiece('white', 'king', 'images/wK.png');
                        col.appendChild(img); 
                        break;
        
                    default: break;
                }
            }
        }
    }

    addPiece(class1, class2, imgSrc){
        var img = document.createElement('img');
        
        img.classList.add(class1);
        img.classList.add(class2);
        img.setAttribute('src', imgSrc);
        img.style.width = '70px';
        img.style.height = '70px';
        img.style.paddingBottom ='5px';
        img.style.paddingRight = '5px';
        
        return img;
    }

    removeBoard(){
        this.boardContainer.innerHTML = "";
    }

    checkClick(e){

        var el = e.target;
        
        var x = el.parentElement.getAttribute('id');
        console.log(el.getAttribute('class').split(" "));
        console.log(x);
    }

    play(){

        var pMoves = this.chess.getPseudoLegalMoves();

        var ind = parseInt(Math.random() * pMoves.length - 1);
        
        this.chess.makeMove(pMoves[ind]);
               
        var b = Utils.convertArray120To64(this.chess.board);
       
        this.removeBoard();
        this.addBoard(b);
        
        this.drawPath(pMoves[ind]);
 
        //game.removeBoard();


        // var b = Utils.convertArray120To64(this.chess.board);

        // game.addBoard(b);


    }

    drawPath(move){
        var src = move[0];
        var dest = move[1];

        var srcX = (src % 10) * 70 - 15;
        var srcY = ( parseInt(src / 10) % 10 ) * 70 - 85;

        var destX = (dest % 10) * 70 - 15;
        var destY = ( parseInt(dest / 10) % 10 ) * 70 - 85;

        // if(dest - src)
        var dots = document.createElement('div');
        dots.style.width = '10px';
        dots.style.height = '10px';
        dots.style.borderRadius = '50%';
        dots.style.backgroundColor = 'red';
        dots.style.position = 'absolute';
        dots.style.top = srcY + 'px';
        dots.style.left = srcX + 'px';
        this.boardContainer.appendChild(dots);

        var dots = document.createElement('div');
        dots.style.width = '10px';
        dots.style.height = '10px';
        dots.style.borderRadius = '50%';
        dots.style.backgroundColor = 'green';
        dots.style.position = 'absolute';
        dots.style.top = destY + 'px';
        dots.style.left = destX + 'px';


        this.boardContainer.appendChild(dots);
    }
}