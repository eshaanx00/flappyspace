const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var obimg
var engine, world;
var ob,obgroup
var bulletG,bullet 
var score=0
var xc,yc
var timeL=0
var time=0
var flag=0
var game="home"
var play,playImg
function preload(){
  jumpimg=loadImage("jump.png")
  shotimg=loadImage("shoot.png");
ob1img=loadImage("ob1.png")
ob2img=loadImage("ob2.png")
ob3img=loadImage("ob3.png")
spimg=loadImage("Game.png")
spup=loadImage("gameup.png")
bulimg=loadImage("bullet.png")
bg=loadImage("background.jpg")
explosion=loadSound("explosion.mp3")
theme=loadSound("theme.ogg")
controlimg=loadImage("controls.png");
playImg=loadImage("play.png")
}
function setup() {
  createCanvas(displayWidth,displayHeight);
  engine = Engine.create();
    world = engine.world;
    controls=createSprite(displayWidth/2,displayHeight/2+300);
    controls.addImage(controlimg);
    controls.scale=0.4
    shoot=createSprite(displayWidth-100,displayHeight-100)
      shoot.addImage(shotimg);
      shoot.scale=0.5
    jump=createSprite(100,displayHeight-100)
    jump.addImage(jumpimg)
    jump.scale=0.9
   spaceship=createSprite(120,displayHeight/2)
   play=createSprite(displayWidth/2,displayHeight/2-200)
  play.scale=0.5
   play.addImage(playImg)
   obgroup=new Group();
   bulletG=new Group()
spaceship.addImage(spimg)
spaceship.scale=0.3
theme.play()
theme.loop();
}
setInterval(call,1000);
setInterval(sc,500);
setInterval(cxc,400)
function cxc(){
  xc=500
}
function sc(){
  time=time+1
}
function call(){
  timeL=timeL+1
  flag=0
}
function draw() {
  background(bg);  
  Engine.update(engine);
  console.log(touches)
          
  if(game==="home"){
    textSize(32)
    play.visible=true
    controls.visible=true
   jump.visible=false
   shoot.visible=false
   if(keyDown("k")){
     game="controls"
   }
    fill(random(0,255),random(0,255),random(0,255))
  text("Play",displayWidth/2-18,displayHeight/2-300)
  text("Controls",displayWidth/2-28,displayHeight/2+100)
  if(touches.length>0&&touches[0].y<displayHeight/2){
    game="play"
    touches=[]
  }
  if(touches.length>0&&touches[0].y>displayHeight/2){
game="controls"
touches=[]
  }
  if(mousePressedOver(play)){
    game="play"
  }
    if(keyDown("space")){
      game="play"

    }
  }
  if(game==="controls"){
    textSize(26)
    fill(random(0,255),random(0,255),random(0,255))
    text("Shoot",displayWidth/2+495,displayHeight/2+160)
    text("Boost",displayWidth/2-575,displayHeight/2+160)
    spaceship.visible=false
    play.visible=false
    controls.visible=false
    jump.visible=true
    shoot.visible=true
    text("press anywhere to go back",displayWidth/2-100,displayHeight/2+100)
    if(touches.length>0){
game="home"
touches=[]
    }
  }
  if(game==="play"){
    callob();
    spaceship.visible=true
    shoot.visible=true
    jump.visible=true
    controls.visible=false
    play.visible=false
    
    if(touches.length>0&&touches[0].x<150){
      spaceship.y-=50 
      spaceship.addImage(spup)
   touches=[]
    }
   
if(mousePressedOver(jump)){
  spaceship.y-=20 
      spaceship.addImage(spup) 
}
    if(spaceship.y>displayHeight){
      game="end"
    }
    if(spaceship.y<-2){
      game="end"
    }
    fill("green")
    text("Score "+score,displayWidth-100,20)
   if(frameCount%10===0){
     score+=2
   }
    if(keyDown("space")){
      spaceship.y-=20 
      spaceship.addImage(spup) 
    }
    if(keyWentUp("space")){
      spaceship.y+=10
      spaceship.addImage(spimg) 
    }
    for(var i=0;i<obgroup.length;i++){
      if(obgroup.get(i).isTouching(spaceship)){
        obgroup.get(i).destroy()
        game="end"
      }
      
    }
    for (var i=0;i<obgroup.length;i++){
      
    for(var j=0;j<bulletG.length;j++){
      if(bulletG.get(j).isTouching(obgroup.get(i))){
        obgroup.get(i).destroy()
        bulletG.get(j).destroy()
        explosion.play()
        score+=40
        textSize(22)
   text("+10",displayWidth-100,80)
      }
    }
  }
 if(touches.length>0&&touches[0].y>600&&timeL%2===0&&flag===0||keyWentDown("ctrl")&&timeL%2===0&&flag===0){
   bullet=createSprite(spaceship.x,spaceship.y)
   bullet.addImage(bulimg)
   bullet.scale=0.7
   bullet.velocityX+=20
   bullet.lifetime=180
   bulletG.add(bullet)
   timeL=0
   flag=1
   touches=[]
   
 }
    
    spaceship.y+=10
  }
  if(game==="end"){
    fill(random(0,255),random(0,255),random(0,255))
   if(score<500){
     textSize(32)
     text("unfortunately,your spaceship got distroyed and you got a good score of "+score,displayWidth/2-560,displayHeight/2-200)
     text("You can always improve as well said practice makes man perfect",displayWidth/2-500,displayHeight/2-100)
   }
   if(score>500&&score<3500){
    textSize(32)
    text("unfortunately,your spaceship got distroyed and you got a average score of "+score,displayWidth/2-560,displayHeight/2-200)
    text("You can always improve as well said practice makes man perfect",displayWidth/2-500,displayHeight/2-100)
   }
   if(score>3500){
    textSize(32)
    text("unfortunately,your spaceship got distroyed and you got a ultimate score of "+score,displayWidth/2-560,displayHeight/2-200)
    text("You can always improve as well said practice makes man perfect",displayWidth/2-500,displayHeight/2-100)
  }
  }
  

drawSprites()
}

function callob(){
  if (frameCount % 120===0&&game==="play"){
    ob=createSprite(displayWidth-20,random(150,displayHeight-100))
    
    ob.setCollider("circle")
   ob.lifetime=1200
   ob.velocityX=-(3+score/50)
 
    var ran=Math.round(random(1,3))

    switch (ran){
      case 1: ob.addImage("ob",ob1img);ob.scale=random(0.4,1);break;
        case 2: ob.addImage("ob",ob2img);ob.scale=random(0.2,0.6);break;
          case 3: ob.addImage("ob",ob3img);ob.scale=random(0.4,1);break;
    }
obgroup.add(ob)
  }
}
