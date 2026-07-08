# sqrtl footer visibility fix

This patch fixes the footer/icon being clipped on the standard pages, without changing the current split/calendar long-page footer behavior.

## Apply

1. Unzip this package.
2. Copy `apply_footer_fix.py` into the root of your local `sqrtl` repo.
3. From the repo root, run:

```powershell
py apply_footer_fix.py
```

If `py` is not available, run:

```powershell
python apply_footer_fix.py
```

The script will:

- create `static/css/footer-fix.css`
- add a stylesheet link to `templates/base.html` after `refactor-additions.css`

## Check locally

```powershell
python app.py
```

Then check:

- `/`
- `/gallery`
- `/collections`
- `/about`
- `/things/calendar`
- `/things/split`

## Push

```powershell
git status
git diff
git add templates/base.html static/css/footer-fix.css
git commit -m "fix footer visibility on standard pages"
git push
```

## Manual option

If you do not want to run the script, copy `footer-fix.css` into `static/css/footer-fix.css`, then add this line in `templates/base.html` after the `refactor-additions.css` stylesheet link:

```html
<link rel="stylesheet" href="{{ url_for('static', filename='css/footer-fix.css') }}">
```
