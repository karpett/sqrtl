# sqrtl refactor package

This package keeps the current visual classes and image paths, but removes repeated template markup and makes JavaScript initialize only the features present on the current page.

## Copy order

1. Copy `app.py` over your current `app.py`.
2. Copy all files in `templates/` over your current `templates/` folder. This adds `base.html`.
3. Copy `static/js/app.js` over your current `static/js/app.js`.
4. Copy `static/css/refactor-additions.css` into `static/css/`.
5. Copy `static/img/tax-fact-icon.png` into `static/img/`.
6. Keep your existing `static/css/style.css` and all other files in `static/img/`.

## Test locally

```bash
python -m pip install -r requirements.txt
python -m flask --app app run --debug
```

Optional dev tests after installing pytest:

```bash
python -m pytest
node --check static/js/app.js
python -m py_compile app.py
```

## What changed

- Added `templates/base.html` for shared `<head>`, navigation, theme toggle, search modal, and footer.
- Reduced page templates to content-only templates.
- Preserved existing CSS classes so the UI should remain visually consistent.
- Added keyboard/focus improvements, `aria-current`, tab panel `hidden` state, search overlay state, and reduced-motion support.
- Rebuilt `static/js/app.js` as isolated initializers for theme, search, nav dropdown, calendar, easy split, mode switch, ai-erp receipt matcher, and AI-ERP Canada tax facts.
- Added the circular tax-fact icon beside the split mode toggle while AI-ERP is active.
- Added 200 unique Canada tax facts that rotate randomly without repeating until the list resets.
- Changed footer icon styling so the icon overlays the footer instead of stacking above it.
