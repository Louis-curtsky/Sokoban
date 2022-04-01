"use strict";

// Initailization

var divGameArea = document.createElement("div");
var contentFromMap = tileMap01.mapGrid;
var innerArea = document.getElementById("myGame");
var gameStart = false;
var gameOver = true;

const str = "";
const player = {
  posY: 11,
  posX: 11
}

function msgInfo(str)
{
  document.getElementById("msgArea").innerHTML = str;
}

function score()
{}

startGame();

//Appending Div 19x16
function startGame()
{
  if (gameStart == false)
  {
    msgInfo("Start of Game!!!");
  }
  else
  {
  }
  for (let colInside = 0; colInside<16; colInside++)
  {
    for (let rowInside = 0; rowInside<19; rowInside++)
    {   
      
      divGameArea = document.createElement("div");
      innerArea.appendChild(divGameArea);
      divGameArea.id = "Y"+colInside+"X"+rowInside;
      divGameArea.className = contentFromMap[colInside][rowInside][0];
    }    
  }
  gameOver = false;
}
// document.addEventListener("keydown", ()=>function keyChks() {});


var yNextPos = 0;
var xNextPos = 0;
var ChangePos = 0;
var userDirection = "";
var yNowPos = 0;
var xNowPos = 0;

var IsArrowKey = false;

document.getElementById("sokoBanBody").addEventListener("keydown", function(event)
{
  event.preventDefault();
  switch (event.key){
    case "ArrowLeft":
    case "ArrowDown":    
    case "ArrowUp":    
    case "ArrowRight":
      IsArrowKey = true;   
      break;
    default:
      document.getElementById("msgArea").innerHTML="No Arrow Keys detected!!!";
      break;
  }
})

// BEGINNING OF PLAY when user hit arrow keys

document.getElementById("sokoBanBody").addEventListener("keyup", function(event) 
{
  if (IsArrowKey)
  {
    event.preventDefault();
    if (gameStart == false)
    {
      yNextPos = player.posX;
      xNextPos = player.posY;
      gameStart = true;
      gameOver = false;
    }
    else
    {
      var currentPos = document.getElementById("Y"+player.posY+"X"+player.posX);
    }
//  console.log("Now:"+xNowPos+yNowPos+"Next:"+xNextPos+yNextPos);  
  const key = event.key;
  // Initail Next Position = current position
    xNowPos=player.posX;
    yNowPos=player.posY;
    let KDir = "";
    console.log("Y"+yNowPos+"X"+xNowPos);
  switch (event.key) 
  {
    case "ArrowLeft":
      KDir = "L";
      ChangePos=checkCanMove(yNowPos, (xNowPos-1), "L");
      break;
      case "ArrowRight":
      KDir = "R";
      ChangePos=checkCanMove(yNowPos, (xNowPos+1), "R");
    break;
    case "ArrowUp":
      KDir = "U";
      ChangePos=checkCanMove((yNowPos-1), xNowPos, "U");
    break;
    case "ArrowDown":
      KDir="D";
      ChangePos=checkCanMove((yNowPos+1),xNowPos, "D");
      break;
      default:
      break;
  }
  movePlayers(ChangePos, KDir);
}
else
{
  msgInfo("No Arrow Detected!!!");
} // End of IsArrowKey
}//END of Funcation
);

function movePlayers(ChangePos, KDir)
{
  let nextNextY = 0;
  let nextNextX = 0;
  if (ChangePos==-1 || ChangePos ==1)
  {
    if (KDir == "U" || KDir == "D")
    {
      player.posY=player.posY+ChangePos;
    } 
    else // Left or Right
    {
      player.posX=player.posX+ChangePos;
    }
//    console.log("ChPos"+ChangePos);
    var  currentPos = document.getElementById("Y"+yNowPos+"X"+xNowPos);
    currentPos.className=" ";
    var nextPos=document.getElementById("Y"+player.posY+"X"+player.posX);
    //   Move Player
    nextPos.className="P";
  } else
  if (ChangePos==2 || ChangePos == -2)
  {
    if (KDir == "D")
    {
      nextNextY = player.posY+ChangePos;
      player.posY=player.posY+1
      nextNextX = player.posX;
    } 
    else if (KDir == "R")// Right
    {
      nextNextX = player.posX+ChangePos;
      player.posX=player.posX+1
      nextNextY = player.posY;
    }
    else if (KDir == "U")
    {
      nextNextY = player.posY+ChangePos;   
      player.posY=player.posY-1
      nextNextX = player.posX;   
    }
    else if (KDir == "L")// Left with 2 items
    {    
      nextNextX = player.posX+ChangePos;
      player.posX=player.posX-1;
      nextNextY = player.posY;
    } else
    {
      msgInfo("Error in Logic!!!");
    }
    var currentPos = document.getElementById("Y"+yNowPos+"X"+xNowPos);
    var nextPos=document.getElementById("Y"+player.posY+"X"+player.posX);
    var nextNextPos=document.getElementById("Y"+nextNextY+"X"+nextNextX);
    //   Move Player
    currentPos.className=" ";
    nextPos.className="P";    
    nextNextPos.className="B";
    console.log("Next: Y"+player.posY+"X"+player.posX);
    console.log("NextNext: Y"+nextNextY+"X"+nextNextX);
  }
} // End of MovePlayer

function checkCanMove(y,x,nextDir){
  var nextClass=document.getElementById("Y"+y+"X"+x);
  var returnNum = 0;
  var cName = nextClass.className;  
  console.log("checkCanMove:Y"+y+"X"+x+"Dir:"+nextDir, cName);
  if (cName=="W")
  {
    returnNum = 0; //All remain, no movement
  } else 
  if (cName == "B")
  {
    returnNum = checkInfront(y, x, nextDir);
  } else 
  if (cName == "G")
  {
    console.log("G");
  } else 
  {
    returnNum = getMoving(nextDir );    
  }
  return returnNum;
} // End of CheckCanMove
      
function checkInfront(y, x, nextDir)
{
  let returnNum = 0;
  if (nextDir == "L")  // Left 
  {
    var nextClass=document.getElementById("Y"+y+"X"+(x-1));
    returnNum = -2;
  }
  else if (nextDir == "U") // Up
  {
    var nextClass=document.getElementById("Y"+(y-1)+"X"+x);
    returnNum = -2;
  }
  else if (nextDir == "R") // Right
  {
    var nextClass=document.getElementById("Y"+y+"X"+(x+1));
    returnNum = 2;
  }
  else // Down
  {
    var nextClass=document.getElementById("Y"+(y+1)+"X"+x);
    returnNum = 2;
  }
  console.log("CHKIfrn: "+y+(x-2)+nextClass.className);
  // BB, BW no move
  switch(nextClass.className)
  {
    case "W":
      returnNum = 0; //All remain, no movement
      break;
    case "B":
      returnNum = 0; //Can move
      break;
    case " ":
      break;
    case "G":
      break;
    default:
            // will change to 99 to exit game;
      returnNum = 0;
      break;
  }
    //      console.log("CheckInfront"+returnNum);
  console.log("CheckInfront"+nextClass+" Return:"+returnNum);
  return returnNum;
}

function getMoving(nextDir)  
{
  let returnMove = 0;
  if (nextDir === "L" || nextDir === "U")
  {
    returnMove = -1;
  }
  else if (nextDir === "R"|| nextDir === "D")
  {
    returnMove = 1;
  }
  console.log ("getMoving:"+returnMove);
  return returnMove;
}        

  /* 
          This is to find out P-User position. However this may not neccessary because
  assuming a fix position for user is always begin at Y11X11

*/

