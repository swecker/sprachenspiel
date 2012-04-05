
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

var heightMap = [
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,8,8,8,8,8,8,8,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,8,3,3,3,3,3,8,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,8,3,3,3,3,3,8,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,8,3,3,3,3,3,8,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,8,3,3,3,3,3,8,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,8,8,8,3,8,8,8,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,9,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,8,2,2,2,2,2,2,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,8,2,2,2,2,2,2,2,2,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,0,0,0,0,0,8,0,0,0,0,0,2,2,2,2,2,2,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,8,8,8,8,8,8,2,2],
    [2,2,2,2,2,2,0,1,1,1,1,8,1,1,1,1,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,8,8,8,2,2,2,2,8,2,2],
    [2,2,2,2,2,2,0,1,2,2,2,8,2,2,2,1,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,8,2,2,2,2,2,2,8,2,2],
    [2,2,2,2,2,2,0,1,2,3,3,7,3,3,2,1,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,8,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,0,1,2,3,4,6,4,3,2,1,0,2,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,8,2,2,2,2,2,2,8,2,2],
    [2,2,2,2,2,2,0,1,2,3,4,5,4,3,2,1,0,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,8,2,2,2,2,2,2,8,2,2],
    [2,2,2,2,2,2,0,1,2,3,4,4,4,3,2,1,0,2,2,2,2,2,2,2,2,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,8,2,2,2,8,8,8,8,2,2],
    [2,2,2,2,2,2,0,1,2,3,3,3,3,3,2,1,0,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,8,2,2,2,8,2,2,2,2,2],
    [2,2,2,2,2,2,0,1,2,2,2,2,2,2,2,1,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,8,2,2,2,8,2,2,2,2,2],
    [2,2,2,2,2,2,0,1,1,1,1,1,1,1,1,1,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,8,2,2,2,8,2,2,2,2,2],
    [2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,8,2,2,2,8,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,8,2,2,2,8,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,8,8,8,8,8,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
	];

var a = 1;  //Carl, What's this for?

//      Notable changes in layout:     //
//
//  map1 renamed to heightMap
//  xl and yl renamed to colCount and rowCount respectively
//  grid renamed to world
//  playerPosX and playerPosY are now in the player object as player.x and
//  player.y also add player.z
var world;
create_world = function() {
  var rowCount = heightMap.length;
  var colCount = heightMap[0].length;
   world = [];
  for( y=0; y<rowCount; y++ ) {
    world[y] = [];
    for( x=0; x<colCount; x++ ) {
      var type;
      // this right here:
      if( Math.round(Math.random()*2) == 1 ) { type = "grass" }
      else { type = "dirt" }
      // would become something like:
      // type: typeMap[y][x]
      world[y][x] = {
        type: type, 
        z: heightMap[rowCount-1-y][x],//the rowCount-y is so that the map is reflipped right side up
        x: x,
        y: y }
    }
  }
}

//var viewportDiag = 3;
var viewportLength = 9;  //should be even number for character to be in middle square
var viewportHeight = 15;

var player = {
  x: 10,
  y: 10,
  z: 2
};

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
  //if the new world[y][x] for the new playerPosX and playerPosY is different from the previous by more than 5, then revert back
 	x = (viewport[6][4][0]+player.x)%50; 
 	y = (viewport[6][4][1]+preY)%50; 
 	a = (viewport[6][4][0]+player.x)%50;
 	b = (viewport[6][4][1]+postY)%50; 
 	if(world[y][x].z - world[b][a].z < -5 ){
		return preY;
	} else {
 		return postY;
	}
}	

wallCheckHorizontal = function(preX,postX){
  //if the new world[y][x] for the new playerPosX and playerPosY is different from the previous by more than 5, then revert back
 	x = (viewport[6][4][0]+preX)%50; 
 	y = (viewport[6][4][1]+player.y)%50; 
 	a = (viewport[6][4][0]+postX)%50;
 	b = (viewport[6][4][1]+player.y)%50; 
 	if(world[y][x].z - world[b][a].z < -5 ){
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
			x = (viewport[a][b][0]+player.x)%50;
			y = (viewport[a][b][1]+player.y)%50;
			playerView[a][b] = world[y][x];	
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
      type = playerView[y][x].type
			tile = $('<div class="tile '+type+' X'+x+'"></div>').css("top",y*16-zValue*8).css("left",x*64);
			if(playerView[y][x].xCoord == 40 && playerView[y][x].yCoord == 40){
				npc = $('<div id="npc" style="left:'+x*64+'px"></div>').css("top",y*16-zValue*8-70);
				row.append(npc);
				gnome_dialog =  $('<div id="gnome_dialog" style="left:'+(playerView[0].length*64+120)+'px"></div>').css("top",-109); 
				row.append(gnome_dialog);
			}
		 	if(playerView[y][x].xCoord == 20 && playerView[y][x].yCoord == 20){
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
			player.y = wallCheckVertical(player.y,player.y+1);
			drawTiles();
}
movePlayerDown = function() {
			player.y = wallCheckVertical(player.y,player.y-1);
			if (player.y<0){player.y=99} 
			drawTiles();
}
movePlayerLeft = function() {
			player.x = wallCheckHorizontal(player.x,player.x-1);
			if (player.x<0){player.x=99} 
			drawTiles();
}
movePlayerRight = function() {
			player.x = wallCheckHorizontal(player.x,player.x+1);
			drawTiles();
}

$(document).bind("keydown", "w", function(){ movePlayerUp(); });
$(document).bind("keydown", "s", function(){ movePlayerDown(); });
$(document).bind("keydown", "d", function(){ movePlayerRight(); });
$(document).bind("keydown", "a", function(){ movePlayerLeft(); });
$(document).ready(function() {
    create_world();
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
