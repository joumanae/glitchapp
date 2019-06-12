// client-side js


console.log('hello world, hello shifts :)');

'use strict' 

function reqListener (data) {
  document.body.innerHTML += this.responseText + '&lt;br&gt;';
}

setInterval(function () {
var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "/api");
oReq.send();
}, 3000);

// our default array of shifts
const shifts = [
];


const shiftsList = document.getElementById('shifts');
const shiftsForm = document.forms[0];
const shiftInput = {shift :shiftsForm.elements['shift'], starttime: shiftsForm.elements['starttime'], endtime: shiftsForm.elements['endtime']} ;


const appendNewShift = function(shift) {
  const newListItem = document.createElement('li');
  newListItem.innerHTML = shift;
  shiftsList.appendChild(newListItem);
}


shifts.forEach( function(shift) {
  appendNewShift(shift);
});


shiftsForm.onsubmit = function(event) {
  // stop our form submission from refreshing the page
  event.preventDefault();

  shifts.push(shiftInput.value);
  appendNewShift(shiftInput.value);

  // reset form 
  shiftInput.value = '';
  
};