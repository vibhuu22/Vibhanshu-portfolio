import { showError, showSuccess, validateEmail } 
from "./functionalities/form/error.js";


document.addEventListener("DOMContentLoaded", () => {

    
const emailInput = document.getElementById("email");

emailInput.addEventListener("input", () => {
  validateEmail(emailInput);
});

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", e => {
            e.preventDefault();

            const targetId = anchor.getAttribute("href");
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector(".navbar");

    if (navbar) {
        window.addEventListener("scroll", () => {
            navbar.style.backgroundColor =
                window.scrollY > 50
                    ? "rgba(10,10,10,0.98)"
                    : "rgba(10,10,10,0.95)";
        });
    }

});


// text area scroll hide
const textarea = document.getElementById("message");

textarea.addEventListener("input", function () {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
});