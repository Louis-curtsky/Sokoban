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

var gRowS = 0;
var gRowE = 0;
var gColS = 0;
var gColE = 0;

startGame();

//Appending Div 19x16
function startGame()
{
  let beginGR = false;
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
/*      if (divGameArea.className == "G")
      {
        if (gColS == 0 && beginGR == false)
        {
          gColS = colInside;
          gRowS = rowInside;
          beginGR = true;
        }
        else
        {
          gRowE = rowInside;
          gColE = colInside;
        }
      } */
    }    
  } 
  gameOver = false;
}
// document.addEventListener("keydown", ()=>function keyChks() {});


var yNowPos = 11;
var xNowPos = 11;
var yNextPos = 0;
var xNextPos = 0;
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
  const key = event.key;
  // Initail Next Position = current position
    xNowPos=player.posX;
    yNowPos=player.posY;
    let KDir = "";
  switch (event.key) 
  {
    case "ArrowLeft":
      KDir = "L";
      var ChangeBigContain=checkCanMove(yNowPos, (xNowPos-1), "L");
      break;
      case "ArrowRight":
      KDir = "R";
      ChangeBigContain=checkCanMove(yNowPos, (xNowPos+1), "R");
    break;
    case "ArrowUp":
      KDir = "U";
      ChangeBigContain=checkCanMove((yNowPos-1), xNowPos, "U");
    break;
    case "ArrowDown":
      KDir="D";
      ChangeBigContain=checkCanMove((yNowPos+1),xNowPos, "D");
      break;
      default:
      break;
  }
//  console.log(ChangeBigContain.returnNum+ChangeBigContain.cName+" Dir "+KDir);
  movePlayers(ChangeBigContain, KDir);
}
else
{
  msgInfo("No Arrow Detected!!!");
} // End of IsArrowKey
}//END of Funcation
);

function movePlayers(ChangeBigContain, KDir)
{
  let nextNextY = 0;
  let nextNextX = 0;
  if (ChangeBigContain.returnNum==-1 || ChangeBigContain.returnNum ==1)
  {
    if (KDir == "U" || KDir == "D")
    {
      player.posY=player.posY+ChangeBigContain.returnNum;
    } 
    else // Left or Right
    {
      player.posX=player.posX+ChangeBigContain.returnNum;
    }
    var  currentPos = document.getElementById("Y"+yNowPos+"X"+xNowPos);
    var nextPos=document.getElementById("Y"+player.posY+"X"+player.posX);
    if (nextPos.className=="G")
    {
        nextPos.classList="P G";
    } else
    {
      nextPos.className="P";
    }
    if (currentPos.className=="P G")
    {
        currentPos.className = "G"
    } else
    {
      currentPos.className=" ";
    }
   
    //   Move Player
  
  } else
  if (ChangeBigContain.returnNum==2 || ChangeBigContain.returnNum == -2)
  {
    if (KDir == "D")
    {
      nextNextY = player.posY+ChangeBigContain.returnNum;
      player.posY=player.posY+1
      nextNextX = player.posX;
    } 
    else if (KDir == "R")// Right
    {
      nextNextX = player.posX+ChangeBigContain.returnNum;
      player.posX=player.posX+1
      nextNextY = player.posY;
    }
    else if (KDir == "U")
    {
      nextNextY = player.posY+ChangeBigContain.returnNum;   
      player.posY=player.posY-1
      nextNextX = player.posX;   
    }
    else if (KDir == "L")// Left with 2 items
    {    
      nextNextX = player.posX+ChangeBigContain.returnNum;
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
    // PBGG->PBG
    console.log("NXTNXTCL: "+nextNextPos.classList+" NXT: "+nextPos.classList);
    if (nextNextPos.className=="G" && nextPos.className=="B" && KDir == "R")
    {
      currentPos.className=" ";
      nextPos.className="P";    
      nextNextPos.className="B G";      
      console.log("Loop 1"+nextNextPos.className);
    } else // PBG->PBW
    if(nextNextPos.className=="G" && nextPos.classList=="B G" && KDir == "R")
    {
      console.log("Loop 2");
      currentPos.className = " ";
      nextPos.className="P G";
      nextNextPos.className="B G"
    }
    else // PBGB->PBB
    if (nextNextPos.className == "B G" && nextPos.className == "B G" && KDir == "R")
    {
      console.log("Loop 3");      
    }
    else // P" "B(G)<-PBB(GG)
    if (nextNextPos.className == "B G" && nextPos.classList=="B G" && KDir == "L")
    {
      nextPos.className = "P";
      currentPos.className =" ";
      console.log("Loop 4");
    }
    else
    {
      currentPos.className=" ";
      nextPos.className="P";    
      nextNextPos.className="B";
      console.log("Loop 5");
    }
    
  }
} // End of MovePlayer

function checkCanMove(y,x,nextDir){
  var nextClass=document.getElementById("Y"+y+"X"+x);
  var returnNum = 0;
  var cName = nextClass.className;  
  if (cName=="W")
  {
    returnNum = 0; //All remain, no movement
  } else 
  if (cName == "B" || cName == "B G")
  {
    returnNum = checkInfront(y, x, nextDir);
  } else 
  if (cName == "G")
  {
    returnNum = getMoving(nextDir);
  } else 
  if (cName == " ")
  {
    returnNum = getMoving(nextDir );    
  }
  else
  {}
  return {returnNum, cName};
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
  // BB, BW no move
  if (nextClass.className == "W")
  {
      returnNum = 0; //All remain, no movement
  }
  console.log("CheckInfront"+nextClass.className+" Return:"+returnNum);
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
  return returnMove;
}  

function drawGoalArea (gColS, gRowS, gColE, gRowE)
{
  for (let i=0; i<gColS; i++)
  {
    for (let j=0; j<gRowS; j++)
    {
      var  gPosition = document.getElementById("Y"+i+"X"+j);
      gPosition.className = "G";
    }
  }
}

  /* 
          This is to find out P-User position. However this may not neccessary because
  assuming a fix position for user is always begin at Y11X11

*/

