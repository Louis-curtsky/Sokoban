"use strict";

// Initailization

var divGameArea = document.createElement("div");
var innerArea = document.getElementById("myGame");
var gameStart = false;
var gameOver = true;
var pBeginY = 0;
var pBehinX = 0;
var yNowPos = 0;
var xNowPos = 0;
var startGX = 0;
var startGY = 0;
var endGX = 0;
var endGY = 0;

const str = "";
function msgInfo(str)
{
  document.getElementById("msgArea").innerHTML = str;
}

document.getElementById("dropbtn").addEventListener("change", function(){
var mapSelected = document.getElementById("dropbtn");
var mapText = mapSelected.options[mapSelected.selectedIndex].value;
if (mapText == "map1" && gameStart == false)
{
  var contentFromMap = tileMap01.mapGrid;  
}
else if (mapText == "map2" && gameStart == false)
{
  var contentFromMap = tileMap02.mapGrid;  
} else
{
}
  startGame(contentFromMap);
});

const player = {
  posY: 0,
  posX: 0
}


msgInfo("Arrow key to kick start the timer!!!");

//Appending Div 19x16
function startGame(contentFromMap)
{
  if (gameStart == false)
  {
    msgInfo("Start of Game!!!");
    gameStart == true;
  }

  for (let colInside = 0; colInside<16; colInside++)
  {
    for (let rowInside = 0; rowInside<19; rowInside++)
    {   
      divGameArea = document.createElement("div");
      innerArea.appendChild(divGameArea);
      divGameArea.id = "Y"+colInside+"X"+rowInside;
      divGameArea.className = contentFromMap[colInside][rowInside][0];
      // Find Player position
      if (divGameArea.className == "P")
      {
        pBeginY = colInside;
        pBehinX = rowInside;
        yNowPos = pBeginY;
        xNowPos = pBehinX;
      }
      if (divGameArea.className == "G")
      {
        if (startGY == 0)
        {
          startGY = colInside;
          if (startGX == 0)
          {
            startGX = rowInside;
          }
        } 
        else
        {
          endGY = colInside;
          endGX = rowInside;
        }
      }
    } // End of X For loop
  } // End of Y For loop
  gameOver = false;
} // End of startGame Function

var yNextPos = 0;
var xNextPos = 0;
var IsArrowKey = false;

document.getElementById("sokoBanBody").addEventListener("keydown", function(event)
{
  event.preventDefault();
  let y = 0;
  let x = 0;
  switch (event.key){
    case "ArrowLeft":
      x = -1;
      break;
    case "ArrowDown":    
      y = 1;
      break;
    case "ArrowUp":    
      y = -1;
      break;
    case "ArrowRight":
      x = 1;
      break;
    default:
      document.getElementById("msgArea").innerHTML="No Arrow Keys detected!!!";
      IsArrowKey = false;
      break;
  }
  IsArrowKey = true;
  startTimer();
  startPlaying(y, x);
})
      
  function startTimer()
  {
  let hour = 0;
  let minute = 0;
  let seconds = 0;
  let totalSeconds = 0;
  
  let intervalId = null;
  intervalId = setInterval(startTimer, 1000);
  
  function startTimer() {
    ++totalSeconds;
    hour = Math.floor(totalSeconds /3600);
    minute = Math.floor((totalSeconds - hour*3600)/60);
    seconds = totalSeconds - (hour*3600 + minute*60);
    document.getElementById("hour").innerHTML =hour;
    document.getElementById("minute").innerHTML =minute;
    document.getElementById("seconds").innerHTML =seconds;
  }
 
  
  document.getElementById('stop-btn').addEventListener('click', () => {
    if (intervalId)
      clearInterval(intervalId);
      gameOver = true;
  });  
}

// BEGINNING OF PLAY when user hit arrow keys

function startPlaying(y, x) {
  if (IsArrowKey)
  {
    event.preventDefault();
    if (gameStart == false)
    {
      msgInfo(" ");
      yNextPos = yNowPos;
      xNextPos = xNowPos;
      gameStart = true;
      gameOver = false;
      
    }
    else
    {
      var currentPos = document.getElementById("Y"+yNowPos+"X"+xNowPos);
      xNowPos=xNextPos;
      yNowPos=yNextPos;
    }
    console.log("Y"+yNowPos+"X"+xNowPos);
    const key = event.key;
  // Initail Next Position = current position
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
    } // End of Switch
    //  console.log(ChangeBigContain.returnNum+ChangeBigContain.cName+" Dir "+KDir);
    movePlayers(ChangeBigContain, KDir);
  }
  else
  {
    msgInfo("Non Arrow Keys found!!!");

  } // End of IsArrowKey
}//END of Funcation


