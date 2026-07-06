# SQRTL Multipage Placeholders

This version removes homepage hash navigation and creates real Flask pages.

## Pages

```text
/             Home
/gallery      Placeholder
/collections  Placeholder
/shared       Placeholder
/about        Placeholder
```

The placeholder pages say "Sorry, we’re not ready yet" and include Squirtle artwork.

## Why this fixes the issue

The previous links used URLs like `/#gallery`, which made the browser jump-scroll inside the homepage. These links now go to real pages instead.

## Copy into your existing repo

Copy these into your current project folder:

```text
app.py
templates/index.html
templates/placeholder.html
static/css/style.css
static/img/
```

## Commit and deploy

```powershell
cd C:\Users\Marcus\Documents\sqrtl-render-starter
git add .
git commit -m "Add multipage placeholders"
git push
```

Render should redeploy automatically.
