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

  const CANADA_TAX_FACTS = [
    "GST stands for Goods and Services Tax.",
    "HST stands for Harmonized Sales Tax.",
    "PST often means Provincial Sales Tax in western provinces.",
    "QST stands for Quebec Sales Tax.",
    "Canada's federal GST rate is 5%.",
    "British Columbia usually shows GST and PST as separate receipt lines.",
    "British Columbia's general PST rate is 7%.",
    "Alberta has GST but no general provincial sales tax.",
    "Yukon has GST but no general territorial sales tax.",
    "Nunavut has GST but no general territorial sales tax.",
    "Northwest Territories has GST but no general territorial sales tax.",
    "Ontario uses HST instead of separate GST and PST.",
    "Ontario's HST rate is 13%.",
    "Nova Scotia's HST rate is 14%.",
    "New Brunswick's HST rate is 15%.",
    "Newfoundland and Labrador's HST rate is 15%.",
    "Prince Edward Island's HST rate is 15%.",
    "Saskatchewan has GST plus a separate PST.",
    "Saskatchewan's general PST rate is 6%.",
    "Manitoba has GST plus a separate retail sales tax.",
    "Manitoba's general retail sales tax rate is 7%.",
    "Quebec has GST plus QST.",
    "Quebec's QST rate is 9.975%.",
    "In Quebec, QST is calculated on the price before GST.",
    "HST combines federal GST with a provincial sales tax portion.",
    "GST applies in every province and territory.",
    "A province with HST does not usually show a separate GST line.",
    "A receipt in BC can show GST even when PST is zero.",
    "A receipt in Alberta usually shows only GST for ordinary sales tax.",
    "Canadian sales tax rates can depend on delivery destination.",
    "For shipped goods, place-of-supply rules can change the tax rate.",
    "A BC seller shipping to Ontario may charge Ontario HST.",
    "Sales tax is often added at checkout in Canada.",
    "Shelf prices in Canada often exclude GST, HST, PST, or QST.",
    "Restaurant bills commonly show tax before the tip line.",
    "Tips are usually calculated separately from government sales taxes.",
    "GST launched in Canada in 1991.",
    "The GST replaced the old federal manufacturers' sales tax.",
    "The federal GST was once 7%.",
    "The federal GST dropped to 6% in 2006.",
    "The federal GST dropped to 5% in 2008.",
    "British Columbia used HST for a short period before returning to PST.",
    "BC returned from HST to separate GST and PST in 2013.",
    "Alberta is unusual because it has no general provincial sales tax.",
    "The territories are unusual because they have no general territorial sales tax.",
    "HST rates are not identical across HST provinces.",
    "Nova Scotia's HST rate decreased to 14% in 2025.",
    "A business may need to register for GST/HST after passing the small-supplier threshold.",
    "Small suppliers can sometimes avoid GST/HST registration until they exceed the threshold.",
    "Input tax credits let many registrants recover GST/HST paid on business inputs.",
    "Exempt supplies are different from zero-rated supplies.",
    "Zero-rated supplies are taxable at 0% for GST/HST purposes.",
    "Basic groceries are often zero-rated for GST/HST.",
    "Many prescription drugs are zero-rated for GST/HST.",
    "Some medical devices are zero-rated for GST/HST.",
    "Residential rent is generally exempt from GST/HST.",
    "Many health-care services are exempt from GST/HST.",
    "Many educational services are exempt from GST/HST.",
    "Many financial services are exempt from GST/HST.",
    "Most property and services supplied by charities can be GST/HST exempt.",
    "Used goods donated to charities can be GST/HST exempt when sold by the charity.",
    "Businesses collect GST/HST on behalf of the government.",
    "Collected GST/HST is not the business's revenue.",
    "PST rules can differ sharply by province.",
    "BC PST is separate from federal GST.",
    "BC PST applies to many goods and some services.",
    "BC PST can apply to software.",
    "BC PST can apply to telecommunication services.",
    "BC PST can apply to accommodation in specific situations.",
    "Some BC goods are PST-exempt even when GST applies.",
    "Children's clothing can receive special PST treatment in BC.",
    "Bicycles and e-bikes can have special provincial sales tax rules.",
    "Restaurant meals in BC commonly have GST but not general PST.",
    "Alcohol in BC can have special tax treatment beyond regular GST/PST.",
    "Tobacco products can carry taxes beyond ordinary sales tax.",
    "Fuel in Canada can carry excise or carbon-related charges in addition to sales tax.",
    "Airline tickets can include several taxes, fees, and charges.",
    "Canada has an Air Travellers Security Charge.",
    "Luxury vehicles and aircraft can be affected by Canada's luxury tax.",
    "Certain boats can be affected by Canada's luxury tax.",
    "Canada has excise duties on some alcohol products.",
    "Canada has excise duties on tobacco products.",
    "Cannabis products can include excise duties.",
    "Canadian income tax is progressive.",
    "Progressive tax means higher brackets apply only to higher slices of income.",
    "Canada has federal income tax brackets.",
    "Each province and territory also has its own income tax brackets.",
    "Your province of residence on December 31 often determines provincial income tax.",
    "Federal and provincial taxes are calculated separately on personal returns.",
    "Non-refundable tax credits reduce tax payable, not taxable income.",
    "Refundable tax credits can create a payment even when tax payable is zero.",
    "The basic personal amount is a non-refundable credit.",
    "Employment income usually has tax withheld at source.",
    "Payroll tax deductions can include income tax, CPP, and EI.",
    "CPP stands for Canada Pension Plan.",
    "EI stands for Employment Insurance.",
    "A Notice of Assessment summarizes CRA's assessment of a filed return.",
    "A Notice of Reassessment updates an earlier tax assessment.",
    "CRA's NETFILE system is used to file many personal returns online.",
    "EFILE is used by many authorized tax preparers.",
    "Most Canadian personal tax returns are due April 30.",
    "Self-employed individuals often have a June 15 filing deadline.",
    "A balance owing is generally due April 30 even for many self-employed filers.",
    "Instalment payments can apply when not enough tax is withheld during the year.",
    "Tax refunds are not bonuses; they are overpaid tax coming back.",
    "Direct deposit usually makes CRA payments arrive faster.",
    "CRA can pay interest on some late refunds.",
    "CRA can charge interest on overdue balances.",
    "Penalties can apply for repeated late filing.",
    "Keeping receipts matters because CRA can ask for support later.",
    "Electronic records can be acceptable if they are readable and complete.",
    "Self-employed people can deduct reasonable business expenses.",
    "Business-use-of-home expenses require a business connection to the home workspace.",
    "Vehicle expenses often require a mileage log.",
    "Capital cost allowance is Canada's tax depreciation system.",
    "CCA stands for Capital Cost Allowance.",
    "Some assets are grouped into CCA classes.",
    "A business may choose not to claim full CCA in a year.",
    "Losses can sometimes be carried to other years.",
    "Capital gains are taxed differently from regular income.",
    "Only part of a capital gain is generally included in taxable income.",
    "Capital losses usually apply against capital gains, not employment income.",
    "The principal residence exemption can reduce tax on a home sale.",
    "Selling a principal residence still has reporting requirements.",
    "Rental income must usually be reported on a tax return.",
    "Short-term rentals can create income tax and sales tax questions.",
    "RRSP stands for Registered Retirement Savings Plan.",
    "RRSP contributions can reduce taxable income.",
    "RRSP withdrawals are generally taxable income.",
    "RRSP room is based partly on earned income from prior years.",
    "Unused RRSP room can carry forward.",
    "The first 60 days of a year can count for the previous year's RRSP deduction.",
    "Overcontributing to an RRSP can trigger a monthly tax.",
    "TFSA stands for Tax-Free Savings Account.",
    "TFSA contributions are not tax deductible.",
    "TFSA investment income is generally tax-free.",
    "TFSA withdrawals are generally tax-free.",
    "TFSA withdrawals usually create new contribution room the following year.",
    "Overcontributing to a TFSA can trigger a monthly tax.",
    "FHSA stands for First Home Savings Account.",
    "FHSA contributions can be deductible within limits.",
    "FHSA withdrawals can be tax-free when used for a qualifying home purchase.",
    "RESP stands for Registered Education Savings Plan.",
    "RESPs can receive government education savings grants.",
    "RDSP stands for Registered Disability Savings Plan.",
    "RDSPs can receive government grants and bonds for eligible beneficiaries.",
    "Pension income splitting can affect tax for eligible couples.",
    "Charitable donations can create donation tax credits.",
    "Political contributions can create special tax credits.",
    "Medical expenses can create tax credits when they exceed a threshold.",
    "Tuition amounts can create non-refundable tax credits.",
    "Unused tuition credits can sometimes be carried forward.",
    "Student loan interest can create a federal tax credit.",
    "Child care expenses are deductions, not credits, in many cases.",
    "Moving expenses can be deductible in limited situations.",
    "Union dues and professional dues can sometimes be deductible.",
    "Employment expenses usually require employer certification.",
    "The T2200 form supports some employee expense claims.",
    "The GST/HST credit is paid tax-free to eligible individuals and families.",
    "GST/HST credit eligibility is based partly on family net income.",
    "The Canada Child Benefit is tax-free.",
    "The Canada Child Benefit is income-tested.",
    "The Canada Workers Benefit supports eligible lower-income workers.",
    "The disability tax credit is a non-refundable credit.",
    "DTC approval can unlock access to other programs.",
    "Provincial credits can be delivered through the federal tax system.",
    "Registered charities must meet CRA requirements to issue official donation receipts.",
    "A donation receipt needs specific information to support a tax credit.",
    "Gifts of publicly traded securities can have special donation tax treatment.",
    "Volunteer time is not usually receipted as a charitable donation.",
    "Tax software often asks for a province because rates differ across Canada.",
    "Canada's tax year for individuals is usually the calendar year.",
    "Corporations can have fiscal years that do not match the calendar year.",
    "A corporation is a separate taxpayer from its shareholders.",
    "Small Canadian-controlled private corporations can access a small business deduction.",
    "CCPC stands for Canadian-controlled private corporation.",
    "Dividends are taxed differently from salary.",
    "GST/HST account numbers are connected to a business number.",
    "A business number is often shortened to BN.",
    "Payroll accounts, GST/HST accounts, and corporate tax accounts can share a BN root.",
    "Sole proprietors report business income on their personal tax return.",
    "Tipping out coworkers can make receipt math more interesting than tax math.",
    "A receipt total can differ from menu math because of rounding.",
    "Canada rounds cash payments to the nearest five cents when pennies are not used.",
    "Electronic payments can still charge the exact cent amount.",
    "Canada stopped distributing pennies in 2013.",
    "Rounding cash totals happens after tax is calculated, not before each item.",
    "Different items on the same receipt can have different tax treatments.",
    "A grocery receipt can mix taxable, zero-rated, and exempt-looking items.",
    "A restaurant receipt can be easier to split when taxes are separated by row.",
    "Some coupons reduce the tax base; others can be treated differently.",
    "Refunds can include reversing tax originally charged.",
    "Gift cards are usually taxed when used, not when purchased.",
    "Deposits can have special GST/HST timing rules.",
    "Tax-inclusive pricing means the tax is already inside the displayed price.",
    "Tax-exclusive pricing means tax is added on top of the displayed price.",
    "Canadian receipts often show the seller's GST/HST registration number.",
    "A valid tax invoice helps businesses support input tax credits.",
    "Tax rules can change, so old receipts can be tiny history lessons.",
    "Canada has both direct taxes like income tax and indirect taxes like sales tax."
];

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
    const factWidget = byId("taxFactWidget");
    const factBubble = byId("taxFactBubble");
    const factButton = byId("taxFactButton");
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

      if (!factWidget) return;

      const showFacts = mode === "ai-erp";
      factWidget.hidden = !showFacts;
      if (!showFacts) {
        if (factBubble) factBubble.hidden = true;
        factButton?.setAttribute("aria-expanded", "false");
      }
    };

    buttons.forEach((button) => button.addEventListener("click", () => setMode(button.dataset.splitMode)));
    setMode(buttons.find((button) => button.classList.contains("active"))?.dataset.splitMode ?? "ez");
  }

  function initTaxFacts() {
    const button = byId("taxFactButton");
    const bubble = byId("taxFactBubble");
    const text = byId("taxFactText");
    if (!button || !bubble || !text) return;

    let remaining = [];

    const nextFact = () => {
      if (remaining.length === 0) {
        remaining = [...CANADA_TAX_FACTS];
      }

      const index = Math.floor(Math.random() * remaining.length);
      const [fact] = remaining.splice(index, 1);
      return `did you know, ${fact}`;
    };

    button.addEventListener("click", (event) => {
      event.stopPropagation();
      text.textContent = nextFact();
      bubble.hidden = false;
      button.setAttribute("aria-expanded", "true");
    });

    document.addEventListener("click", (event) => {
      if (bubble.hidden || event.target.closest(".tax-fact-widget")) return;
      bubble.hidden = true;
      button.setAttribute("aria-expanded", "false");
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape" || bubble.hidden) return;
      bubble.hidden = true;
      button.setAttribute("aria-expanded", "false");
      button.focus();
    });
  }

  function initAiErp() {
    const rows = byId("aiErpRows");
    if (!rows) return;

    const optionalColumns = ["gst", "pst", "other", "tip"];
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

    const columnTitles = {
      gst: byId("aiGstColumnTitle"),
      pst: byId("aiPstColumnTitle"),
      other: byId("aiOtherColumnTitle"),
      tip: byId("aiTipColumnTitle"),
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

    const formatPercent = (value) => {
      const rate = clampNumber(value);
      return Number.isInteger(rate) ? String(rate) : rate.toFixed(2).replace(/\.?0+$/, "");
    };

    const updateColumnTitles = () => {
      optionalColumns.forEach((column) => {
        if (columnTitles[column]) {
          columnTitles[column].textContent = `${column} (${formatPercent(rateInputs[column]?.value)}%)`;
        }
      });
    };

    const columnToggle = (column) => document.querySelector(`[data-ai-col-toggle="${column}"]`);
    const isIncluded = (column) => columnToggle(column)?.checked ?? true;

    const setColumnVisibility = (column, visible, scope = document) => {
      all(`[data-ai-col="${column}"]`, scope).forEach((cell) => {
        cell.hidden = !visible;
      });

      if (scope === document) {
        const col = document.querySelector(`.ai-erp-table col[data-ai-col="${column}"]`);
        if (col) col.style.display = visible ? "" : "none";
      }
    };

    const applyColumnVisibility = (scope = document) => {
      optionalColumns.forEach((column) => setColumnVisibility(column, isIncluded(column), scope));
    };

    const update = () => {
      applyColumnVisibility(document);
      updateColumnTitles();

      const rates = readRates();
      const included = Object.fromEntries(optionalColumns.map((column) => [column, isIncluded(column)]));
      const sums = { cost: 0, gst: 0, pst: 0, other: 0, tip: 0, grand: 0 };

      all("tr", rows).forEach((row) => {
        const cost = clampNumber(row.querySelector(".ai-cost")?.value);
        const values = {
          gst: cost * rates.gst,
          pst: cost * rates.pst,
          other: cost * rates.other,
          tip: cost * rates.tip,
        };
        const selectedExtras = optionalColumns.reduce(
          (sum, column) => sum + (included[column] ? values[column] : 0),
          0,
        );
        const rowTotal = cost + selectedExtras;

        writeText(row.querySelector(".ai-gst-amount"), values.gst);
        writeText(row.querySelector(".ai-pst-amount"), values.pst);
        writeText(row.querySelector(".ai-other-amount"), values.other);
        writeText(row.querySelector(".ai-tip-amount"), values.tip);
        writeText(row.querySelector(".ai-row-total"), rowTotal);

        sums.cost += cost;
        optionalColumns.forEach((column) => {
          sums[column] += included[column] ? values[column] : 0;
        });
        sums.grand += rowTotal;
      });

      writeText(totals.cost, sums.cost);
      writeText(totals.gst, sums.gst);
      writeText(totals.pst, sums.pst);
      writeText(totals.other, sums.other);
      writeText(totals.tip, sums.tip);
      writeText(totals.grand, sums.grand);
      writeText(totals.large, sums.grand);
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
    all("[data-ai-col-toggle]").forEach((toggle) => toggle.addEventListener("change", update));

    update();
  }

  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initSearch();
    initDropdowns();
    initCalendar();
    initSimpleSplit();
    initSplitModes();
    initTaxFacts();
    initAiErp();
  });
})();