function movePlayers(ChangeBigContain, KDir)
{
  let nextNextY = 0;
  let nextNextX = 0;
  
  console.log("MovePlay: Y"+yNowPos+"X"+xNowPos);
  if (ChangeBigContain.returnNum==-1 || ChangeBigContain.returnNum ==1)
  {
    if (KDir == "U" || KDir == "D")
    {
      yNextPos=yNowPos+ChangeBigContain.returnNum;
    } 
    else // Left or Right
    {
      xNextPos=xNowPos+ChangeBigContain.returnNum;
    }
    var  currentPos = document.getElementById("Y"+yNowPos+"X"+xNowPos);
    var nextPos=document.getElementById("Y"+yNextPos+"X"+xNextPos);
    // Change to DrawG also
    if (nextPos.className=="G")
    {
        nextPos.className="P G";
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
      nextNextY = yNowPos+ChangeBigContain.returnNum;
      yNextPos=yNowPos+1
      nextNextX = xNowPos;

    } 
    else if (KDir == "R")// Right
    {
      nextNextX = xNowPos+ChangeBigContain.returnNum;
      xNextPos=xNowPos+1
      nextNextY = yNowPos;
    }
    else if (KDir == "U")
    {
      nextNextY = yNowPos+ChangeBigContain.returnNum;   
      yNextPos=yNowPos-1
      nextNextX = xNowPos;   
    }
    else if (KDir == "L")// Left with 2 items
    {    
      nextNextX = xNowPos+ChangeBigContain.returnNum;
      xNextPos=xNowPos-1;
      nextNextY = yNowPos;5
    } else
    {
      msgInfo("Error in Logic!!!");
    }
    var currentPos = document.getElementById("Y"+yNowPos+"X"+xNowPos);
    var nextPos=document.getElementById("Y"+yNextPos+"X"+xNextPos);
    var nextNextPos=document.getElementById("Y"+nextNextY+"X"+nextNextX);
    //   Move Player
    // PBGG->PBG
    if (currentPos.className=="P" && nextPos.className=="B" && nextNextPos.className=="G")
    {
      currentPos.className=" ";
      nextPos.className="P";    
      nextNextPos.className="B";     
      drawG('B');
    } //P(BG)GW->PGBGW
    
    if  ((currentPos.className=="P" && nextPos.className=="B G"))
    {
      console.log("Loop 2"+nextPos.className+nextNextPos.className);
      currentPos.className=" ";
      nextPos.className="P";
      drawG('P');
      nextNextPos.className="B";
      drawG('B');
    } else
    if ((currentPos.className=="P G" && nextPos.className=="B G"))
    {
      console.log("Loop 3"+nextPos.className+nextNextPos.className);
      currentPos.className="G";
      nextPos.className="P";
      drawG('P');
      nextNextPos.className="B";
      drawG('B');  
    } else
    if (currentPos.className=="P" && nextPos.className=="B")
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
  var currentPos=document.getElementById("Y"+y+"X"+x);
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
  if (nextClass.className == "W" || 
  (currentPos.className == "B G" && nextClass.className == "W"))
  {
    returnNum = 0; //All remain, no movement
  } else 
  if (currentPos.className == "B" && nextClass.className == "B")
  {
    returnNum = 0; //All remain, no movement
  } else 
  if (currentPos.className == "B G" && nextClass.className == "B G")
  {
    returnNum = 0; //All remain, no movement
  } else 
  if (currentPos.className == "B" && nextClass.className == "B G")
  {
    returnNum = 0; //All remain, no movement
  } 
  console.log("Current:"+currentPos.className);
  console.log("Y"+y+"X"+x+"Next:"+nextClass.className); 
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

  /* 
          This is to find out P-User position. However this may not neccessary because
  assuming a fix position for user is always begin at Y11X11

*/

// Draw G area
//

function drawG (cName){
  for (let i=startGY; i<=endGY; ++i)
  {
    for (let j=startGX; j<=endGX; ++j)
    {
      var getPosition = document.getElementById("Y"+i+"X"+j)
//      console.log("Draw"+getPosition.className+" Y"+i+"X"+j);
      if (getPosition.className==cName)
      {
        getPosition.classList=cName+' G';
        console.log(cName+"cl: "+getPosition.classList+" Y"+i+"X"+j);
      } 
    }
  }
} // ENd of DrawG