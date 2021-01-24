
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var houseBorder1, houseBorder2, houseBorder3, houseBorder4;

var bathroomBorder1, bathroomBorder2, bathroomBorder3, bathroomDoor, 
bathroomDoorX, bathroomDoorY, invisibleBathroomDoor, bathroomFloorImg,
bathroomFloorTint = 90, bathroomFloor, bathroomFloorState = 0, 
tub, tubImg, pot, potImg, sink, sinkImg, bathroomCarpetImg;

var hallBorder1, hallDoor, hallBorder2, hallBorder3, hallDoorX, hallDoorY,invisibleHallDoor, hallFloor, 
hallFloorImg, couch, couchImg, dining, invisibleDining, messyDining, cleanDining, diningState = 0, 
hallFloorTint = 120, hallFloor, hallFloorState = 0;

var kitchenDoor, kitchenBorder1, kitchenBorder2, kitchenDoorY, kitchenDoorX, 
invisibleKitchenDoor, kitchenFloorImg, foodGarbage, foodGarbageImg, kitchenFloorState = 0,
kitchenCounter, kitchenCounterImg, kitchenCounterState = 0, dirtyPlateImg1, dirtyPlateImg2, 
plate, cleanPlateImg, invisibleKitchenCounter1,invisibleKitchenCounter2;

var bedroomBorder1, bedroomDoor, bedroomDoorX, bedroomDoorY, 
invisibleBedroomDoor, bedroomFloorImg, bed, invisibleBed, messyBedImg, 
cleanBedImg, bedState = 0, bedsideTable1, bedsideTable2, bedsideTableImg1, 
bedsideTableImg2, bedroomCarpet, computerTable, computerTableImg, wardrobe, wardrobeImg;

var car, carImg;

var road, corridor;
var nanny, nannyStanding, nannyWalking;

var grassImg;

var START = 0, PLAY = 1, CLEANING = 2, END = 3;
var gameState = START, finishImg, score = 0;

var cleaningImg, clean;
var startFC, waitFC;
var sec = 60, countDown;


function preload(){
	grassImg = loadImage("images/grass.jpg");

	hallFloorImg = loadImage("images/woodenFloor4.jpg");
	kitchenFloorImg = loadImage("images/kitchenFloor.jpg");
	bathroomFloorImg = loadImage("images/bathroomFloor.jpg");
	bedroomFloorImg = loadImage("images/woodenFloor.jpg");

	messyBedImg = loadImage("images/messyBed.png");
	cleanBedImg = loadImage("images/cleanBed.png");

	bedsideTableImg1 = loadImage("images/bedsideTable1.png");
	bedsideTableImg2 = loadImage("images/bedsideTable2.png");
	bedsideTableImg2 = loadImage("images/bedsideTable2.png");
	bedroomCarpet = loadImage("images/bedroomCarpet.png");
	wardrobeImg = loadImage("images/wardrobe.png");
	computerTableImg = loadImage("images/computerTable.png");

	messyDining = loadImage("images/messyDining.png");
	cleanDining = loadImage("images/cleanDining.png");

	couchImg = loadImage("images/couch.png");

	foodGarbageImg = loadImage("images/foodGarbage.png");
	kitchenCounterImg = loadImage("images/kitchenCounter.png");
	dirtyPlateImg2 = loadImage("images/dirtyPlate2.png");
	cleanPlateImg = loadImage("images/cleanPlates.png");

	tubImg = loadImage("images/bathtub.jpeg");
	sinkImg = loadImage("images/sink.jpeg");
	potImg = loadImage("images/toilet.png");
	bathroomCarpetImg = loadImage("images/bathroomCarpet.png");

	carImg = loadImage("images/car.png");

	nannyStanding = loadAnimation("images/Standing.png");
	nannyWalking = loadAnimation("images/nannyWalking1.png","images/nannyWalking2.png");
	
	finishImg = loadImage("images/finish.png");
	cleaningImg = loadImage("images/cleaning.png");

}

