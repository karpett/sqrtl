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
  if (event.key === "Escape") {
    closeSearch();
    document.querySelectorAll(".nav-dropdown.open").forEach((dropdown) => {
      dropdown.classList.remove("open");
      dropdown.querySelector(".nav-drop-button")?.setAttribute("aria-expanded", "false");
    });
  }
});

// things dropdown click support, hover is handled by CSS
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

// cute calendar
const calendarGrid = document.getElementById("calendarGrid");
const calendarMonth = document.getElementById("calendarMonth");
const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");
let visibleDate = new Date();

function dateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

function nthWeekdayOfMonth(year, monthIndex, weekday, nth) {
  const first = new Date(year, monthIndex, 1);
  const offset = (weekday - first.getDay() + 7) % 7;
  return new Date(year, monthIndex, 1 + offset + (nth - 1) * 7);
}

function mondayBefore(year, monthIndex, dayOfMonth) {
  const date = new Date(year, monthIndex, dayOfMonth);
  const diff = (date.getDay() + 6) % 7;
  return addDays(date, -diff);
}

function easterSunday(year) {
  // Gregorian computus
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month, day);
}

function addHoliday(map, date, name, kind = "holiday") {
  const key = dateKey(date);
  if (!map.has(key)) map.set(key, []);
  map.get(key).push({ name, kind });
}

function addFixedHolidayWithObserved(map, year, monthIndex, dayOfMonth, name) {
  const actual = new Date(year, monthIndex, dayOfMonth);
  addHoliday(map, actual, name, "holiday");

  const day = actual.getDay();
  let observed = null;

  // typical Monday-Friday observed day when the actual fixed-date stat falls on a weekend
  if (day === 6) observed = addDays(actual, 2); // saturday -> monday
  if (day === 0) observed = addDays(actual, 1); // sunday -> monday

  if (observed && dateKey(observed) !== dateKey(actual)) {
    addHoliday(map, observed, `${name} observed`, "observed");
  }
}

function bcRichmondHolidays(year) {
  const holidays = new Map();

  addFixedHolidayWithObserved(holidays, year, 0, 1, "new year's day");
  addHoliday(holidays, nthWeekdayOfMonth(year, 1, 1, 3), "family day");
  addHoliday(holidays, addDays(easterSunday(year), -2), "good friday");
  addHoliday(holidays, mondayBefore(year, 4, 25), "victoria day");
  addFixedHolidayWithObserved(holidays, year, 6, 1, "canada day");
  addHoliday(holidays, nthWeekdayOfMonth(year, 7, 1, 1), "bc day");
  addHoliday(holidays, nthWeekdayOfMonth(year, 8, 1, 1), "labour day");
  addFixedHolidayWithObserved(holidays, year, 8, 30, "truth & reconciliation");
  addHoliday(holidays, nthWeekdayOfMonth(year, 9, 1, 2), "thanksgiving");
  addFixedHolidayWithObserved(holidays, year, 10, 11, "remembrance day");
  addFixedHolidayWithObserved(holidays, year, 11, 25, "christmas day");


  // recurring squad birthdays
  addHoliday(holidays, new Date(year, 0, 9), "bob day", "birthday");
  addHoliday(holidays, new Date(year, 0, 10), "ant day", "birthday");
  addHoliday(holidays, new Date(year, 3, 19), "mario day", "birthday");
  addHoliday(holidays, new Date(year, 4, 29), "jus day", "birthday");
  addHoliday(holidays, new Date(year, 10, 29), "erp day", "birthday");
  addHoliday(holidays, new Date(year, 11, 17), "ame day", "birthday");

  return holidays;
}

function renderCalendar() {
  if (!calendarGrid || !calendarMonth) return;

  const year = visibleDate.getFullYear();
  const month = visibleDate.getMonth();
  const today = new Date();
  const holidays = bcRichmondHolidays(year);

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
    const cellDate = new Date(year, month, day);
    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = "calendar-day";

    const dayNumber = document.createElement("span");
    dayNumber.className = "calendar-day-number";
    dayNumber.textContent = day;
    cell.appendChild(dayNumber);

    const cellHolidays = holidays.get(dateKey(cellDate)) || [];
    if (cellHolidays.length) {
      cell.classList.add("has-holiday");
      cell.title = cellHolidays.map((holiday) => holiday.name).join(", ");

      const holidayList = document.createElement("span");
      holidayList.className = "calendar-holiday-list";

      cellHolidays.forEach((holiday) => {
        const label = document.createElement("span");
        label.className = `calendar-holiday ${holiday.kind}`;
        label.textContent = holiday.name;
        holidayList.appendChild(label);
      });

      cell.appendChild(holidayList);
    }

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

// ez split calculator
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

// split page: ez / ai-erp modes
const splitModeButtons = document.querySelectorAll("[data-split-mode]");
const splitModePanels = document.querySelectorAll("[data-split-panel]");

function setSplitMode(mode) {
  splitModeButtons.forEach((button) => {
    const active = button.dataset.splitMode === mode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", active ? "true" : "false");
  });

  splitModePanels.forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.splitPanel === mode);
  });
}

splitModeButtons.forEach((button) => {
  button.addEventListener("click", () => setSplitMode(button.dataset.splitMode));
});

