import { showError, showSuccess, validateEmail } 
from "./functionalities/form/error.js";


document.addEventListener("DOMContentLoaded", () => {

    
const emailInput = document.getElementById("email");

emailInput.addEventListener("input", () => {
  validateEmail(emailInput);
});


});


// text area scroll hide
const textarea = document.getElementById("message");

textarea.addEventListener("input", function () {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
});