function setup() {
	createCanvas(windowWidth, windowHeight);

	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.
	
	// road + corridor
	road = createSprite(width/1.20, height/3.03, width/3, height/3.05);
	road.shapeColor = 75;

	corridor = createSprite(width/1.21, height/1.506, width/10.3, height/2.93);
	corridor.shapeColor = 75;

	// house outline
	houseBorder1 = createSprite(width/2, height/6, width*0.75, 3);
	houseBorder1.shapeColor = "black";

	houseBorder2 = createSprite(width/2, height - height/6, width*0.75, 3);
	houseBorder2.shapeColor = "black";

	houseBorder3 = createSprite(width/8, height/2, 3, height*0.67);
	houseBorder3.shapeColor = "black";

	houseBorder4 = createSprite(width - width/8, height/1.505, 3, height*0.34);
	houseBorder4.shapeColor = "black";

	// hall + dining

	hallBorder1 = createSprite(width - width/4.5, height/1.38, 3, height*0.22);
	hallBorder1.shapeColor = "black";

	hallDoor = createSprite(width - width/4.5, height/1.77, 3, height*0.1);
	hallDoor.shapeColor = "red";

	invisibleHallDoor = createSprite(width - width/4.5, height/1.77, width/20, height*0.1);
	invisibleHallDoor.visible = false;

	hallDoorX = hallDoor.x;
	hallDoorY = hallDoor.y;

	hallBorder2 = createSprite(width - width/4.5, height/1.98, 3, height*0.02);
	hallBorder2.shapeColor = "black";

	hallBorder3 = createSprite(width/1.608, height/2.02, width/3.2, 3);
	hallBorder3.shapeColor = "black";

	dining = createSprite(width/2.25, height/1.4);
	dining.addImage(messyDining);
	dining.scale = 0.4;

	invisibleDining = createSprite(width/2.25, height/1.38, width/26, height/7);
	invisibleDining.visible = false;
	
	hallFloor = createSprite(width/1.71, height/1.5, width/2.59, height/2.95);
	hallFloor.visible = false;

	//kitchen

	kitchenDoor = createSprite(width/2.275, height/2.02, width/19.38, 3);
	kitchenDoor.shapeColor = "red";

	invisibleKitchenDoor = createSprite(width/2.275, height/2.02, width/19.38, height/15);
	invisibleKitchenDoor.visible = false;

	kitchenDoorY = kitchenDoor.y;
	kitchenDoorX = kitchenDoor.x;
	
	kitchenBorder1 = createSprite(width/2.478, height/2.02, width* 0.02, 3);
	kitchenBorder1.shapeColor = "black";
	
	kitchenBorder2 = createSprite(width/1.5, height/3.01, 3, height*0.329);
	kitchenBorder2.shapeColor = "black";

	foodGarbage = createSprite(width/2, height/3);
	foodGarbage.addImage(foodGarbageImg);
	foodGarbage.scale = 0.8;

	kitchenCounter = createSprite(width/1.82, height/1.98);
	kitchenCounter.addImage(kitchenCounterImg);
	kitchenCounter.scale = 0.5;

	invisibleKitchenCounter1 = createSprite(width/1.535, height/3.2,width/43, height/3.1);
	invisibleKitchenCounter1.visible = false;

	invisibleKitchenCounter2 = createSprite(width/1.68, height/5,width/11, height/15.5);
	invisibleKitchenCounter2.visible = false;

	plate = createSprite(width/1.535,height/2.2,width/42, height/25);
	plate.shapeColor = "red";
	plate.visible = false;
	
	//bedroom

	bedroomBorder1 = createSprite(width/2.547, height/2.94, 3, height*0.35);
	bedroomBorder1.shapeColor = "black";
	
	bedroomDoor = createSprite(width/2.547, height/1.801, 3, height*0.08);
	bedroomDoor.shapeColor = "red";

	invisibleBedroomDoor = createSprite(width/2.547, height/1.801, width/20, height*0.08);
	invisibleBedroomDoor.visible = false;

	bedroomDoorX = bedroomDoor.x;
	bedroomDoorY = bedroomDoor.y;

	bed = createSprite(width/3.9, height/3.35, width/5.75, height/4.28);
	bed.addImage(messyBedImg);
	bed.scale =0.28;
	bed.setCollider("rectangle",8, 0, width/2.9, height/1.2)

	invisibleBed = createSprite(width/3.88, height/3.35, width/11, height/4.4);
	invisibleBed.visible = false;

	bedsideTable1 = createSprite(width/3.05, height/4.5);
	bedsideTable1.addImage(bedsideTableImg1);
	bedsideTable1.scale = 0.23;

	bedsideTable2 = createSprite(width/5.44, height/4.48);
	bedsideTable2.addImage(bedsideTableImg2);
	bedsideTable2.scale = 0.325;

	wardrobe = createSprite(width/4.9, height/2.3);
	wardrobe.addImage(wardrobeImg);
	wardrobe.setCollider("rectangle", -125, 27, 50,180);

	// wardrobe.scale = 0.9;

	computerTable = createSprite(width/3.4, height/1.76);
	computerTable.addImage(computerTableImg);
	// computerTable.scale = 0.9;

	// bathroom
	bathroomBorder1 = createSprite(width/2.547, height/1.4, 3, height*0.237);
	bathroomBorder1.shapeColor = "black";
	
	bathroomBorder2 = createSprite(width/3.34, height/1.65, width/5.4, 3);
	bathroomBorder2.shapeColor = "black";
	
	bathroomDoor = createSprite(width/5.529, height/1.65, width/19.38, 3);
	bathroomDoor.shapeColor = "red";

	invisibleBathroomDoor = createSprite(width/5.529, height/1.65, width/19.38, height/15);
	invisibleBathroomDoor.visible = false;

	bathroomDoorX = bathroomDoor.x;
	bathroomDoorY = bathroomDoor.y;

	bathroomBorder3 = createSprite(width/7.15, height/1.65, width*0.031, 3);
	bathroomBorder3.shapeColor = "black";

	bathroomFloor = createSprite(width/3.85, height/1.385, width/3.75, height/4.42);
	bathroomFloor.visible = false;

	tub = createSprite(width/2.75,height/1.39);
	tub.addImage(tubImg);
	tub.scale = 0.54;

	pot = createSprite(width/3.9,height/1.29);
	pot.addImage(potImg);
	pot.scale = 0.445;

	sink = createSprite(width/6,height/1.26);
	sink.addImage(sinkImg);
	sink.scale = 0.63;

	//car
	car = createSprite(width/1.38, height/4.2, 50,50);
	car.addImage(carImg);
	car.scale = width/6500;

	//nanny
	nanny = createSprite(width/1.2, height/2, 20, 20);
	nanny.addAnimation("standing",nannyStanding);
	nanny.addAnimation("walking",nannyWalking);
	nanny.scale = 0.22;
	nanny.setCollider("rectangle",0,0,width/8, height/4);

	clean = createSprite(nanny.x, nanny.y);
	clean.addImage(cleaningImg);
	clean.scale = 0.5;
	clean.visible = false;

	Engine.run(engine);

	countDown = setInterval(()=>{
		if(gameState === PLAY || gameState === CLEANING){
			sec--;
		}
		if(sec<=0){
			clearInterval(countDown);
		}
	}, 1000);
}


