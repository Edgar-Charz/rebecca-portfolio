const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");
const themeToggle = document.getElementById("themeToggle");
const themeColor = document.querySelector('meta[name="theme-color"]');

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const isDark = theme === "dark";
  themeToggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "rose"} theme`);
  themeToggle.setAttribute("title", `Switch to ${isDark ? "light" : "rose"} theme`);
  themeColor.setAttribute("content", isDark ? "#fff0f3" : "#fff8f8");
  try {
    localStorage.setItem("rebecca-portfolio-theme", theme);
  } catch (error) {}
}

themeToggle.addEventListener("click", () => {
  setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
});

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  siteNav.classList.toggle("is-open", !isOpen);
});

siteNav.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    siteNav.classList.remove("is-open");
  }
});

document.getElementById("year").textContent = String(new Date().getFullYear());

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}
