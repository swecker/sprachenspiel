var yl = 100;
var xl = 100;

/*  Grid:
 * [[obj, obj, obj, etc.],
    [obj, obj, obj, etc.],
    [obj, obj, obj, etc.],
    [obj, obj, obj, etc.],
    [obj, obj, obj, etc.],
		etc.]

		ViewportMap:
	 [[[0,0],[0,1],[0,2]],
	  [[1,0],[1,1]],
	  [[2,0],[2,1],[2,2]],
	  [[3,0],[3,1]],
	  [[4,0],[4,1],[4,2]]]

		PlayerView:
		Grid data in viewport format relative to player position:
  [[obj, obj, obj],
	 [obj, obj],
   [obj, obj, obj],
	 [obj, obj],
   [obj, obj, obj]]

	 initializing that ^
	 make canvas draw separate function
	 add nav buttons to html
	 nov buttons onclick changes player pos, and refreshes the canvas draw
	 */

var map1 = [];
map1 = [
  [0,1,0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1], 
  [0,9,0,0,0,1,2,3,4,5,6,7,8,8,8,8,8,7,6,5,4,3,2,1,0,1,1,4,5,6,7,0,1,0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1], 
  [1,0,0,1,2,3,4,5,6,7,8,8,8,8,8,8,8,8,7,6,5,4,3,2,1,1,1,1,1,2,3,4,0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1,0], 
  [1,0,0,1,2,3,4,5,6,7,8,8,8,8,8,8,8,8,7,6,5,4,3,2,1,1,1,1,1,2,3,4,0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1,0], 
  [0,1,0,0,0,1,2,3,4,5,6,7,8,8,8,8,8,7,6,5,4,3,2,1,0,1,1,4,5,6,7,0,1,0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1],
	[0,1,0,0,0,1,2,3,4,5,6,7,8,8,8,8,8,7,6,5,4,3,2,1,0,1,1,4,5,6,7,0,1,0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1],
	[0,1,0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1],
	[0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1,0,0],
	[0,1,0,0,0,1,2,3,4,5,6,7,8,8,8,8,8,7,6,5,4,3,2,1,0,1,1,4,5,6,7,0,1,0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1],
	[0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1,0,0,0],
	[0,1,0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1], 
	[0,9,0,0,0,1,2,3,4,5,6,7,8,8,8,8,8,7,6,5,4,3,2,1,0,1,1,4,5,6,7,0,1,0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1], 
	[1,0,0,1,2,3,4,5,6,7,8,8,8,8,8,8,8,8,7,6,5,4,3,2,1,1,1,1,1,2,3,4,0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1,0], 
	[1,0,0,1,2,3,4,5,6,7,8,8,8,8,8,8,8,8,7,6,5,4,3,2,1,1,1,1,1,2,3,4,0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1,0], 
	[0,1,0,0,0,1,2,3,4,5,6,7,8,8,8,8,8,7,6,5,4,3,2,1,0,1,1,4,5,6,7,0,1,0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1],
	[0,1,0,0,0,1,2,3,4,5,6,7,8,8,8,8,8,7,6,5,4,3,2,1,0,1,1,4,5,6,7,0,1,0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1],
	[0,1,0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1],
	[0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1,0,0],
	[0,1,0,0,0,1,2,3,4,5,6,7,8,8,8,8,8,7,6,5,4,3,2,1,0,1,1,4,5,6,7,0,1,0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1],
	[0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1,2,3,4,5,6,7,8,8,8,7,6,5,4,3,2,1,1,1,2,3,4,5,6,7,0,1,0,0,0,0,1,0,0,0]
	];
var a = 1;

var grid = [];
for( y=0; y<yl; y++ ) {
	grid[y] = [];
	for( x=0; x<xl; x++ ) {
		grid[y][x] = { type : "ground", z:map1[y%10][x], xCoord:x, yCoord:y }
	}
}

//var viewportDiag = 3;
var viewportLength = 9;  //should be even number for character to be in middle square
var viewportHeight = 15;

playerPosX = 50;
playerPosY = 50;

//var startX = playerPosX - viewportDiag;
//var startY = playerPosY - viewportDiag;

var evenRow = true;
var viewport = [];
prevX = prevY = 0;

for( a = 0; a < viewportHeight; a++ ) {
	viewport[a] = [];
	length = viewportLength;
	if( !evenRow ) { length--; }
	x = prevX;
	y = prevY;
	for( b = 0; b < length; b++ ) {
		viewport[a][b] = [x,y];
		x++;
		y++;
	}
	if( evenRow ) { prevX++; }
	else { prevY--; }
	evenRow = !evenRow;
}

wallCheckVertical = function(preY,postY){
  //if the new grid[y][x] for the new playerPosX and playerPosY is different from the previous by more than 5, then revert back
 	x = (viewport[6][4][0]+playerPosX)%100; 
 	y = (viewport[6][4][1]+preY)%100; 
 	a = (viewport[6][4][0]+playerPosX)%100;
 	b = (viewport[6][4][1]+postY)%100; 
 	if(grid[y][x].z - grid[b][a].z < -5 ){
		return preY;
	} else {
 		return postY;
	}
}	

