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
//      innerArea.appendChild(document.createTextNode(' '));
      innerArea.appendChild(divGameArea);
      divGameArea.id = "Y"+colInside+"X"+rowInside;
      divGameArea.className = contentFromMap[colInside][rowInside][0];
//      divGameArea.appendChild(document.createElement("div"));
    }    
  }
  gameOver = false;
}
// document.addEventListener("keydown", ()=>function keyChks() {});


function buildWall(icon)
{
  var allWall = icon.appendChild(document.createElement("img"));
  allWall.setAttribute("src", "/Image/wall.png");
  allWall.setAttribute("alt","Wall");
  allWall.setAttribute("display", "flex");
  allWall.setAttribute("width", "100%");
  allWall.setAttribute("height", "100%");
  allWall.setAttribute("float", "left");
  allWall.setAttribute("top", "0");
}

function buildPlayer(icon)
{
  var allWall = icon.appendChild(document.createElement("img"));
  allWall.setAttribute("src", "/Image/FishLightGreen.png");
  allWall.setAttribute("alt","Wall");
  allWall.setAttribute("display", "flex");
  allWall.setAttribute("width", "100%");
  allWall.setAttribute("height", "100%");
  allWall.setAttribute("float", "left");
  allWall.setAttribute("top", "0");
}

function buildTiles(icon)
{
  var allWall = icon.appendChild(document.createElement("img"));
  allWall.setAttribute("src", "/Image/G-Area.svg");
  allWall.setAttribute("alt","Wall");
  allWall.setAttribute("display", "flex");
  allWall.setAttribute("width", "100%");
  allWall.setAttribute("height", "100%");
  allWall.setAttribute("float", "left");
  allWall.setAttribute("top", "0");
}

function buildBall(icon)
{
  var allWall = icon.appendChild(document.createElement("img"));
  allWall.setAttribute("src", "/Image/2-2-grinning-face-emoji-png.png");
  allWall.setAttribute("alt","Wall");
  allWall.setAttribute("display", "flex");
  allWall.setAttribute("width", "100%");
  allWall.setAttribute("height", "100%");
  allWall.setAttribute("float", "left");
  allWall.setAttribute("top", "0");
}

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

// BEGINNING OF PLAY

