# SQRTL Option B Final

This version applies the requested changes:

- Removes the feature dock that blocked the left-side button area.
- Replaces the small top-left and footer icons with a cuter custom Squirtle-style icon.
- Uses Option B for the main hero image: a circular water-portal frame.
- Adds working header functions:
  - Sun/moon button toggles a light/deep aquatic theme.
  - Search button opens a placeholder search overlay.
  - Profile button opens a simple placeholder dropdown, with no login system.
- Keeps the real pages:
  - `/`
  - `/gallery`
  - `/collections`
  - `/shared`
  - `/about`

## Copy into your existing repo

Copy these into your project:

```text
app.py
templates/index.html
templates/placeholder.html
static/css/style.css
static/js/app.js
static/img/
```

## Run locally

```powershell
cd C:\Users\Marcus\Documents\sqrtl-render-starter
.\.venv\Scripts\python.exe -m flask --app app run --debug
```

If `.venv` does not exist yet:

```powershell
py -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m flask --app app run --debug
```

## Deploy

```powershell
git add .
git commit -m "Apply Option B landing page updates"
git push
```

Render should redeploy automatically.
