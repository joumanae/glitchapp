// client-side js
console.log('hello world, hello shifts :)');

'use strict' 

function reqListener (data) {
  document.body.innerHTML += this.responseText + '&lt;br&gt;';
}

const addshifts = function() {
var oReq = new XMLHttpRequest(); 
oReq.addEventListener("load", reqListener);
oReq.open("GET", "/api/shifts");
oReq.send();
}
      
      
      

// our default array of shifts



const shiftsList = document.getElementById('shifts');
const shiftsForm = document.forms[0];



const appendNewShift = function(shift) {
  const newListItem = document.createElement('li');
  newListItem.innerHTML = shift;
  shiftsList.appendChild(newListItem);
}

const getShifts = function()
shifts.forEach( function(shift) {
  appendNewShift(shift);
});


shiftsForm.onsubmit = function(event) {
  // stop our form submission from refreshing the page
  event.preventDefault();

  let shiftInput = {shift: event.srcElement.elements['shift'], starttime: event.srcElement.elements['starttime'], endtime: event.srcElement.elements['endtime']}
  
  shifts.push(shiftInput.value);
  appendNewShift(shiftInput.value);

  // reset form 
  shiftInput.value = '';
  
};