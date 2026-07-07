# sqrtl things dropdown

this update replaces `shared` with a `things` dropdown.

## changed

- top nav now has `things`
- `things` dropdown includes:
  - `calendar`
  - `split`
- added `/things/calendar`
- added `/things/split`
- `/shared` redirects to `/things/calendar`
- calendar page has a cute monthly calendar
- split page has a cute bill splitter calculator

## copy into your repo

copy these into your current project:

```text
app.py
templates/index.html
templates/placeholder.html
templates/calendar.html
templates/split.html
static/css/style.css
static/js/app.js
```

## deploy

```powershell
cd C:\Users\Marcus\Documents\sqrtl-render-starter
git add .
git commit -m "add things dropdown calendar and split"
git push
```
