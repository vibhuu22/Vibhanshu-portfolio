// Fixed import path (was ./functionalities/form/error.js — wrong folder name)
import { showError, showSuccess, validateEmail }
  from "./functionalities/ContactFormErrorHandling/error.js";


document.addEventListener("DOMContentLoaded", () => {

  /* ------------------------------------------
     EMAIL VALIDATION
  ------------------------------------------ */
  const emailInput = document.getElementById("email");
  if (emailInput) {
    emailInput.addEventListener("input", () => {
      validateEmail(emailInput);
    });
  }


  /* ------------------------------------------
     HAMBURGER MENU
  ------------------------------------------ */
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");

  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      mobileNav.classList.toggle("open");
      document.body.classList.toggle("no-scroll");
    });

    // Close mobile nav when any link is clicked
    document.querySelectorAll(".mobile-link").forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        mobileNav.classList.remove("open");
        document.body.classList.remove("no-scroll");
      });
    });

    // Close mobile nav on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileNav.classList.contains("open")) {
        hamburger.classList.remove("open");
        mobileNav.classList.remove("open");
        document.body.classList.remove("no-scroll");
      }
    });
  }


  /* ------------------------------------------
     SCROLL REVEAL (Intersection Observer)
  ------------------------------------------ */
  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger siblings slightly for a cascade effect
          const siblings = Array.from(
            entry.target.parentElement.querySelectorAll(".reveal:not(.revealed)")
          );
          const delay = siblings.indexOf(entry.target) * 80;

          setTimeout(() => {
            entry.target.classList.add("revealed");
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealElements.forEach(el => observer.observe(el));

});


/* ------------------------------------------
   TEXTAREA AUTO-RESIZE
------------------------------------------ */
const textarea = document.getElementById("message");
if (textarea) {
  textarea.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  });
}