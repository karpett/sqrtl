# sqrtl icon replacement + no preview gallery

this patch makes two changes:

- replaces the current site icon/logo images with the new squirtle sunglasses icon
- removes the `preview gallery` button from the placeholder/sub pages

## copy into your repo

copy these files into your current project:

```text
templates/index.html
templates/placeholder.html
static/css/style.css
static/img/cool-squirtle-icon.png
```

## deploy

```powershell
cd C:\Users\Marcus\Documents\sqrtl-render-starter
git add .
git commit -m "replace icons and remove preview gallery button"
git push
```
