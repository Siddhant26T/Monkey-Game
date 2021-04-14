var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running,ground,monkey_run
var banana ,bananaImage, obstacle, obstacleImage,banana1
var FoodGroup, obstacleGroup,survivalTime
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_run = loadAnimation("sprite_0.png")
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,350);
    //creating monkey
  monkey = createSprite(80,315,50,50);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  //creating ground
   ground = createSprite(400,350,1500,10);
   ground.velocityX = -4;
   ground.x=ground.width /2;
  FoodGroup = new Group();
  obstacleGroup = new Group();
  score = 0;
}


function draw() {
  background("green");
    //making ground infinite
  if(ground.x > 0 ){
    ground.x = ground.width/2;
  }
  //making monkey move
  if(keyDown("space") && monkey.y >= 100){
     monkey.velocityY = -12;
  }
  //gravity by me not by newton
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  //increasing score
  if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach(); 
    score = score + 1;
  }
  if(monkey.isTouching(obstacleGroup)){
    gameState = END;
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
  }
  if(gameState === END){
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
    gameend();
    }
  //calling the fuction obstacle
  mainObbstacle();
  //making banana 
  banana();
  //drawsrite
  drawSprites();
  //text
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time "+ survivalTime, 100,50);
}
function banana (){
  if(World.frameCount%130 === 0){
    banana1 = createSprite(600,115,20,20)
    banana1.y = Math.round(random(100,200));
    banana1.addImage(bananaImage);
    banana1.scale = 0.1;
    banana1.velocityX = -4;
    banana1.lifetime = 200;
    FoodGroup.add(banana1);
  }
}
function obstacles(){
    obstacle = createSprite(600,330,20,20);
    obstacle.addImage(obstaceImage);
    obstacle.velocityX = -4;
    obstacle.scale = 0.1;
    obstacle.lifetime = 200;
  obstacleGroup.add(obstacle);
}
function obstacles1(){
    obstacle01 = createSprite(600,318,20,20);
    obstacle01.addImage(obstaceImage);
    obstacle01.velocityX = -4;
    obstacle01.scale = 0.15;
    obstacle01.lifetime = 200;
  obstacleGroup.add(obstacle01);
}
function obstacles2(){
    obstacle02 = createSprite(600,315,20,20);
    obstacle02.addImage(obstaceImage);
    obstacle02.velocityX = -4;
    obstacle02.scale = 0.175;
    obstacle02.lifetime = 200;
  obstacleGroup.add(obstacle02);
  }
function mainObbstacle(){
  if(frameCount % 150 === 0) {
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacles();
              break;
      case 2: obstacles1();
              break;
      case 3: obstacles2();
              break;
  }
}
}
function gameend(){
   FoodGroup.destroyEach();
  obstacleGroup.destroyEach();
  stroke("white");
  textSize(50);
  fill("white")
  text("FinalScore: "+ score, 200,200);
  textSize(50);
  textSize(50);
  text("GAMEOVER",200,100);
  fill("white")
  monkey.destroy();
  
}