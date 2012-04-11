
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
  [2,2,2,2,2,2,2,2,2,4,2,4,2,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,4,6,5,4,3,2,2],
  [2,2,2,2,2,2,2,2,2,4,2,4,2,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
  [2,2,2,2,2,2,2,2,2,4,2,4,2,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
  [2,2,2,2,2,2,2,2,2,4,2,4,2,4,2,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
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
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,6,5,4,3,2,2,2]
];


var player;
var gnome;
var pirate;
initialize_characters = function() {
  player = {
    x: 0,
    y: 0,
    h: 2,
		oldH: 2,
    z:0,
    skills:{
      jump:4
    }
  };

  gnome = {
    x: Math.floor(Math.random()*colCount),
    y: Math.floor(Math.random()*rowCount),
    h: 9,
		oldH: 9,
    z:0,
    skills:{
      jump:2
    }
  };

  pirate = {
    x: Math.floor(Math.random()*colCount),
    y: Math.floor(Math.random()*rowCount),
    h: 9,
		oldH: 9,
    z:0,
    skills:{
      jump:6
    }
  };
}

//      Notable changes in layout:     //
//
//  map1 renamed to heightMap
//  xl and yl renamed to colCount and rowCount respectively
//  grid renamed to world
//  playerPosX and playerPosY are now in the player object as player.x and
//  player.y also add player.h


var world;
var rowCount;
var colCount;
create_world = function() {
  rowCount = heightMap.length;
  colCount = heightMap[0].length;
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
				z: 0,
        h: heightMap[rowCount-1-y][x],//the rowCount-y is so that the map is reflipped right side up
        x: x,
        y: y }
    }
  }
}


var viewport = [];
var viewportSize = 50; //should be even number for character to be in middle square
initialize_viewport = function() {
  xOffset = viewportSize - 1; 
  viewportWidth = viewportSize; 
  viewportHeight = viewportSize*2; 
  
  var evenRow = true;
  prevX = prevY = 0;

  for( a = 0; a < viewportHeight; a++ ) {
    viewport[a] = [];
    vlength = viewportWidth;
    if( !evenRow ) { vlength--; }
    x = prevX;
    y = prevY;
    for( b = 0; b < vlength; b++ ) {
      viewport[a][b] = [x-xOffset,y];
      x++;
      y++;
    }
    if( evenRow ) { prevX++; }
    else { prevY--; }
    evenRow = !evenRow;
  }
}

wrapHeight = function(y) {
	var result;
  if (y >= rowCount){
     result = y - rowCount;
  } else if (y < 0) {
    result = rowCount + y;
  } else {
    result = y;
  }
  return result;
}
wrapWidth = function(x) {
	var result;
  if (x >= colCount){
     result = x - colCount;
  } else if (x < 0) {
    result = colCount + x;
  } else {
    result = x;
  }
  return result;
}

passable = function(x, y, character){
  var result;
 	if( world[y][x].h - character.h < character.skills.jump ){
    result = true;
	} else {
    result = false;
	}
  return result;
}	

	
var playerView = [];
var visibleTiles = [];
updatePlayerView = function() {
	vplength = viewport.length;
	for( a = 0; a < vplength; a++ ) {
		playerView[a] = [];
		lengthb = viewport[a].length;  
		for( b = 0; b < lengthb; b++ ) {
			x = wrapWidth(viewport[a][b][0]+player.x);
			y = wrapHeight(viewport[a][b][1]+player.y);
      world[y][x].z = a;
			playerView[a][b] = world[y][x];
      visibleTiles << [x,y];
      if(world[y][x] == undefined) {
        alert("tile at: "+x+", "+y+" doesn't exist.");
      }
		}
	}
}

drawTiles = function() {
  start = new Date();
	updatePlayerView();
	$("#canvas").html("");
	evenRow = true;
	for( y=0; y<playerView.length; y++ ) {
		var row = $('<div id="y'+y+'"></div>').addClass("row");
		if( !evenRow ){ row.addClass("odd") }
		for( x=0; x<playerView[y].length; x++ ) {
			h = playerView[y][x].h - player.h;
      type = playerView[y][x].type;
      cx = playerView[y][x].x;
      cy = playerView[y][x].y;
      z = playerView[y][x].z;
			tile = $('<div class="tile '+type+' X'+x+'">'+cy+'</div>').css("top",y*16-h*16).css("left",x*64);//.css("z-index",z);
			row.append(tile);
			if(playerView[y][x].x== gnome.x && playerView[y][x].y == gnome.y){
				npc = $('<div id="npc" style="left:'+x*64+'px"></div>').css("top",y*16-h*16-70);
				row.append(npc);
				//gnome_dialog =  $('<div id="gnome_dialog" style="left:'+(playerView[0].length*64+120)+'px"></div>').css("top",-109); 
				//row.append(gnome_dialog);
			}
		 	if(playerView[y][x].x== pirate.x && playerView[y][x].y== pirate.y){
				pirate = $('<div id="pirate" style="left:'+x*64+'px"></div>').css("top",y*16-h*16-109);
				row.append(pirate);
			}   
		}
	  $('#canvas').append(row);
		$('#canvas').css("top",-585).css("left",-1250);
		//$('#canvas').css("top",-playerView.length*16/2).css("left",-playerView[0].length*64/2);
		evenRow = !evenRow;
	}
	$('#dialogBox').append(playerView.length*16/2 + ', ' + playerView[0].length*64/2);
	//$('#dialogBox').append(playerView.length + ', ' + playerView[0].length);
	alert($('#character').css('height'));
  end = new Date();
  //alert(end-start);
}

