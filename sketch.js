var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage,obstagoonGroup;
var o1,o2,o3,o4,o5,o6
var gamefinish,gametrulyOver
var restartgame,gameforgetsfailures
var swaddle,beepboop,yayscore

var score = 0

var newImage;

var statesofIndia = "play"

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
 
  o1 = loadImage("obstacle1.png")
  o2 = loadImage("obstacle2.png")
  o3 = loadImage("obstacle3.png")
  o4 = loadImage("obstacle4.png")
  o5 = loadImage("obstacle5.png")
  o6 = loadImage("obstacle6.png")
  gamefinish = loadImage("gameOver.png")
  restartgame = loadImage("restart.png")
  swaddle = loadSound("jump.mp3")
  beepboop = loadSound("die.mp3")
  yayscore = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(600, 200);
  
  
  gametrulyOver = createSprite(300,70,30,30)
  gameforgetsfailures = createSprite(300,120,30,30)
  gametrulyOver.addImage(gamefinish)
  gameforgetsfailures.addImage(restartgame)
  gametrulyOver.scale = 0.7
  gameforgetsfailures.scale = 0.6

  
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
 
  
  invisibleGround = createSprite(200,190,400,10);
   invisibleGround.visible = false;
  
  //trex.debug = true
  trex.setCollider("circle",0,0,40)
  
  
  cloudsGroup = new Group()
  obstagoonGroup = new Group()
}

function draw() {
  background(180);
 // console.log("trex"+trex.depth)
  textFont("Georgia")
  
  text ("score " + score,530,30)
  
 

  if (statesofIndia==="play"){
  score = score+Math.round(getFrameRate()/60)
  
  if(score%100===0&&score>=100){
   yayscore.play(); 
  }
  if(keyDown("space") && trex.y>=160) {
    trex.velocityY = -12;
    swaddle.play();
    
  }
  trex.velocityY = trex.velocityY + 0.65
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    
  gametrulyOver.visible = false
  gameforgetsfailures.visible = false
  
    if(score<100){
      
      ground.velocityX = -4
      
      }
      else{
        
      ground.velocityX = -4*score/100  
        
      }
      
    
   if (obstagoonGroup.isTouching(trex)){
    
    statesofIndia = "end"
    beepboop.play();
  }
    obstacledoos();
    spawnClouds();
  }
  
  else if(statesofIndia==="end"){
  ground.velocityX = 0
    obstagoonGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
    trex.changeAnimation("collided",trex_collided)
  
    cloudsGroup.setLifetimeEach(-1)
    obstagoonGroup.setLifetimeEach(-1)
    trex.velocityY = 0
    gametrulyOver.visible = true
    gameforgetsfailures.visible = true
    
    
    if(keyDown("space")||mousePressedOver(gameforgetsfailures)){
     restartlife(); 
     statesofIndia = "play" 
     
    }
    
  }
  
  trex.collide(invisibleGround);

  //spawn the clouds
 
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(30,110))
    cloud.scale = Math.random(0.3,0.8)
    cloud.velocityX = -4-score/100;
    //console.log("cloud"+cloud.depth)
    cloud.depth = trex.depth
    trex.depth = trex.depth+1
    cloud.lifetime = 197
    cloudsGroup.add(cloud)
    }
}

function obstacledoos(){
if (frameCount % 120 ===0) {
  
  obstacle = createSprite(600,170,20,70)     
  randumbs = Math.round(random(1,6))
  switch(randumbs){
    case 1:obstacle.addImage(o1)
      break
      case 2:obstacle.addImage(o2) 
      break
      
      case 3:obstacle.addImage(o3) 
      break
      
      case 4:obstacle.addImage(o4) 
      break
      
      case 5:obstacle.addImage(o5) 
      break
      
      case 6:obstacle.addImage(o6) 
      break
      
      default:break
  }
      
      
      if(score<100){
      
      obstacle.velocityX = -4
      
      }
      else{
        
      obstacle.velocityX = -4*score/100  
        
      }
      
      obstacle.scale = 0.5
      obstacle.lifetime = 193
      
      obstagoonGroup.add(obstacle)
  
}
}

  
function restartlife(){
  
trex.changeAnimation("running", trex_running)
score = 0
cloudsGroup.destroyEach()
obstagoonGroup.destroyEach()
}