// ai-erp receipt matcher with header percentages and hideable columns
const aiErpRows = document.getElementById("aiErpRows");
const aiErpGrandTotal = document.getElementById("aiErpGrandTotal");
const aiErpGrandTotalLarge = document.getElementById("aiErpGrandTotalLarge");
const aiCostTotal = document.getElementById("aiCostTotal");
const aiGstTotal = document.getElementById("aiGstTotal");
const aiPstTotal = document.getElementById("aiPstTotal");
const aiOtherTotal = document.getElementById("aiOtherTotal");
const aiTipTotal = document.getElementById("aiTipTotal");
const addAiErpRow = document.getElementById("addAiErpRow");
const aiHeaderGst = document.getElementById("aiHeaderGst");
const aiHeaderPst = document.getElementById("aiHeaderPst");
const aiHeaderOther = document.getElementById("aiHeaderOther");
const aiHeaderTip = document.getElementById("aiHeaderTip");
const aiColumnToggles = document.querySelectorAll("[data-ai-col-toggle]");

function aiMoney(value) {
  return new Intl.NumberFormat("en-ca", {
    style: "currency",
    currency: "CAD",
  }).format(value || 0);
}

function aiNumber(input) {
  return Math.max(0, Number(input?.value) || 0);
}

function updateAiErpTotals() {
  if (!aiErpRows) return;

  const gstRate = aiNumber(aiHeaderGst) / 100;
  const pstRate = aiNumber(aiHeaderPst) / 100;
  const otherRate = aiNumber(aiHeaderOther) / 100;
  const tipRate = aiNumber(aiHeaderTip) / 100;

  let costSum = 0;
  let gstSum = 0;
  let pstSum = 0;
  let otherSum = 0;
  let tipSum = 0;
  let grandSum = 0;

  aiErpRows.querySelectorAll("tr").forEach((row) => {
    const cost = aiNumber(row.querySelector(".ai-cost"));
    const gst = cost * gstRate;
    const pst = cost * pstRate;
    const other = cost * otherRate;
    const tip = cost * tipRate;
    const total = cost + gst + pst + other + tip;

    row.querySelector(".ai-gst-amount").textContent = aiMoney(gst);
    row.querySelector(".ai-pst-amount").textContent = aiMoney(pst);
    row.querySelector(".ai-other-amount").textContent = aiMoney(other);
    row.querySelector(".ai-tip-amount").textContent = aiMoney(tip);
    row.querySelector(".ai-row-total").textContent = aiMoney(total);

    costSum += cost;
    gstSum += gst;
    pstSum += pst;
    otherSum += other;
    tipSum += tip;
    grandSum += total;
  });

  if (aiCostTotal) aiCostTotal.textContent = aiMoney(costSum);
  if (aiGstTotal) aiGstTotal.textContent = aiMoney(gstSum);
  if (aiPstTotal) aiPstTotal.textContent = aiMoney(pstSum);
  if (aiOtherTotal) aiOtherTotal.textContent = aiMoney(otherSum);
  if (aiTipTotal) aiTipTotal.textContent = aiMoney(tipSum);
  if (aiErpGrandTotal) aiErpGrandTotal.textContent = aiMoney(grandSum);
  if (aiErpGrandTotalLarge) aiErpGrandTotalLarge.textContent = aiMoney(grandSum);
}

function applyAiColumnVisibilityTo(rootNode = document) {
  aiColumnToggles.forEach((toggle) => {
    const col = toggle.dataset.aiColToggle;
    const visible = toggle.checked;
    rootNode.querySelectorAll(`[data-ai-col="${col}"]`).forEach((cell) => {
      cell.classList.toggle("ai-col-hidden", !visible);
    });
  });
}

function createAiErpRow() {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td data-ai-col="name"><input class="ai-name" type="text" value="person" aria-label="name"></td>
    <td data-ai-col="cost"><input class="ai-cost" type="number" min="0" step="0.01" value="0.00" aria-label="cost"></td>
    <td data-ai-col="gst"><span class="ai-gst-amount">$0.00</span></td>
    <td data-ai-col="pst"><span class="ai-pst-amount">$0.00</span></td>
    <td data-ai-col="other"><span class="ai-other-amount">$0.00</span></td>
    <td data-ai-col="tip"><span class="ai-tip-amount">$0.00</span></td>
    <td data-ai-col="total"><strong class="ai-row-total">$0.00</strong></td>
    <td class="ai-action-col"><button class="ai-row-remove" type="button" aria-label="remove row">×</button></td>
  `;
  applyAiColumnVisibilityTo(row);
  return row;
}

aiColumnToggles.forEach((toggle) => {
  toggle.addEventListener("change", () => applyAiColumnVisibilityTo(document));
});

[aiHeaderGst, aiHeaderPst, aiHeaderOther, aiHeaderTip].forEach((input) => {
  input?.addEventListener("input", updateAiErpTotals);
});

addAiErpRow?.addEventListener("click", () => {
  aiErpRows?.appendChild(createAiErpRow());
  updateAiErpTotals();
});

aiErpRows?.addEventListener("input", updateAiErpTotals);

aiErpRows?.addEventListener("click", (event) => {
  const removeButton = event.target.closest(".ai-row-remove");
  if (!removeButton) return;

  const rows = aiErpRows.querySelectorAll("tr");
  if (rows.length <= 1) return;

  removeButton.closest("tr")?.remove();
  updateAiErpTotals();
});

applyAiColumnVisibilityTo(document);
updateAiErpTotals();