function draw() {
	rectMode(CENTER);
	background(grassImg);

	// resetting nanny
	nanny.velocityX = 0;
	nanny.velocityY = 0;
	nanny.changeAnimation("standing",nannyStanding);

	if(gameState === START){
		fill("black");
		stroke("red");
		textSize(width*height/10000);
		text("NANNY MANIA!", width/6, height/4);
		textSize(width*height/20000);
		text("Press 'Space' to Start!", width/4, height/2);

		if(keyDown("space")){
			gameState = PLAY;
		}
	}

	if(gameState === PLAY){
		// flooring
		image(hallFloorImg, width/2.55, height/2.02, width/2.59, height/2.95);

		push();
		tint(139,69,19, hallFloorTint);
		image(hallFloorImg, width/2.55, height/2.02, width/2.59, height/2.95);
		pop();

		image(kitchenFloorImg, width/2.55, height/6, width/3.65, height/3.05);
		image(bathroomFloorImg, width/8, height/1.647, width/3.75, height/4.42);
		
		push();
		tint(139,69,19, bathroomFloorTint);
		image(bathroomFloorImg, width/8, height/1.647, width/3.75, height/4.42);
		pop();

		image(bedroomFloorImg, width/7.96, height/6., width/3.75, height/2.28);

		//couch
		image(couchImg, width/1.52, height/1.59, width/8, height/4.7);

		//carpets
		image(bedroomCarpet, width/3.15, height/3.2, width/23, height/11);
		image(bedroomCarpet, width/6.4, height/3.2, width/23, height/11);
		image(bathroomCarpetImg, width/3.6, height/1.7, width/17, height/3.3);


		//opening kitchen door
		if(nanny.isTouching(invisibleKitchenDoor)){
			kitchenDoor.rotation = 90;
			kitchenDoor.x = kitchenDoorX+kitchenDoor.width/2;
			kitchenDoor.y = kitchenDoorY-kitchenDoor.width/2;

		}
		else{
			kitchenDoor.rotation = 0;
			kitchenDoor.x = kitchenDoorX;
			kitchenDoor.y = kitchenDoorY;
		}

		//opening hall door
		if(nanny.isTouching(invisibleHallDoor)){
			hallDoor.rotation = 90;
			hallDoor.x = hallDoorX-hallDoor.height/2;
			hallDoor.y = hallDoorY-hallDoor.height/2+1;

		}
		else{
			hallDoor.rotation = 0;
			hallDoor.x = hallDoorX;
			hallDoor.y = hallDoorY;
		}

		// opening bedroom door
		if(nanny.isTouching(invisibleBedroomDoor)){
			bedroomDoor.rotation = 90;
			bedroomDoor.x = bedroomDoorX-bedroomDoor.height/2;
			bedroomDoor.y = bedroomDoorY-bedroomDoor.height/2+1;

		}
		else{
			bedroomDoor.rotation = 0;
			bedroomDoor.x = bedroomDoorX;
			bedroomDoor.y = bedroomDoorY;
		}

		// opening bathroom door
		if(nanny.isTouching(invisibleBathroomDoor)){
			bathroomDoor.rotation = 90;
			bathroomDoor.x = bathroomDoorX-bathroomDoor.width/2;
			bathroomDoor.y = bathroomDoorY+bathroomDoor.width/2+1;

		}
		else{
			bathroomDoor.rotation = 0;
			bathroomDoor.x = bathroomDoorX;
			bathroomDoor.y = bathroomDoorY;
		}

		// nanny's movement
		if(keyDown(LEFT_ARROW)){
			nanny.changeAnimation("walking", nannyWalking);
			nanny.rotation = 0;
			nanny.velocityX = -3;
		}

		if(keyDown(RIGHT_ARROW)){
			nanny.changeAnimation("walking", nannyWalking);
			nanny.velocityX = 3;
			nanny.rotation = 180;

		}

		if(keyDown(UP_ARROW)){
			nanny.changeAnimation("walking", nannyWalking);
			nanny.velocityY = -5;
			nanny.rotation = 90;
		}

		if(keyDown(DOWN_ARROW)){
			nanny.changeAnimation("walking", nannyWalking);
			nanny.velocityY = 5;
			nanny.rotation = 270;

		}

		//nanny cleaning up
		if(nanny.isTouching(bed) && mousePressedOver(bed) && bedState === 0){
			score += 100;
			bed.addImage(cleanBedImg);
			bedState = 1;
			startFC = frameCount;
			gameState = CLEANING;
			waitFC = 60;
		}

		if(nanny.isTouching(dining) && mousePressedOver(dining) && diningState === 0){
			score+=100;
			dining.addImage(cleanDining);
			diningState = 1;
			startFC = frameCount;
			gameState = CLEANING;
			waitFC = 60;
		}

		if(nanny.isTouching(foodGarbage) && mousePressedOver(foodGarbage) && kitchenFloorState === 0){
			score+=150;
			foodGarbage.remove();
			kitchenFloorState = 1;
			startFC = frameCount;
			gameState = CLEANING;
			waitFC = 70;
		}

		if(nanny.isTouching(kitchenCounter)&& mousePressedOver(plate) && kitchenCounterState === 0){
			score+=200;
			kitchenCounterState = 1;
			startFC = frameCount;
			gameState = CLEANING;
			waitFC = 60;
		}

		if(nanny.isTouching(bathroomFloor) && mousePressedOver(bathroomFloor) && bathroomFloorState === 0){
			score+=200;
			bathroomFloorState = 1;
			bathroomFloorTint = 0;
			startFC = frameCount;
			gameState = CLEANING;
			waitFC = 70;
		}

		if(nanny.isTouching(hallFloor) && mousePressedOver(hallFloor) && hallFloorState === 0){
			score+=250;
			hallFloorState = 1;
			hallFloorTint = 0;
			startFC = frameCount;
			gameState = CLEANING;
			waitFC = 90;
		}

		if((hallFloorState === 1 && bathroomFloorState === 1 && kitchenCounterState === 1 
			&& kitchenFloorState === 1 && diningState === 1 && bedState === 1) || sec === 0){
			gameState = END;
		}

		nanny.collide(invisibleBed);
		nanny.collide(invisibleDining);
		nanny.collide(invisibleKitchenCounter1);
		nanny.collide(invisibleKitchenCounter2);
		nanny.collide(computerTable);
		nanny.collide(wardrobe);
		nanny.collide(car);
		nanny.collide(tub);
		nanny.collide(sink);
		nanny.collide(pot);
		collideWalls(nanny);
		drawSprites();

		//plates
		if(kitchenCounterState === 0){
			image(dirtyPlateImg2, width/1.56, height/2.32, width/54, height/23);
		}
		else if(kitchenCounterState === 1){
			image(cleanPlateImg, width/1.57, height/2.32, width/36, height/23);

		}

		push();
		textSize(width*height/45000);
		fill(0);
		stroke(0);
		strokeWeight(3);
		text("SCORE : "+ score, width/1.17, height/9);
		text("Time left : "+ sec, width/2.2, height/9);
		pop();
	}

	if(gameState === CLEANING){

		image(hallFloorImg, width/2.55, height/2.02, width/2.59, height/2.95);

		push();
		tint(139,69,19, hallFloorTint);
		image(hallFloorImg, width/2.55, height/2.02, width/2.59, height/2.95);
		pop();

		image(kitchenFloorImg, width/2.55, height/6, width/3.65, height/3.05);
		image(bathroomFloorImg, width/8, height/1.647, width/3.75, height/4.42);
		
		push();
		tint(139,69,19, bathroomFloorTint);
		image(bathroomFloorImg, width/8, height/1.647, width/3.75, height/4.42);
		pop();

		image(bedroomFloorImg, width/7.96, height/6., width/3.75, height/2.28);

		//couch
		image(couchImg, width/1.52, height/1.59, width/8, height/4.7);

		//carpets
		image(bedroomCarpet, width/3.15, height/3.2, width/23, height/11);
		image(bedroomCarpet, width/6.4, height/3.2, width/23, height/11);
		image(bathroomCarpetImg, width/3.6, height/1.7, width/17, height/3.3);


		clean.x = nanny.x;
		clean.y = nanny.y;
		clean.visible = true;

		if(frameCount - startFC >= waitFC){
			gameState = PLAY;
			clean.visible = false;
		}
		drawSprites();

		//plates
		if(kitchenCounterState === 0){
			image(dirtyPlateImg2, width/1.56, height/2.32, width/54, height/23);
		}
		else if(kitchenCounterState === 1){
			image(cleanPlateImg, width/1.57, height/2.32, width/36, height/23);
		}

		push();
		textSize(width*height/45000);
		fill(0);
		stroke(0);
		strokeWeight(3);
		text("SCORE : "+ score, width/1.17, height/9);
		text("Time left : "+ sec, width/2.17, height/9);
		pop();
	}

	if(gameState === END){
		if(score === 1000){
			fill("black");
			stroke("red");
			textSize(width*height/10000);
			text("You won!!!", width/3.5, height/2);
		}
		if(score < 1000){
			fill("black");
			stroke("red");
			textSize(width*height/10000);
			text("You lost!", width/3.3, height/2);
			textSize(width*height/20000);
			text("Better luck next time..", width/3.7, height/1.5);

		}	
	} 
}

function collideWalls(person){
	person.collide(houseBorder1);
	person.collide(houseBorder2);
	person.collide(houseBorder3);
	person.collide(houseBorder4);

	person.collide(hallBorder1);
	person.collide(hallBorder2);
	person.collide(hallBorder3);

	person.collide(bathroomBorder1);
	person.collide(bathroomBorder2);
	person.collide(bathroomBorder3);

	person.collide(kitchenBorder1);
	person.collide(kitchenBorder2);

	person.collide(bedroomBorder1);

}