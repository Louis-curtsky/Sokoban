"use strict";
 
var divGameArea = document.createElement("div");
divGameArea.innerHTML = "Div";
let space = "";
//Appending Div 19x16

for (let colInside = 0; colInside<19; colInside++){
    for (let rowInside = 0; rowInside<16; rowInside)
    {
        document.getElementById("myID").appendChild(divGameArea);
        document.getElementByTagName("Div").appendChild("ID = "+"R"+rowInside+"C"+colInside);
        console.log(divGameArea);
    }
}