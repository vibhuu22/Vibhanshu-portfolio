import { validateEmail }
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
     THEME TOGGLE (rail + mobile top bar)
  ------------------------------------------ */
  const themeToggles = document.querySelectorAll(".theme-toggle");
  const root = document.documentElement;

  const isDark = () =>
    root.dataset.theme
      ? root.dataset.theme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;

  const syncThemeIcons = () => {
    themeToggles.forEach(btn => {
      btn.innerHTML = isDark()
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
    });
  };

  syncThemeIcons();
  themeToggles.forEach(btn => {
    btn.addEventListener("click", () => {
      root.dataset.theme = isDark() ? "light" : "dark";
      try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
      syncThemeIcons();
    });
  });


  /* ------------------------------------------
     HAMBURGER MENU
  ------------------------------------------ */
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");

  const closeMobileNav = () => {
    hamburger.classList.remove("open");
    mobileNav.classList.remove("open");
    document.body.classList.remove("no-scroll");
  };

  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      mobileNav.classList.toggle("open");
      document.body.classList.toggle("no-scroll");
    });

    document.querySelectorAll(".mobile-link").forEach(link => {
      link.addEventListener("click", closeMobileNav);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileNav.classList.contains("open")) closeMobileNav();
    });
  }


  /* ------------------------------------------
     TOP BAR BORDER ON SCROLL (mobile)
  ------------------------------------------ */
  const topbar = document.querySelector(".topbar");
  const onScroll = () => topbar.classList.toggle("scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();


  /* ------------------------------------------
     ACTIVE SECTION IN RAIL NAV
  ------------------------------------------ */
  const navLinks = document.querySelectorAll(".rail-nav a");
  const linkFor = id => document.querySelector(`.rail-nav a[href="#${id}"]`);

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        // Sections without a nav entry (recognition, toolkit…) keep the previous highlight
        const link = linkFor(entry.target.id);
        if (!link) return;
        navLinks.forEach(l => l.classList.toggle("active", l === link));
      });
    },
    { rootMargin: "-35% 0px -60% 0px" }
  );

  document.querySelectorAll("main section[id]").forEach(s => sectionObserver.observe(s));


  /* ------------------------------------------
     CURSOR SPOTLIGHT (desktop pointers only)
  ------------------------------------------ */
  if (window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("pointermove", (e) => {
      root.style.setProperty("--mx", `${e.clientX}px`);
      root.style.setProperty("--my", `${e.clientY}px`);
    }, { passive: true });
  }


  /* ------------------------------------------
     TIMELINE FILTERS
  ------------------------------------------ */
  const chips = document.querySelectorAll(".chip");
  const items = document.querySelectorAll(".tl-item");

  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      const filter = chip.dataset.filter;

      chips.forEach(c => c.classList.toggle("active", c === chip));

      items.forEach(item => {
        const tracks = item.dataset.track.split(" ");
        const show = filter === "all" || tracks.includes(filter);
        item.classList.toggle("hidden", !show);
        // Filtered-in items may not have scrolled into view yet
        if (show) item.classList.add("revealed");
      });
    });
  });


  /* ------------------------------------------
     SCROLL REVEAL (Intersection Observer)
  ------------------------------------------ */
  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Stagger siblings slightly for a cascade effect
          const siblings = Array.from(
            entry.target.parentElement.querySelectorAll(".reveal:not(.revealed)")
          );
          const delay = Math.min(siblings.indexOf(entry.target), 4) * 70;

          setTimeout(() => {
            entry.target.classList.add("revealed");
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
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
