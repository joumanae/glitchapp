// client-side js


console.log('hello world, hello shifts :)');


// our default array of dreams
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