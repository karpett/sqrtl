# SQRTL Render Starter

A Python/Flask starter landing page for `sqrtl.org`.

## Local setup

```bash
python -m venv .venv
```

Windows PowerShell:

```bash
.venv\Scripts\Activate.ps1
```

If PowerShell blocks scripts, use:

```bash
.venv\Scripts\python.exe -m pip install -r requirements.txt
.venv\Scripts\python.exe app.py
```

Mac/Linux:

```bash
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run locally:

```bash
flask --app app run --debug
```

Then open:

```text
http://127.0.0.1:5000
```

## Render settings

- Runtime: Python 3
- Build command: `pip install -r requirements.txt`
- Start command: `gunicorn app:app`
- Free plan is okay for testing, but it can sleep after inactivity.
