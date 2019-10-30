
// control counters, 3 fold repitition, game over -- draw condition check (game over conditions maybe required in minmax to .. maybe)

// to undo moves .. keep track of fen strings

class Main{

    constructor(){

        this.addGameContainer();
        this.addBoardContainer();
        this.addFenElements();
        
        this.loadFirstScreen();

        this.fenButton.onclick = function(){

            var fen = this.fenElement.value.trim();

            chess = new Chess(fen);
            game = new Game(chess);
            
            game.play();
            
            this.id = setInterval(game.play.bind(game), 2000);
            
        }.bind(this);

    }

    addBodyGradient(){
        document.body.style.backgroundImage = 'radial-gradient(circle, #f0d9b5, #e1c49f, #d2b08a, #c39c76, #b58863)';
    }

    addGameContainer(){
        this.gameContainer = document.getElementsByClassName('game-container')[0];
    }
    
    addBoardContainer(){
        this.boardContainer = document.getElementsByClassName('board')[0];
    }

    addPlayOptions(){
        this.singlePlayerButton = document.createElement('button');
        this.singlePlayerButton.style.marginLeft = '219px';
        this.singlePlayerButton.style.backgroundImage = 'radial-gradient(circle, #0007a1, #0035b3, #0051be, #006ac3, #0381c4)';
        this.singlePlayerButton.style.color = 'white';
        this.singlePlayerButton.style.border = 'none';
        this.singlePlayerButton.style.borderRadius = '5%';
        this.singlePlayerButton.style.padding = '25px';
        this.singlePlayerButton.style.fontSize = '20px';
        this.singlePlayerButton.innerHTML = '1 Player';        
        this.singlePlayerButton.style.marginTop = '50px';

        this.boardContainer.appendChild(this.singlePlayerButton);

        
        this.twoPlayerButton = document.createElement('button');
        this.twoPlayerButton.style.marginLeft = '215px';
        this.twoPlayerButton.style.backgroundImage = 'radial-gradient(circle, #0007a1, #0035b3, #0051be, #006ac3, #0381c4)';
        this.twoPlayerButton.style.color = 'white';
        this.twoPlayerButton.style.border = 'none';
        this.twoPlayerButton.style.borderRadius = '5%';
        this.twoPlayerButton.style.padding = '25px';
        this.twoPlayerButton.style.fontSize = '20px';
        this.twoPlayerButton.innerHTML = '2 Players';
        this.twoPlayerButton.style.marginTop = '50px';

        this.boardContainer.appendChild(this.twoPlayerButton);
    }
    
    addGameTitle(){
        this.gameTitle = document.createElement('div');
        this.gameTitle.style.height = '250px';
        this.gameTitle.style.background = 'url(images/chess.png)';
        this.gameTitle.style.backgroundRepeat = 'no-repeat';
        this.gameTitle.style.backgroundSize = 'contain';
        this.gameTitle.style.backgroundPosition = 'center';

        this.boardContainer.appendChild(this.gameTitle);
    }

    loadFirstScreen(){
        this.isFirstScreen = true;

        this.boardContainer.innerHTML = '';
        this.addBodyGradient();
        this.addGameTitle();
        this.addPlayOptions();

        this.singlePlayerButton.onclick = function(){
            this.players = 1;
            this.chooseColor();
        }.bind(this);

        
        this.twoPlayerButton.onclick = function(){
            this.players = 2;
            this.start(false);
        }.bind(this);
        
    }

    chooseColor(){
        this.boardContainer.innerHTML = '';

        this.chooseColor = document.createElement('div');

        this.chooseColor.innerHTML = 'CHOOSE COLOR';
        this.chooseColor.style.fontSize = '70px';
        this.chooseColor.style.textAlign = 'center';
        this.chooseColor.style.color = '#008f47';
        this.chooseColor.style.paddingTop = '50px';

        this.boardContainer.appendChild(this.chooseColor);

        this.blackColorButton = document.createElement('button');
        this.blackColorButton.style.marginLeft = '219px';
        this.blackColorButton.style.background = '#000234';
        this.blackColorButton.style.color = 'white';
        this.blackColorButton.style.border = 'none';
        this.blackColorButton.style.borderRadius = '5%';
        this.blackColorButton.style.padding = '25px';
        this.blackColorButton.style.fontSize = '20px';
        this.blackColorButton.innerHTML = 'Black';        
        this.blackColorButton.style.marginTop = '50px';

        this.boardContainer.appendChild(this.blackColorButton);

        
        this.whiteColorButton = document.createElement('button');
        this.whiteColorButton.style.marginLeft = '219px';
        this.whiteColorButton.style.background = '#BDE8FF';
        this.whiteColorButton.style.color = 'black';
        this.whiteColorButton.style.border = 'none';
        this.whiteColorButton.style.borderRadius = '5%';
        this.whiteColorButton.style.padding = '25px';
        this.whiteColorButton.style.fontSize = '20px';
        this.whiteColorButton.innerHTML = 'White';        
        this.whiteColorButton.style.marginTop = '50px';

        this.boardContainer.appendChild(this.whiteColorButton);

        
        this.blackColorButton.onclick = function(){
            this.start(COLORS.BLACK);
        }.bind(this);

        this.whiteColorButton.onclick = function(){
            this.start(COLORS.WHITE);
        }.bind(this);

    }

    addFenElements(){
        this.fenElement = document.getElementsByClassName('fen-input')[0];
        this.fenButton = document.getElementsByClassName('fen-button')[0];

        // TODO: add GET FEN button too
    }

    start(color){
        this.boardContainer.innerHTML = '';
        document.body.style.background = 'rgb(68, 68, 68)';

        if(color == COLORS.WHITE){
            console.log('start game as player white');

            var chess = new Chess(DEFAULT_POSITION);

            var game = new Game(chess, this.players, COLORS.WHITE);
            
            game.play();
        }

        else if(color == COLORS.BLACK){
            console.log('start game as player black');
            
            var chess = new Chess(DEFAULT_POSITION);

            var game = new Game(chess, this.players, COLORS.BLACK);
            
            game.play();
        }

        else{
            // start multiplayer game

            console.log('start multiplayer game');
            
            var chess = new Chess(DEFAULT_POSITION);

            var game = new Game(chess, this.players, COLORS.WHITE);
            
            game.play();
        }
    }

}

var m = new Main();


// var DEFAULT_POSITION1 = 'rnbqkb1r/8/8/PPPPPPPP/3r4/8/PPPPPPPP/R3K1BR b KQkq - 0 1';



// var chess = new Chess(DEFAULT_POSITION);

// var game = new Game(chess);

// game.play();

// var id = setInterval(game.play.bind(game), 1000);


// var fenElement = document.getElementsByClassName('fen-input')[0];
// var fenButton = document.getElementsByClassName('fen-button')[0];


// fenButton.onclick = function(){
//     clearInterval(id);
//     var fen = fenElement.value.trim();

//     chess = new Chess(fen);
//     game = new Game(chess);
    
//     game.play();
    
//     id = setInterval(game.play.bind(game), 2000);
    
// };




// var t = performance.now();

//var chess = new Chess(DEFAULT_POSITION1);

//console.log(chess.getKingMoves());

//console.log(chess.getCastleMoves());

// var r = performance.now();

// console.log(r-t);