wallCheckHorizontal = function(preX,postX){
  //if the new grid[y][x] for the new playerPosX and playerPosY is different from the previous by more than 5, then revert back
 	x = (viewport[6][4][0]+preX)%100; 
 	y = (viewport[6][4][1]+playerPosY)%100; 
 	a = (viewport[6][4][0]+postX)%100;
 	b = (viewport[6][4][1]+playerPosY)%100; 
 	if(grid[y][x].z - grid[b][a].z < -5 ){
		return preX;
	} else {
 		return postX;
	}
}	
 

var playerView = [];
	
updatePlayerView = function() {
	length = viewport.length;
	for( a = 0; a < length; a++ ) {
		playerView[a] = [];
		lengthb = viewport[a].length;  
		for( b = 0; b < lengthb; b++ ) {
			x = (viewport[a][b][0]+playerPosX)%100;
			y = (viewport[a][b][1]+playerPosY)%100;
			playerView[a][b] = grid[y][x];	
		}
	}
}

var ZModifier = 0;

updateZModifier = function() {
	ZModifier = playerView[6][4].z-5;
}

drawTiles = function() {
	updatePlayerView();
	updateZModifier();
	$("#canvas").html("");
	evenRow = true;
	for( y=0; y<playerView.length; y++ ) {
		//var left = $('#upButton').attr('background-color');
		//alert(left);
		var row = $('<div id="y'+y+'"></div>').addClass("row");
		if( !evenRow ){ row.addClass("odd") }
		for( x=0; x<playerView[y].length; x++ ) {
			zValue = playerView[y][x].z - ZModifier;
			//xCoordValue = playerView[y][x].xCoord;
			//yCoordValue = playerView[y][x].yCoord;
			//type = playerView[y][x].type;
			//tile = $('<div class="tile X'+x+'">'+xCoordValue+' '+yCoordValue+'</div>').css("top",(y*16)+zValue).css("left",x*64);
			tile = $('<div class="tile X'+x+'"></div>').css("top",y*16-zValue*8).css("left",x*64);
			if(playerView[y][x].xCoord == 50 && playerView[y][x].yCoord == 50){
				npc = $('<div id="npc" style="left:'+x*64+'px"></div>').css("top",y*16-zValue*8-70);
				row.append(npc);
				gnome_dialog =  $('<div id="gnome_dialog" style="left:'+(playerView[0].length*64+120)+'px"></div>').css("top",-109); 
				row.append(gnome_dialog);
			}
		 	if(playerView[y][x].xCoord == 80 && playerView[y][x].yCoord == 80){
				pirate = $('<div id="pirate" style="left:'+x*64+'px"></div>').css("top",y*16-zValue*8-109);
				row.append(pirate);
			}   
			if(x==5 && y==8){
  			character = $('<div id="character" style="left:'+((viewport[0].length/2)*64-.5*43)+'px"></div>)');  
				$('#canvas').append(character);
			}
			row.append(tile);
		}
	  $('#canvas').append(row);
		evenRow = !evenRow;
	}
  //character = $('<div id="character" style="left:'+((viewport[0].length/2)*64-.5*43)+'px"></div>)');  
					//.css("top",(playerView[6][4].z)*-8); 48 is the image width, can we do #Character.width?
	//$('#canvas').append(character);
}

movePlayerUp = function() {
			playerPosY = wallCheckVertical(playerPosY,playerPosY+1);
			drawTiles();
}
movePlayerDown = function() {
			playerPosY = wallCheckVertical(playerPosY,playerPosY-1);
			if (playerPosY<0){playerPosY=99} 
			drawTiles();
}
movePlayerLeft = function() {
			playerPosX = wallCheckHorizontal(playerPosX,playerPosX-1);
			if (playerPosX<0){playerPosX=99} 
			drawTiles();
}
movePlayerRight = function() {
			playerPosX = wallCheckHorizontal(playerPosX,playerPosX+1);
			drawTiles();
}

$(document).bind("keydown", "w", function(){ movePlayerUp(); });
$(document).bind("keydown", "s", function(){ movePlayerDown(); });
$(document).bind("keydown", "d", function(){ movePlayerRight(); });
$(document).bind("keydown", "a", function(){ movePlayerLeft(); });
$(document).ready(function() {
		drawTiles();
		$("#upButton").click(function(){
      movePlayerUp();
		});
		$("#downButton").click(function(){
      movePlayerDown();
		});
		$("#rightButton").click(function(){
      movePlayerRight();
		});
		$("#leftButton").click(function(){
      movePlayerLeft();
		});
});
/*
var dialog = [{"Jenny":"Oh good. you're awake!","1-":"Where am I?","  Jenny: "In my house."
        1: "Goodbye."
    2: "Who are you?"
      Jenny: "You can call me Jenny.  Don't worry about anything, you're safe now."
        1: "Goodbye."
*/
