function Ball(parentElem, radius, top, left, speed, angle){

    this.parentElem = parentElem;
    this.element;
    this.top = top;
    this.left = left;
    this.radius = radius;
    this.centerX = left + radius;
    this.centerY = top + radius;
    this.speed = speed;
    this.angle = angle;
    
    this.init = function(){
        this.create();
    }

    this.create = function(){
        this.element = document.createElement('div');

        this.element.style.position = 'absolute';
        this.element.style.width = this.radius * 2 + 'px';
        this.element.style.height = this.radius * 2 + 'px';
        this.element.style.backgroundColor = 'rgb(5, 223, 34)';
        this.element.style.borderRadius = '50%';
        
        this.draw();

        this.parentElem.appendChild(this.element);

    }

    this.draw = function(){

        this.element.style.left = this.left + 'px';
        this.element.style.top = this.top + 'px';

    }

    this.move = function(){
    
        this.left += this.speed * Math.cos(convertToRadian(this.angle));
        this.top += this.speed * Math.sin(convertToRadian(this.angle));

        this.centerX = this.left + this.radius;
        this.centerY = this.top + this.radius;

        this.draw();

        function convertToRadian(angle){
            var rad = angle / 180 * Math.PI;
            return rad;
        }
    }

}



function Game(n){

    this.containerHeight;
    this.containerWidth;
    this.numberOfBalls = n;
    this.container;
    this.balls = []
    this.FPS = 60;
    this.ANIMATION_FRAME = 1000 / this.FPS;


    this.init = function(){
        this.createBox();
        this.createBalls();

        this.update();
    }

    this.createBox = function(){
        this.container = document.createElement('div');
        this.container.classList.add('box-container');

        document.body.appendChild(this.container);

        var containerStyle = getComputedStyle(this.container);
        this.containerWidth = parseInt(containerStyle.width)
        this.containerHeight = parseInt(containerStyle.height);
    }

    this.createBalls = function(){
        for(var i = 0; i < this.numberOfBalls; i++){

            var MIN_RADIUS = 5;
            var MAX_RADIUS = 15;
            var MIN_SPEED = 1;
            var MAX_SPEED = 6;
            var MAX_ANGLE = 360;
            var MIN_ANGLE = 0;
        
            var ballRadius = Math.round(Math.random() * (MAX_RADIUS - MIN_RADIUS) + MIN_RADIUS);
     
            var ballTop = Math.round(Math.random() * (this.containerHeight - ballRadius * 2 - 5) + 5);
            var ballLeft = Math.round(Math.random() * (this.containerWidth - ballRadius * 2 - 5) + 5);
            

            // check that no two balls spawn together until there is space
            for(var i = 0; i < this.balls.length; i++){
                if (ballTop >= this.balls[i].top && ballTop <= (this.balls[i].top + this.balls[i].radius)){
                    if (ballLeft >= this.balls[i].left && ballLeft <= (this.balls[i].left + this.balls[i].radius)){
                        var ballTop = Math.round(Math.random() * (this.containerHeight - ballRadius * 2 - 5) + 5);
                        var ballLeft = Math.round(Math.random() * (this.containerHeight - ballRadius * 2 - 5) + 5);
                    }
                }

            }

            var init_speed = Math.round(Math.random() * (MAX_SPEED - MIN_SPEED) + MIN_SPEED);
            var init_angle = Math.round(Math.random() * (MAX_ANGLE - MIN_ANGLE) + MIN_ANGLE);
            
            var ball = new Ball(this.container, ballRadius, ballTop, ballLeft, init_speed, init_angle);
            ball.init();

            this.balls.push(ball);
        }

    }

    this.update = function(){

        setInterval(this.moveBalls.bind(this), this.ANIMATION_FRAME);

    }

    this.moveBalls = function(){
        for(var i = 0; i < this.balls.length; i++){

            // checking collision with container
            if(this.balls[i].top < 0 || this.balls[i].left <= 0 || 
                this.balls[i].left > (this.containerWidth - this.balls[i].radius * 2) || 
                this.balls[i].top > (this.containerHeight - this.balls[i].radius * 2))
            {
                this.balls[i].angle = Math.abs((this.balls[i].angle + 90) % 360);
            }

            // checking collision with other balls
            for(var j = 0; j < this.balls.length; j++){
                if(this.balls[i] != this.balls[j]){

                    var dx = this.balls[i].centerX - this.balls[j].centerX;
                    var dy = this.balls[i].centerY - this.balls[j].centerY;

                    var dist = Math.sqrt( dx * dx + dy * dy);

                    //console.log(dist);

                    if(dist < (this.balls[i].radius + this.balls[j].radius)){

                        //console.log('collision detected');

                        this.balls[i].angle = Math.abs((this.balls[i].angle + 90) % 360);

                        this.balls[j].angle = Math.abs((this.balls[j].angle + 90) % 360);
                    }

                }
            }

            this.balls[i].move();

        }
    }
}

var game = new Game(10).init();
// var d = new Game(10).init();
// var a = new Game(15).init();
// var as = new Game(10).init();