moveCharacterUp = function(character) {
  destY = wrapHeight(character.y + 1)
  if( passable(character.x, destY, character) ) {
    character.y = destY;
    character.oldH = character.h;
    character.h = world[character.y][character.x].h;
    character.z = world[character.y][character.x].z;
		if (character == player){
			shiftScreenUp();
		} else {
			redraw(Character);
		}
  }
  //drawTiles();
}
moveCharacterDown = function(character) {
  destY = wrapHeight(character.y - 1)
  if( passable(character.x, destY, character) ) {
    character.y = destY;
    character.oldH = character.h;
    character.h = world[character.y][character.x].h;
    character.z = world[character.y][character.x].z;
		if (character == player){
			shiftScreenDown();
		} else {
			redraw(Character);
		}
  }
  //drawTiles();
}
moveCharacterRight = function(character) {
  destX = wrapWidth(character.x + 1)
  if( passable(destX, character.y, character) ) {
    character.x = destX;
    character.oldH = character.h;
    character.h = world[character.y][character.x].h;
    character.z = world[character.y][character.x].z;
		if (character == player){
			shiftScreenRight();
		} else {
			redraw(Character);
		}
  }
  //drawTiles();
}
moveCharacterLeft = function(character) {
  destX = wrapWidth(character.x - 1)
  if( passable(destX, character.y, character) ) {
    character.x = destX;
    character.oldH = character.h;
    character.h = world[character.y][character.x].h;
    character.z = world[character.y][character.x].z;
    $("#dialogBox").append(player.oldH + ', '+(world[character.y][character.x].h)+': ');
		if (character == player){
			shiftScreenLeft();
		} else {
			redraw(character);
		}
  }
  //drawTiles();
}

redraw = function(character){  //redraw the tiles? It seems like to get the z-indexes right we have to add z-indexes for everything... ):


}

shiftScreenLeft = function() {
  topShift = 16 - (player.oldH - player.h)*16 + parseInt($('#canvas').css('top'));
  //alert(player.oldZ);
  $("#canvas").animate({'top':topShift+'px','left':'+=32'});
  $("#character").animate({'z-index':player.z});
  $("#dialogBox").append(topShift+'-> ');
}

shiftScreenRight = function() {
  topShift = -16 - (player.oldH - player.h)*16 + parseInt($('#canvas').css('top'));
  //alert(player.oldZ);
  $("#canvas").animate({'top':topShift+'px','left':'-=32'});
  $("#character").animate({'z-index':player.z});
  $("#dialogBox").append(topShift+'-> ');
}

shiftScreenDown = function() {
  topShift = -16 - (player.oldH - player.h)*16 + parseInt($('#canvas').css('top'));
  //alert(player.oldZ);
  $("#canvas").animate({'top':topShift+'px','left':'+=32'});
  $("#character").animate({'z-index':player.z});
  $("#dialogBox").append(topShift+'-> ');
}

shiftScreenUp = function() {
  topShift = 16 - (player.oldH - player.h)*16 + parseInt($('#canvas').css('top'));
  //alert(player.oldZ);
  $("#canvas").animate({'top':topShift+'px','left':'-=32'});
  $("#character").animate({'z-index':player.z});
  $("#dialogBox").append(topShift+'-> ');
}

$(document).bind("keydown", "w", function(){ moveCharacterUp(player); });
$(document).bind("keydown", "s", function(){ moveCharacterDown(player); });
$(document).bind("keydown", "d", function(){ moveCharacterRight(player); });
$(document).bind("keydown", "a", function(){ moveCharacterLeft(player); });
$(document).bind("keydown", "i", function(){ moveCharacterUp(gnome); });
$(document).bind("keydown", "k", function(){ moveCharacterDown(gnome); });
$(document).bind("keydown", "l", function(){ moveCharacterRight(gnome); });
$(document).bind("keydown", "j", function(){ moveCharacterLeft(gnome); });
$(document).ready(function() {
    create_world();
    initialize_characters();
    initialize_viewport();
		drawTiles();
	  character = $('<div id="character" style="left:326px; top:151px"></div>');
    $("#screen").append(character);
});
/*
var dialog = [{"Jenny":"Oh good. you're awake!","1-":"Where am I?","  Jenny: "In my house."
        1: "Goodbye."
    2: "Who are you?"
      Jenny: "You can call me Jenny.  Don't worry about anything, you're safe now."
        1: "Goodbye."
*/
