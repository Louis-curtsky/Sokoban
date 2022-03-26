"use strict";
 
//
//Appending Div 19x16

var divGameArea = document.createElement("div");
var contentFromMap = tileMap01.mapGrid;

for (let colInside = 0; colInside<16; colInside++)
{
    for (let rowInside = 0; rowInside<19; rowInside++)
    {
        if (colInside==0 && rowInside ==0)
        {
        document.getElementById("myGame").appendChild(divGameArea);
        divGameArea.setAttribute("id", "Y"+colInside+"X"+rowInside);
        divGameArea.id = "Y"+colInside+"X"+rowInside;
        } else
        {
            divGameArea = document.createElement("div");
            document.getElementById("myGame").appendChild(divGameArea);
            divGameArea.setAttribute("id", "Y"+colInside+"X"+rowInside);
            divGameArea.id = "Y"+colInside+"X"+rowInside;
        }
    document.getElementById("Y"+colInside+"X"+rowInside).innerHTML = contentFromMap[colInside][rowInside][0];
//    console.log(document.getElementById("Y"+colInside+"X"+rowInside));
    }
}

const userPosition = Y11X11;

document.getElementById("sokoBanBody").onkeydown = function() {keyIsPress()};
document.getElementById("sokoBanBody").onkeyup = function() {keyIsRelease()};

function keyIsPress() {

  document.getElementById("msgArea").innerHTML="Key is Press";
}
    
function keyIsRelease() {
    document.getElementById("msgArea").innerHTML="Key is Released";
  }

  /* 
  This is to find out P-User position. However this may not neccessary because
  assuming a fix position for user is always begin at Y11X11
  */

  /*
  for (let colInside = 0; colInside<16; colInside++)
    {
      for (let rowInside = 0; rowInside<19; rowInside++)
      {
          if (document.getElementById("Y"+colInside+"X"+rowInside).innerHTML === "P")
          {
            console.log("Poition: Y"+colInside+"X"+rowInside);
            var posIs = "Y"+colInside+"X"+rowInside;
          }
      }
    }
    console.log(document.getElementById(posIs).innerHTML);
  */
  /*    
  // Get all the span elements and loop through them
  divGameArea.querySelectorAll("div").forEach(function(element){
    // Check the textContent of the element for a match
    if(element.textContent === "P"){
      // Find the nearest ancestor div
      let closest = element.closest("div")
      // ...then do whatever you want with it
      console.log("The " + closest.nodeName + " has an id of: " + closest.id);
    }
  });


// Test page to create 10 Div
const forDiv = document.createElement("div");

// Add ID to DIV element:
for (let count=0; count<10; count++){
        document.getElementById("myDIV").appendChild(forDiv);
        forDiv.setAttribute('id', count);
        forDiv.id = "R"+count;    
        console.log(forDiv.id);
}
*/
