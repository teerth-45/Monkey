var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey_running, monkey_collided;
var banana, bananaImage, obstacle, obstacleImage, ground, groundImage;
var obstacleGroup, bananaGroup;
var score = 0;

function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");
  
  monkey_collided=loadAnimation("sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("ground.png");
}

function setup() {
  createCanvas(600, 600);

  monkey = createSprite(50, 340, 20, 50);
  monkey.addAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");
  monkey.scale = 0.1;

  ground = createSprite(200, 350, 600, 20);
  ground.x = ground.width / 2;
  ground.velocityX = -(6 + score / 100);

  obstacleGroup = new Group();
  bananaGroup=new Group();

  score = 0;
}

function draw() {
  background("white");
  text("Score: " + score, 500, 50);
  monkey.debug = true;
  //obstacle.debug=true;
  if (gameState === PLAY) {
    ground.velocityX = -(6 + score / 100);

    if (keyDown("space") && monkey.y >= 300) {
      monkey.velocityY = -14;
    }

    monkey.velocityY = monkey.velocityY + 0.9;
    if (ground.x < 300) {
      ground.x = ground.width / 2;
    }

    monkey.collide(ground);
    banana();
    obstacle();

    if (obstacleGroup.isTouching(monkey)) {
      gameState = END;
    }
  } 
  else if (gameState === END) {

    //set velcity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
    monkey.changeAnimation("sprite_8.png",monkey_collided);
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);

    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);

    if (keyDown("space") || keyDown("up")) {
      reset();
    }
  }


  drawSprites()
}

function reset() {
  gameState = PLAY;
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();

  if (localStorage["HighestScore"] < score) {
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);

  score = 0;
}

function banana() {
  if (frameCount % 60 === 0) {
    var banana = createSprite(600, 240, 50, 50);
    banana.velocityX = -(6 + 2 * score / 100);
    banana.addImage("banana.png", bananaImage);
    banana.scale = 0.1;
    banana.lifetime = 300;
    bananaGroup.add(banana);
  }
}

function obstacle() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600, 320, 10, 40);
    obstacle.velocityX = -(6 + 2 * score / 100);
    obstacle.addImage("obstacle.png", obstacleImage);
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
  }
}