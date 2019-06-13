// client-side js
console.log('hello world, hello shifts :)');

'use strict' 

function reqListener (data) {
  document.body.innerHTML += this.responseText;
}

const getShifts = function(callback) {
var oReq = new XMLHttpRequest(); 
oReq.addEventListener("load", reqListener);
oReq.open("GET", "/api/shift");
oReq.onereadystatechange = function(){
  if(oReq.readyState === 4 && oReq.status === 200){
    callback(oReq.responseTxt)
  }
}; 
oReq.send(); 
}

const loadShifts = function(){ 
  getShifts(function(shifts) {
  appendNewShift(shifts);
})};

loadShifts(); 

const postShifts = function(callback){
  var oReq = new XMLHttpRequest(); 
  oReq.open("POST", "/api/shift")
  oReq.onereadystatechange = function(){
  if(oReq.readyState === 4 && oReq.status === 200){
    callback(oReq.responseTxt)
    }
  }; 
}
      

const shiftsList = document.getElementById('shifts');
const shiftsForm = document.forms[0];


const appendNewShift = function(shift) {
  const newListItem = document.createElement('li');
  newListItem.innerHTML = shift;
  shiftsList.appendChild(newListItem);
}


shiftsForm.onsubmit = function(event) {
  // stop our form submission from refreshing the page
  event.preventDefault();

  let shiftInput = {shift: event.srcElement.elements['shift'], starttime: event.srcElement.elements['starttime'], endtime: event.srcElement.elements['endtime']}
  
  appendNewShift(shiftInput.value);

  postShifts(); 

  // reset form 
  shiftInput.value = '';
  
};


const clear = document.getElementById("shifts").reset();
  



