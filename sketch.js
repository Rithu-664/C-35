var ball;
var database;

function setup(){
    createCanvas(500,500);
     database = firebase.database();
     console.log(database);


    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    var position = database.ref('ball/position');
    position.on("value",getPosition,showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function getPosition(data){
  var pos = data.val();
  ball.x = pos.x;
  ball.y = pos.y;
}

function showError(){
  console.log("error while connecting to database")
}

function changePosition(x,y){
    database.ref('ball/position').set({x:ball.x+x,y:ball.y+y});
}
