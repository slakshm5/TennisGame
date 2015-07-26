/**
 * Created by Sarah on 7/25/2015.
 */
(function() {
    var canvas;
    var canvasContext;

    var ballX = 50;
    var ballY = 50;
    var ballSpeedX = 12;
    var ballSpeedY = 4;

    var paddle1Y = 250;
    var paddle2Y = 250;

    var player1Score = 0;
    var player2Score = 0;
    var winScreen = false;

    const MAX_SCORE = 10;
    const PADDLE_HEIGHT = 100;
    const PADDLE_THICKNESS = 10;

    window.onload = function () {
        init();

        var framesPerSec = 30;
        setInterval(function(){
            moveAll();
            drawAll();
        },1000/framesPerSec);

        canvas.addEventListener('mousemove',function(evt){
            var mousePos = calcMousePos(evt);
            paddle1Y = mousePos.y -(PADDLE_HEIGHT/2);
        });
    };
    function init(){
        canvas = document.getElementById('gameCanvas');
    }
    function drawAll(){
        canvasContext = canvas.getContext('2d');
        colorRect(0, 0, canvas.width, canvas.height, 'black');

        if(winScreen){
            canvasContext.fillStyle = 'white';
            canvasContext.fillText("Click to continue",100,100);
        }
        colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
        colorRect(canvas.width-PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
        colorCircle(ballX, ballY, 10, 'white');

        canvasContext.fillText(player1Score,100,100);
        canvasContext.fillText(player2Score,canvas.width-100,100);
    }
    function colorCircle(centerX, centerY, radius, drawColor){
        canvasContext.fillStyle = drawColor;
        canvasContext.beginPath();
        canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
        canvasContext.fill();
    }
    function moveAll(){
        if(winScreen){
            return;
        }
        AIPlayer();

        ballX += ballSpeedX;
        ballY += ballSpeedY;

        if(ballX>canvas.width){
            if((ballY > paddle2Y)&&(ballY<paddle2Y + PADDLE_HEIGHT)){
                ballSpeedX = -ballSpeedX;

                var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT/2);
                ballSpeedY = deltaY * 0.35;
            }else{
                player1Score++;
                ballReset();
            }
        }
        if(ballX<0){
            if((ballY > paddle1Y)&&(ballY < paddle1Y + PADDLE_HEIGHT)){
                ballSpeedX = -ballSpeedX;

                var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT/2);
                ballSpeedY = deltaY * 0.35;
            }else{
                player2Score++;
                ballReset();
            }
        }
        if(ballY>canvas.height){
                ballSpeedY = -ballSpeedY;
        }
        if(ballY<0){
                ballSpeedY = -ballSpeedY;
        }
    }
    function colorRect(leftX, topY, width, height, drawColor){
        canvasContext.fillStyle = drawColor;
        canvasContext.fillRect(leftX, topY, width, height);

    }
    function calcMousePos(evt){
        var rect = canvas.getBoundingClientRect();
        var root = document.documentElement;
        var mouseX = evt.clientX - rect.left - root.scrollLeft;
        var mouseY = evt.clientY -rect.top - root.scrollTop;
        return{
            x:mouseX,
            y:mouseY
        };
    }
    function ballReset(){
        if((player1Score >= MAX_SCORE) || (player2Score  >= MAX_SCORE)){
            player1Score = 0;
            player2Score = 0;
            winScreen = true;
        }

        ballX = canvas.width/2;
        ballY = canvas.height/2;
        ballSpeedX = -ballSpeedX;
    }
    function AIPlayer() {
        var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT / 2);
        if (paddle2YCenter < ballY - 35) {
            paddle2Y += 10;
        }
        else if (paddle2YCenter < ballY + 35) {
            paddle2Y -= 10;
        }
    }

})();