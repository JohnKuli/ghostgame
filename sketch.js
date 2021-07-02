var player,tower,invGround,door,platform;
var playerImg,towerImg,doorImg,platformImg;
var groundGroup,doorGroup,platfromGrounp;
var gameState=1;

function preload() {
  playerImg=loadAnimation("ghost-jumping.png", "ghost-standing.png");
  doorImg=loadImage("door.png");
  platformImg=loadImage("climber.png");
  towerImg=loadImage("tower.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  tower=createSprite(width/2,height/2);
  tower.addImage(towerImg);
  // tower.scale=1.7;
  tower.velocityY=1; 
  
  player=createSprite(windowWidth/2,windowHeight/2)
  player.addAnimation("jumping", playerImg);
  player.velocityY=2;
  player.scale=0.5;
  
  groundGroup=new Group();
  doorGroup=new Group();
  platformGroup=new Group();
  
}

function draw() {
  background("black");
  
  if(gameState===1) {
   if(tower.y>height-400) {
     tower.y=height/2;
   }

  spawnDoor();
  
  if(keyDown("space")) {
    player.velocityY=-3
  }
  
  if(keyDown("RIGHT_ARROW")) {
    player.x=player.x+3
  }
  
  if(keyDown("LEFT_ARROW")) {
    player.x=player.x-3
  }
  
  player.velocityY=player.velocityY+0.5;
  
  if(player.isTouching(platformGroup)) {
    player.velocityY=0;
  }
    
  if(player.isTouching(groundGroup)||player.y>height) {
    gameState=0;
  }
    
  drawSprites();
  }
  
  if(gameState===0) {
    fill("yellow");
    textSize(30);
    text("game over",width/2,height/2);
  }
  
}

function spawnDoor() {
  if(frameCount%240===0) {
    door=createSprite(width/2,-200);
    door.addImage(doorImg);
    door.x=Math.round(random(width/2-300, width/2+300));
    door.velocityY=2
    door.lifetime=2000;
    
    doorGroup.add(door);
    
    platform=createSprite(door.x,-150);
    platform.addImage(platformImg);
    platform.velocityY=2;
    platform.lifetime=2000;
    
    platformGroup.add(platform);
    
    invGround=createSprite(door.x,-140);
    invGround.height=2;
    invGround.velocityY=2;
    invGround.lifetime=2000;
    invGround.visible=false;
    
    groundGroup.add(invGround);
    
    door.depth=player.depth;
    player.depth=player.depth+1;
    platform.depth=player.depth
    
  }
}