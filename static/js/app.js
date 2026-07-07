(() => {
  "use strict";

  const root = document.documentElement;
  const THEME_KEY = "sqrtl-theme";
  const THEME = {
    light: {
      className: "deep-theme",
      icon: "/static/img/theme-sun.png",
      pressed: "false",
    },
    deep: {
      className: "deep-theme",
      icon: "/static/img/theme-moon.png",
      pressed: "true",
    },
  };

  const currency = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  });

  const money = (value) => currency.format(Number.isFinite(value) ? value : 0);
  const clampNumber = (value, min = 0) => Math.max(min, Number(value) || 0);
  const byId = (id) => document.getElementById(id);
  const all = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  function initTheme() {
    const button = byId("themeToggle");
    const icon = byId("themeToggleIcon");
    if (!button || !icon) return;

    const applyTheme = (themeName) => {
      const isDeep = themeName === "deep";
      root.classList.toggle(THEME.deep.className, isDeep);
      icon.src = isDeep ? THEME.deep.icon : THEME.light.icon;
      button.setAttribute("aria-pressed", isDeep ? THEME.deep.pressed : THEME.light.pressed);
      localStorage.setItem(THEME_KEY, isDeep ? "deep" : "light");
    };

    applyTheme(localStorage.getItem(THEME_KEY) === "deep" ? "deep" : "light");
    button.addEventListener("click", () => {
      applyTheme(root.classList.contains(THEME.deep.className) ? "light" : "deep");
    });
  }

  function initSearch() {
    const openButton = byId("searchToggle");
    const overlay = byId("searchOverlay");
    const closeButton = byId("searchClose");
    const input = overlay?.querySelector("input[type='search']");
    if (!openButton || !overlay || !closeButton) return;

    const open = () => {
      overlay.hidden = false;
      overlay.classList.add("open");
      overlay.setAttribute("aria-hidden", "false");
      closeButton.focus();
    };

    const close = () => {
      overlay.classList.remove("open");
      overlay.setAttribute("aria-hidden", "true");
      overlay.hidden = true;
      openButton.focus();
    };

    openButton.addEventListener("click", open);
    closeButton.addEventListener("click", close);
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) close();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape" || overlay.hidden) return;
      close();
    });

    input?.addEventListener("keydown", (event) => {
      if (event.key === "Enter") event.preventDefault();
    });
  }

  function initDropdowns() {
    const closeDropdown = (dropdown) => {
      dropdown.classList.remove("open");
      dropdown.querySelector(".nav-drop-button")?.setAttribute("aria-expanded", "false");
    };

    const closeAllDropdowns = () => all(".nav-dropdown.open").forEach(closeDropdown);

    all(".nav-drop-button").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        const dropdown = button.closest(".nav-dropdown");
        if (!dropdown) return;

        const isOpen = dropdown.classList.contains("open");
        closeAllDropdowns();
        dropdown.classList.toggle("open", !isOpen);
        button.setAttribute("aria-expanded", isOpen ? "false" : "true");
      });
    });

    document.addEventListener("click", closeAllDropdowns);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeAllDropdowns();
    });
  }

  const dateKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const addDays = (date, days) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);

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

  function addHoliday(calendar, date, name, kind = "holiday") {
    const key = dateKey(date);
    calendar.set(key, [...(calendar.get(key) ?? []), { name, kind }]);
  }

  function addFixedHolidayWithObserved(calendar, year, monthIndex, dayOfMonth, name) {
    const actual = new Date(year, monthIndex, dayOfMonth);
    addHoliday(calendar, actual, name);

    const weekday = actual.getDay();
    const observed = weekday === 6 ? addDays(actual, 2) : weekday === 0 ? addDays(actual, 1) : null;
    if (observed) addHoliday(calendar, observed, `${name} observed`, "observed");
  }

  function bcRichmondHolidays(year) {
    const holidays = new Map();
    const birthdays = [
      [0, 9, "bob day"],
      [0, 10, "ant day"],
      [3, 19, "mario day"],
      [4, 29, "jus day"],
      [10, 29, "erp day"],
      [11, 17, "ame day"],
    ];

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

    birthdays.forEach(([month, day, name]) => addHoliday(holidays, new Date(year, month, day), name, "birthday"));
    return holidays;
  }

  function initCalendar() {
    const grid = byId("calendarGrid");
    const label = byId("calendarMonth");
    const prev = byId("prevMonth");
    const next = byId("nextMonth");
    if (!grid || !label || !prev || !next) return;

    let visibleDate = new Date();

    const render = () => {
      const year = visibleDate.getFullYear();
      const month = visibleDate.getMonth();
      const today = new Date();
      const holidays = bcRichmondHolidays(year);
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const fragment = document.createDocumentFragment();

      label.textContent = firstDay.toLocaleDateString("en-CA", { month: "long", year: "numeric" }).toLowerCase();
      grid.textContent = "";

      for (let index = 0; index < firstDay.getDay(); index += 1) {
        const empty = document.createElement("span");
        empty.className = "calendar-day empty";
        fragment.append(empty);
      }

      for (let day = 1; day <= lastDay.getDate(); day += 1) {
        const cellDate = new Date(year, month, day);
        const cell = document.createElement("button");
        const dayNumber = document.createElement("span");
        const dayHolidays = holidays.get(dateKey(cellDate)) ?? [];

        cell.type = "button";
        cell.className = "calendar-day";
        cell.setAttribute("role", "gridcell");
        cell.setAttribute("aria-label", cellDate.toLocaleDateString("en-CA", { dateStyle: "full" }));

        dayNumber.className = "calendar-day-number";
        dayNumber.textContent = String(day);
        cell.append(dayNumber);

        if (dayHolidays.length > 0) {
          cell.classList.add("has-holiday");
          cell.title = dayHolidays.map(({ name }) => name).join(", ");

          const holidayList = document.createElement("span");
          holidayList.className = "calendar-holiday-list";
          dayHolidays.forEach(({ name, kind }) => {
            const holiday = document.createElement("span");
            holiday.className = `calendar-holiday ${kind}`;
            holiday.textContent = name;
            holidayList.append(holiday);
          });
          cell.append(holidayList);
        }

        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
          cell.classList.add("today");
          cell.setAttribute("aria-current", "date");
        }

        fragment.append(cell);
      }

      grid.append(fragment);
    };

    prev.addEventListener("click", () => {
      visibleDate = new Date(visibleDate.getFullYear(), visibleDate.getMonth() - 1, 1);
      render();
    });
    next.addEventListener("click", () => {
      visibleDate = new Date(visibleDate.getFullYear(), visibleDate.getMonth() + 1, 1);
      render();
    });

    render();
  }

  function initSimpleSplit() {
    const totalInput = byId("splitTotal");
    const tipInput = byId("splitTip");
    const peopleInput = byId("splitPeople");
    const eachOutput = byId("splitEach");
    const detailsOutput = byId("splitDetails");
    if (!totalInput || !tipInput || !peopleInput || !eachOutput || !detailsOutput) return;

    const update = () => {
      const total = clampNumber(totalInput.value);
      const tip = total * (clampNumber(tipInput.value) / 100);
      const people = Math.max(1, Math.round(Number(peopleInput.value) || 1));
      const grandTotal = total + tip;

      peopleInput.value = String(people);
      eachOutput.textContent = money(grandTotal / people);
      detailsOutput.textContent = `${money(total)} + ${money(tip)} tip ÷ ${people}`;
    };

    [totalInput, tipInput, peopleInput].forEach((input) => input.addEventListener("input", update));
    update();
  }

  function initSplitModes() {
    const buttons = all("[data-split-mode]");
    const panels = all("[data-split-panel]");
    if (buttons.length === 0 || panels.length === 0) return;

    const setMode = (mode) => {
      buttons.forEach((button) => {
        const active = button.dataset.splitMode === mode;
        button.classList.toggle("active", active);
        button.setAttribute("aria-selected", String(active));
      });
      panels.forEach((panel) => {
        const active = panel.dataset.splitPanel === mode;
        panel.classList.toggle("active", active);
        panel.hidden = !active;
      });
    };

    buttons.forEach((button) => button.addEventListener("click", () => setMode(button.dataset.splitMode)));
  }

  function initAiErp() {
    const rows = byId("aiErpRows");
    if (!rows) return;

    const totals = {
      cost: byId("aiCostTotal"),
      gst: byId("aiGstTotal"),
      pst: byId("aiPstTotal"),
      other: byId("aiOtherTotal"),
      tip: byId("aiTipTotal"),
      grand: byId("aiErpGrandTotal"),
      large: byId("aiErpGrandTotalLarge"),
    };

    const rateInputs = {
      gst: byId("aiHeaderGst"),
      pst: byId("aiHeaderPst"),
      other: byId("aiHeaderOther"),
      tip: byId("aiHeaderTip"),
    };

    const readRates = () => ({
      gst: clampNumber(rateInputs.gst?.value) / 100,
      pst: clampNumber(rateInputs.pst?.value) / 100,
      other: clampNumber(rateInputs.other?.value) / 100,
      tip: clampNumber(rateInputs.tip?.value) / 100,
    });

    const writeText = (element, value) => {
      if (element) element.textContent = money(value);
    };

    const update = () => {
      const rates = readRates();
      const sums = { cost: 0, gst: 0, pst: 0, other: 0, tip: 0, grand: 0 };

      all("tr", rows).forEach((row) => {
        const cost = clampNumber(row.querySelector(".ai-cost")?.value);
        const values = {
          gst: cost * rates.gst,
          pst: cost * rates.pst,
          other: cost * rates.other,
          tip: cost * rates.tip,
        };
        const total = cost + values.gst + values.pst + values.other + values.tip;

        writeText(row.querySelector(".ai-gst-amount"), values.gst);
        writeText(row.querySelector(".ai-pst-amount"), values.pst);
        writeText(row.querySelector(".ai-other-amount"), values.other);
        writeText(row.querySelector(".ai-tip-amount"), values.tip);
        writeText(row.querySelector(".ai-row-total"), total);

        sums.cost += cost;
        sums.gst += values.gst;
        sums.pst += values.pst;
        sums.other += values.other;
        sums.tip += values.tip;
        sums.grand += total;
      });

      writeText(totals.cost, sums.cost);
      writeText(totals.gst, sums.gst);
      writeText(totals.pst, sums.pst);
      writeText(totals.other, sums.other);
      writeText(totals.tip, sums.tip);
      writeText(totals.grand, sums.grand);
      writeText(totals.large, sums.grand);
    };

    const applyColumnVisibility = (scope = document) => {
      all("[data-ai-col-toggle]").forEach((toggle) => {
        const column = toggle.dataset.aiColToggle;
        all(`[data-ai-col="${column}"]`, scope).forEach((cell) => {
          cell.classList.toggle("ai-col-hidden", !toggle.checked);
        });
      });
    };

    const createRow = () => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td data-ai-col="name"><input class="ai-name" type="text" aria-label="name"></td>
        <td data-ai-col="cost"><input class="ai-cost" type="number" min="0" step="0.01" value="0" aria-label="cost" inputmode="decimal"></td>
        <td data-ai-col="gst"><span class="ai-gst-amount">$0.00</span></td>
        <td data-ai-col="pst"><span class="ai-pst-amount">$0.00</span></td>
        <td data-ai-col="other"><span class="ai-other-amount">$0.00</span></td>
        <td data-ai-col="tip"><span class="ai-tip-amount">$0.00</span></td>
        <td data-ai-col="total"><strong class="ai-row-total">$0.00</strong></td>
        <td class="ai-action-col"><button class="ai-row-remove" type="button" aria-label="remove row">×</button></td>
      `;
      applyColumnVisibility(row);
      return row;
    };

    byId("addAiErpRow")?.addEventListener("click", () => {
      const row = createRow();
      rows.append(row);
      update();
      const firstInput = row.querySelector("input");
      firstInput?.focus({ preventScroll: true });
      row.scrollIntoView({ block: "nearest", inline: "nearest" });
    });

    rows.addEventListener("input", update);
    rows.addEventListener("click", (event) => {
      const removeButton = event.target.closest(".ai-row-remove");
      if (!removeButton || all("tr", rows).length <= 1) return;
      removeButton.closest("tr")?.remove();
      update();
    });

    Object.values(rateInputs).forEach((input) => input?.addEventListener("input", update));
    all("[data-ai-col-toggle]").forEach((toggle) => {
      toggle.addEventListener("change", () => applyColumnVisibility(document));
    });

    applyColumnVisibility(document);
    update();
  }

  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initSearch();
    initDropdowns();
    initCalendar();
    initSimpleSplit();
    initSplitModes();
    initAiErp();
  });
})();
