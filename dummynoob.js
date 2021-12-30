// Arrays of facedown tiles--> the whole deck

redTiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
orangeTiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
blueTiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
blackTiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
wildTiles = [":)", ":)"];


renderTilePool=()=>{
	tilePool = document.querySelector('#tile-pool');
tilePool.innerHTML = redTiles.map(function (num) {
	return '<div class="facedown-tiles red" onclick="drawRed('+num+')"></div>';
}).join('') + orangeTiles.map(function (num) {
	return '<div class="facedown-tiles orange" onclick="drawOrange('+num+')"></div>';
}).join('') + blueTiles.map(function (num) {
	return '<div class="facedown-tiles blue" onclick="drawBlue('+num+')"></div>';
}).join('') + blackTiles.map(function (num) {
	return '<div class="facedown-tiles black" onclick="drawBlack('+num+')"></div>';
}).join('') + wildTiles.map(function () {
	return '<div class="facedown-tiles wilds" onclick="drawWild()"></div>';
}).join('');
}




playerHand= [];
// player hand array
renderPlayHand = (color,num)=>{
	
let topRow= [];
let bottomRow = [];
playerTopRow = document.querySelector('#playerboard-top-row');
playerBottomRow = document.querySelector('#playerboard-bottom-row');
for (let i = 0; i< Math.ceil(playerHand.length/2); i++) {
	topRow.push(playerHand[i]);
};
for (let j= Math.ceil(playerHand.length/2); j < playerHand.length-1; j++){
	bottomRow.push(playerHand[j]);
};
playerTopRow.innerHTML = topRow.map(function (item) {
	return '<div class="players-tiles" id='+item+' draggable="true" ondragstart="onDragStart(event)"><div class="tile-number item '+color+'">'+item+'</div><div class="tile-circle"></div></div>';
}).join('');
playerBottomRow.innerHTML = bottomRow.map(function (item) {
	return '<div class="players-tiles" id='+item+' draggable="true" ondragstart="onDragStart(event)"><div class="tile-number item '+color+'">'+item+'</div><div class="tile-circle"></div></div>';
}).join('') + '<div class="players-tiles '+color+'">'+num+'</div>' ;
}


renderTilePool();


drawRed = (num) => {
	playerBottomRow = document.querySelector('#playerboard-bottom-row');
	let redNum = redTiles.splice(num+1, 1)[0];
	playerHand.push("red" + redNum);
	renderTilePool();
	playerBottomRow.innerHTML =  playerBottomRow.innerHTML + '<div class="players-tiles" id="red'+redNum+'" draggable="true" ondragstart="onDragStart(event)"><div class="tile-number item red">'+redNum+'</div><div class="tile-circle"></div></div>';
	}
drawOrange = (num)=>{
	playerBottomRow = document.querySelector('#playerboard-bottom-row');
	let orangeNum = orangeTiles.splice(num+1, 1)[0];
	playerHand.push("orange" + orangeNum);
	renderTilePool();
	playerBottomRow.innerHTML =  playerBottomRow.innerHTML + '<div class="players-tiles" id="orange'+orangeNum+'" draggable="true" ondragstart="onDragStart(event)"><div class="tile-number item orange">'+orangeNum+'</div><div class="tile-circle"></div></div>';

}
drawBlue=(num)=>{
	playerBottomRow = document.querySelector('#playerboard-bottom-row');
	let blueNum = blueTiles.splice(num+1, 1)[0];
	playerHand.push("blue" + blueNum);
	renderTilePool();
	playerBottomRow.innerHTML =  playerBottomRow.innerHTML + '<div class="players-tiles" id="blue'+blueNum+'" draggable="true" ondragstart="onDragStart(event)"><div class="tile-number item blue">'+blueNum+'</div><div class="tile-circle"></div></div>';

}
drawBlack=(num)=>{
	playerBottomRow = document.querySelector('#playerboard-bottom-row');
	let blackNum = blackTiles.splice(num+1, 1)[0];
	playerHand.push("black" + blackNum);
	renderTilePool();
	playerBottomRow.innerHTML =  playerBottomRow.innerHTML + '<div class="players-tiles" id="black'+blackNum+'" draggable="true" ondragstart="onDragStart(event)"><div class="tile-number item black">'+blackNum+'</div><div class="tile-circle"></div></div>';

}
drawWild=(num)=>{
	playerBottomRow = document.querySelector('#playerboard-bottom-row');
	// let color = "red" || "black"
	let wilds = wildTiles.splice(num+1, 1)[0];
	playerHand.push(wilds);
	renderTilePool();
	playerBottomRow.innerHTML =  playerBottomRow.innerHTML + '<div class="game-area-tiles" id="wild" draggable="true" ondragstart="onDragStart(event)"><div class="wild"><span class="eyes"></span><span class="eyes"></span><span class="mouth"></span></div><div class="tile-circle"></div></div>';

}
	

function onDragStart(event) {
	event
	  .dataTransfer
	  .setData(
		  'text/plain', 
		  event.target.id);
  
	// event
	//   .currentTarget
	//   .style
	//   .backgroundColor = 'yellow';
  }
  function onDragOver(event) {
	event.preventDefault();
  }
  function onDrop(event) {
	let id = event
    .dataTransfer
    .getData(
		'text'
		);
	let draggableElement = document.getElementById(id);
	let dropzone = event.target;
	draggableElement.classList = "game-area-tiles";
	dropzone.classList = ""
	dropzone.appendChild(draggableElement);
	event
    .dataTransfer
    .clearData();
	playerHand.splice(draggableElement.indexOf, 1);	
	console.log(playerHand);

  }
  function onDropB(event) {
	let id = event
    .dataTransfer
    .getData(
		'text'
		);
	let draggableElement = document.getElementById(id);
	let dropzone = event.target;
	draggableElement.classList = "players-tiles";
	dropzone.appendChild(draggableElement);
	// playerHand = playerTopRow + playerBottomRow;
	event
    .dataTransfer
    .clearData();
	// playerHand.splice(draggableElement.indexOf, 0);
	console.log(playerHand);
  }






