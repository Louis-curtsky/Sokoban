"use strict";
 
const divGameArea = document.createElement("div");
//Appending Div 19x16

for (let colInside = 0; colInside<19; colInside++){
    for (let rowInside = 0; rowInside<16; rowInside++)
    {
        document.getElementById("myGame").appendChild(divGameArea);
        divGameArea.setAttribute("id", "Y"+colInside+"X"+rowInside);
        divGameArea.id = "Y"+colInside+"X"+rowInside;
        console.log(divGameArea.id);
    }
}
/*
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
