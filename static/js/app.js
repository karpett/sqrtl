const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const searchToggle = document.getElementById("searchToggle");
const searchOverlay = document.getElementById("searchOverlay");
const searchClose = document.getElementById("searchClose");
const profileToggle = document.getElementById("profileToggle");
const profileMenu = document.getElementById("profileMenu");

const savedTheme = localStorage.getItem("sqrtl-theme");
if (savedTheme === "deep") {
  root.classList.add("deep-theme");
  if (themeToggle) themeToggle.textContent = "☾";
}

themeToggle?.addEventListener("click", () => {
  root.classList.toggle("deep-theme");
  const isDeep = root.classList.contains("deep-theme");
  localStorage.setItem("sqrtl-theme", isDeep ? "deep" : "light");
  themeToggle.textContent = isDeep ? "☾" : "☼";
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

profileToggle?.addEventListener("click", (event) => {
  event.stopPropagation();
  const isOpen = profileMenu?.classList.toggle("open");
  profileToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

document.addEventListener("click", () => {
  profileMenu?.classList.remove("open");
  profileToggle?.setAttribute("aria-expanded", "false");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeSearch();
    profileMenu?.classList.remove("open");
    profileToggle?.setAttribute("aria-expanded", "false");
  }
});
