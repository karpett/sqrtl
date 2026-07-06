# SQRTL Exact Landing Theme

This version rebuilds the site as a one-screen landing page inspired by the provided reference image.

## Goal

- Fit on one screen without scrolling on normal laptop/desktop screens.
- Use the exact Squirtle artwork pulled from the provided HD reference image.
- Keep the elegant aquatic glass UI.
- Include a footer/wave area.
- Keep the project ready for Render + Python/Flask.

## Files to copy into your existing repo

Copy these folders/files into your existing local GitHub repo:

```text
app.py
requirements.txt
render.yaml
templates/index.html
static/css/style.css
static/img/
```

## Run locally

```powershell
cd C:\Users\Marcus\Documents\sqrtl-render-starter
py -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m flask --app app run --debug
```

Open:

```text
http://127.0.0.1:5000
```

## Deploy

```powershell
git add .
git commit -m "Rebuild landing page to match HD reference"
git push
```
