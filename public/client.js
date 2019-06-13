// client-side js
console.log('hello world, hello shifts :)');

'use strict' 

function reqListener (data) {
  document.body.innerHTML += this.responseText + '&lt;br&gt;';
}

const getshifts = function(callback) {
var oReq = new XMLHttpRequest(); 
oReq.addEventListener("load", reqListener);
oReq.open("GET", "/api/shifts");
oReq.onereadystatechange = function(){
  if(oReq.readyState === 4 && oReq.status === 200){
    callback(oReq.responseTxt)
  }
}; 
oReq.send(); 
}
      

const shiftsList = document.getElementById('shifts');
const shiftsForm = document.forms[0];


const appendNewShift = function(shift) {
  const newListItem = document.createElement('li');
  newListItem.innerHTML = shift;
  shiftsList.appendChild(newListItem);
}

const loadShifts = function(){ 
  getshifts(function(shifts) {
  appendNewShift(shifts);
})};

loadShifts(); 


shiftsForm.onsubmit = function(event) {
  // stop our form submission from refreshing the page
  event.preventDefault();

  let shiftInput = {shift: event.srcElement.elements['shift'], starttime: event.srcElement.elements['starttime'], endtime: event.srcElement.elements['endtime']}
  
  appendNewShift(shiftInput.value);

  // reset form 
  shiftInput.value = '';
  
};

document.getElementById("shifts").reset();