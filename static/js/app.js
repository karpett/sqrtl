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


// things dropdown
document.querySelectorAll(".nav-drop-button").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const dropdown = button.closest(".nav-dropdown");
    const isOpen = dropdown?.classList.toggle("open");
    button.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
});

document.addEventListener("click", () => {
  document.querySelectorAll(".nav-dropdown.open").forEach((dropdown) => {
    dropdown.classList.remove("open");
    dropdown.querySelector(".nav-drop-button")?.setAttribute("aria-expanded", "false");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.querySelectorAll(".nav-dropdown.open").forEach((dropdown) => {
      dropdown.classList.remove("open");
      dropdown.querySelector(".nav-drop-button")?.setAttribute("aria-expanded", "false");
    });
  }
});

// cute calendar
const calendarGrid = document.getElementById("calendarGrid");
const calendarMonth = document.getElementById("calendarMonth");
const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");
let visibleDate = new Date();

function renderCalendar() {
  if (!calendarGrid || !calendarMonth) return;

  const year = visibleDate.getFullYear();
  const month = visibleDate.getMonth();
  const today = new Date();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = firstDay.getDay();

  calendarMonth.textContent = firstDay.toLocaleDateString("en-ca", {
    month: "long",
    year: "numeric",
  }).toLowerCase();

  calendarGrid.innerHTML = "";

  for (let i = 0; i < startOffset; i++) {
    const empty = document.createElement("span");
    empty.className = "calendar-day empty";
    calendarGrid.appendChild(empty);
  }

  for (let day = 1; day <= lastDay.getDate(); day++) {
    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = "calendar-day";
    cell.textContent = day;

    const isToday =
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();

    if (isToday) {
      cell.classList.add("today");
    }

    calendarGrid.appendChild(cell);
  }
}

prevMonth?.addEventListener("click", () => {
  visibleDate = new Date(visibleDate.getFullYear(), visibleDate.getMonth() - 1, 1);
  renderCalendar();
});

nextMonth?.addEventListener("click", () => {
  visibleDate = new Date(visibleDate.getFullYear(), visibleDate.getMonth() + 1, 1);
  renderCalendar();
});

renderCalendar();

// cute split calculator
const splitTotal = document.getElementById("splitTotal");
const splitTip = document.getElementById("splitTip");
const splitPeople = document.getElementById("splitPeople");
const splitEach = document.getElementById("splitEach");
const splitDetails = document.getElementById("splitDetails");

function money(value) {
  return new Intl.NumberFormat("en-ca", {
    style: "currency",
    currency: "CAD",
  }).format(value || 0);
}

function updateSplit() {
  if (!splitTotal || !splitTip || !splitPeople || !splitEach || !splitDetails) return;

  const total = Math.max(0, Number(splitTotal.value) || 0);
  const tipRate = Math.max(0, Number(splitTip.value) || 0) / 100;
  const people = Math.max(1, Math.round(Number(splitPeople.value) || 1));
  splitPeople.value = people;

  const tip = total * tipRate;
  const grandTotal = total + tip;
  const each = grandTotal / people;

  splitEach.textContent = money(each);
  splitDetails.textContent = `${money(total)} + ${money(tip)} tip ÷ ${people}`;
}

[splitTotal, splitTip, splitPeople].forEach((input) => {
  input?.addEventListener("input", updateSplit);
});

updateSplit();
