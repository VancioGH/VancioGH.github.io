document.addEventListener("DOMContentLoaded", () => {
  initI18n();
  initFilters();
  loadProjects();
  initSmoothScroll();
  initMobileMenu();
});

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = link.getAttribute("href").slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        // Close mobile menu if open
        document.querySelector(".nav-links")?.classList.remove("open");
        document.querySelector(".menu-toggle")?.classList.remove("open");
      }
    });
  });
}

function initMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
      toggle.classList.toggle("open");
    });
  }
}
