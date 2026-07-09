# sqrtl squad

A small Flask website for a cozy Squirtle Squad-themed friend space. The app has a landing page, placeholder gallery/collections/about pages, and two tools under **things**: a calendar and split calculator.

## Run locally

```bash
python -m venv .venv
source .venv/bin/activate  # Windows PowerShell: .\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python -m flask --app app run --debug
```

Open the local Flask URL, then check:

- `/`
- `/gallery`
- `/collections`
- `/about`
- `/things/calendar`
- `/things/split`

## Checks

```bash
python -m py_compile app.py
python -m pytest
node --check static/js/app.js
```

`pytest` is only needed for local development tests; the production app dependencies are listed in `requirements.txt`.

## Structure

```text
app.py                  Flask routes
render.yaml             Render deploy config
requirements.txt        Runtime Python dependencies
static/css/style.css    Main visual design
static/css/refactor-additions.css
static/js/app.js        Theme, search, nav, calendar, and split logic
static/img/             Images currently used by the site
templates/              Jinja page templates
tests/                  Route smoke tests
```
