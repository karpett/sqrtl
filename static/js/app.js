const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeToggleIcon = document.getElementById("themeToggleIcon");
const searchToggle = document.getElementById("searchToggle");
const searchOverlay = document.getElementById("searchOverlay");
const searchClose = document.getElementById("searchClose");

const sunIcon = "/static/img/theme-sun.png";
const moonIcon = "/static/img/theme-moon.png";

function syncThemeIcon() {
  const isDeep = root.classList.contains("deep-theme");
  if (themeToggleIcon) {
    themeToggleIcon.src = isDeep ? moonIcon : sunIcon;
  }
}

const savedTheme = localStorage.getItem("sqrtl-theme");
if (savedTheme === "deep") {
  root.classList.add("deep-theme");
}
syncThemeIcon();

themeToggle?.addEventListener("click", () => {
  root.classList.toggle("deep-theme");
  const isDeep = root.classList.contains("deep-theme");
  localStorage.setItem("sqrtl-theme", isDeep ? "deep" : "light");
  syncThemeIcon();
});

function openSearch() {
  searchOverlay?.classList.add("open");
  searchOverlay?.setAttribute("aria-hidden", "false");
}
function closeSearch() {
  searchOverlay?.classList.remove("open");
  searchOverlay?.setAttribute("aria-hidden", "true");
}
searchToggle?.addEventListener("click", openSearch);
searchClose?.addEventListener("click", closeSearch);
searchOverlay?.addEventListener("click", (event) => {
  if (event.target === searchOverlay) closeSearch();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeSearch();
});
