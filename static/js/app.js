const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const searchToggle = document.getElementById("searchToggle");
const searchOverlay = document.getElementById("searchOverlay");
const searchClose = document.getElementById("searchClose");

const savedTheme = localStorage.getItem("sqrtl-theme");
if (savedTheme === "deep") {
  root.classList.add("deep-theme");
  if (themeToggle) themeToggle.textContent = "☀️";
} else {
  if (themeToggle) themeToggle.textContent = "🌙";
}

themeToggle?.addEventListener("click", () => {
  root.classList.toggle("deep-theme");
  const isDeep = root.classList.contains("deep-theme");
  localStorage.setItem("sqrtl-theme", isDeep ? "deep" : "light");
  themeToggle.textContent = isDeep ? "☀️" : "🌙";
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
