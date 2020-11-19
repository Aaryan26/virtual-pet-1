var dog, happyDog;
var database, foodS, foodStock;

function preload()
{
  dogImage=loadImage('images/dogImg.png');
  happyDogImage= loadImage('images/dogImg1.png');
}

function setup() {
	createCanvas(500, 500);
  database= firebase.database();

  dog= createSprite(250,250,10,10);
  dog.addImage(dogImage);
  dog.scale= 0.2;


  foodStock=database.ref('food');
  foodStock.on("value", readStock);
}



function draw() {  

  
  //add styles here
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImage);
  }
  drawSprites();
  fill ('black');
  text ('food is the stock'+ foodS, 200,100);
  
  
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  
  database.ref('/').update({food:x})
}
