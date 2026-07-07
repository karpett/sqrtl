# sqrtl things vertical scroll layout

this patch changes the `things` app pages so they can be longer and scroll naturally.

## changed

- calendar/split pages are no longer restricted to a short fixed-height panel
- title, subtitle, and text sit at the top
- the app sits directly underneath the text
- calendar and split app areas now take the full width of the panel
- footer moves naturally below the content instead of forcing everything into one screen

## copy into your repo

copy this file into your current project:

```text
static/css/style.css
```

## deploy

```powershell
cd C:\Users\Marcus\Documents\sqrtl-render-starter
git add .
git commit -m "make things app pages scroll vertically"
git push
```
