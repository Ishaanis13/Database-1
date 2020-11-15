var ball;
var database1, position;

function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    database1 = firebase.database();
    var ballRef = database1.ref("ball/position")
    ballRef.on("value",readPosition,showError)
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}

function showError() {
    console.log("There is an Error");
};

function readPosition(data) {
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;
};

function writePosition(x,y) {
    var options = {
        "x": position.x + x, 
        "y": position.y +y
    };
    database1.ref("ball/position").set(options);

};