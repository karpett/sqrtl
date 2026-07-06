# SQRTL Render HD Theme

Python/Flask starter for `sqrtl.org`, updated to use the generated HD SQRTL/Squirtle-style artwork as the default theme.

## Files changed

- `templates/index.html`
- `static/css/style.css`
- `static/img/squirtle-landing-hd.png`
- `static/img/squirtle-dashboard-hd.png`

## Local setup

```bash
py -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m flask --app app run --debug
```

Open:

```text
http://127.0.0.1:5000
```

## Deploy updates

After copying these files into your existing repo:

```bash
git add .
git commit -m "Set HD Squirtle theme as default"
git push
```

Render should redeploy automatically.
