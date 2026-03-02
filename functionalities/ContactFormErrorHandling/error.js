// error.js

export function showError(input, message) {
    input.classList.add("error");
    input.classList.remove("success");
    input.nextElementSibling.innerText = message;
  }
  
  export function showSuccess(input) {
    input.classList.add("success");
    input.classList.remove("error");
    input.nextElementSibling.innerText = "";
  }
  
  export function validateEmail(emailInput) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!regex.test(emailInput.value.trim())) {
      showError(emailInput, "Enter a valid email");
      return false;
    } else {
      showSuccess(emailInput);
      return true;
    }
  }