document.getElementById("sokoBanBody").addEventListener("keyup", function(event) 
{
  if (IsArrowKey)
  {
    event.preventDefault();
    if (gameStart == false)
    {
      xNowPos = 11;
      yNowPos = 11;
      yNextPos = yNowPos;
      xNextPos = xNowPos;
      gameStart = true;
      gameOver = false;
    }
    else
    {
      for (let i=10; i<16; ++i)
      {
        for (let j=10; j<19; ++j)
        {
          var currentPos = document.getElementById("Y"+i+"X"+j);
          if (currentPos.className=="P")
          {
          yNowPos = i;
          xNowPos = j;
          i=16;
          j=19;
          console.log(currentPos.className+"Y"+yNowPos+"X"+xNowPos);
          }
        }
      }
    }
//  console.log("Now:"+xNowPos+yNowPos+"Next:"+xNextPos+yNextPos);  
  const key = event.key;
  // Initail Next Position = current position

  switch (event.key) 
  {
    case "ArrowLeft":
      ChangePos=checkCanMove(yNowPos, xNowPos, "L");
      xNextPos=xNextPos+ChangePos;
    break;
    case "ArrowRight":
      ChangePos=checkCanMove(yNowPos, xNowPos, "R");
      xNextPos=xNextPos+ChangePos;
    break;
    case "ArrowUp":
      ChangePos=checkCanMove(yNowPos,xNowPos, "U");
      yNextPos=yNextPos+ChangePos;
    break;
    case "ArrowDown":
      ChangePos=checkCanMove(yNowPos,xNowPos, "D");
      yNextPos=yNextPos+ChangePos;
    break;
    default:
    break;
  }
  console.log("L:X"+xNowPos+"Y"+yNowPos+"C:"+ChangePos);
  if (ChangePos==0)
  {
      xNowPos=xNextPos;
      yNowPos=yNextPos;
  }
  else
  if (ChangePos==1 || ChangePos==-1)
  {
    currentPos = document.getElementById("Y"+yNowPos+"X"+xNowPos);
    currentPos.removeChild(currentPos.lastElementChild);
    currentPos.className=" ";
    var nextPos=document.getElementById("Y"+yNextPos+"X"+xNextPos);
    nextPos.className="P";
    buildPlayer(nextPos);
   
  } else
  if (ChangePos==2 && (userDirection == "R" || userDirection == "D"))
  {
    if (userDirection=="R")
    {
      console.log(userDirection)
    }
    else // Is Down
    {
      console.log(userDirection)
    }
  } else
  if (ChangePos == -2 && (userDirection == "L" || userDirection == "U"))
  {
    if (userDirection == "L")
    {
      var nextPos=document.getElementById("Y"+yNextPos+"X"+(xNextPos+1));
      var nextNextPos=document.getElementById("Y"+yNextPos+"X"+(xNextPos));
     // currentPos = document.getElementById("Y"+yNowPos+"X"+xNowPos);
      
      console.log("NY:"+yNextPos+"NX:"+(xNextPos+1)+nextPos);
      console.log("NY:"+yNextPos+"NNX:"+xNextPos+nextNextPos);
      currentPos.removeChild(currentPos.lastElementChild);
      currentPos.className=" ";
      nextPos.removeChild(nextPos.lastElementChild);
      buildPlayer(nextPos);
      nextPos.className="P";
      
      buildBall(nextNextPos);
      nextNextPos.className="B";
    } 
    else // Is left with Up only
    {
      console.log(userDirection)
    }
  } // End If (-2)
  else
  {
    msgInfo("Undefine Error!!!");
  }
}
else
{
    msgInfo("No Arrow Detected!!!");
}
 // End of IsArrowKey
}//END of Funcation
);

  
function checkCanMove(y, x, nextDir){
    var nextClass=document.getElementsByClassName("P");
  var returnNum = 0;
  var cName = nextClass.className;
  console.log(cName);
  switch(nextClass.className)
  {
    case "W":
      returnNum = 0; //All remain, no movement
      break;
    case "B":
      returnNum = checkInfront(y, x, nextDir);
      break;
    case " ":
      returnNum = getMoving(nextDir );    
      break;
    default:
          // will change to 99 to exit game;
      returnNum = 0;
          break;
  }
  return returnNum;
}
      
function checkInfront(y, x, nextDir)
{
  let returnNum = 0;
  if (nextDir == "L")  // Left 
  {
    var nextClass=document.querySelector("#Y"+y+"X"+(x-2));
    returnNum = -2;
  }
  else if (nextDir == "U") // Up
  {
    var nextClass=document.querySelector("#Y"+(y-2)+"X"+x);
    returnNum = -2;
  }
  else if (nextDir == "R") // Right
  {
    var nextClass=document.getElementById("Y"+y+"X"+(x+2));
    returnNum = 2;
  }
  else // Dowon
  {
    var nextClass=document.getElementById("Y"+(y+2)+"X"+x);
    returnNum = 2;
  }
  switch(nextClass.className)
  {
    case "W":
      returnNum = 0; //All remain, no movement
        break;
    case "B":
      returnNum = 0; //All remain, no movement
      break;
    case " ":
      break;
      default:
        // will change to 99 to exit game;
        returnNum = 0;
        break;
      }
//      console.log("CheckInfront"+returnNum);
      return returnNum;
}

function getMoving(nextDir)  
{
  if (nextDir === "L" || nextDir === "U")
  {
    return -1;
  }
  else if (nextDir === "R"|| nextDir === "D")
  {
    return 1;
  }
}        

  /* 
          This is to find out P-User position. However this may not neccessary because
  assuming a fix position for user is always begin at Y11X11

*/

