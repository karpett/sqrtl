from __future__ import annotations

from pathlib import Path

FOOTER_FIX_CSS = r'''/*
  Footer visibility fix for the standard sqrtl pages.

  The original theme locks most pages to a hidden 100vh viewport, while the
  refactor footer rules make the mascot footer taller and push the icon lower.
  Split/calendar opt into their own long-page footer behavior, so this file only
  adjusts the normal pages that use the shared base template.
*/

html:not(.split-page-html):not(.calendar-page-html),
html:not(.split-page-html):not(.calendar-page-html) body:not(.split-page-body):not(.calendar-page-body) {
  overflow-x: hidden !important;
  overflow-y: auto !important;
}

html:not(.split-page-html):not(.calendar-page-html) .app-frame:not(.tool-frame):not(.split-frame):not(.calendar-frame) {
  width: 100% !important;
  height: auto !important;
  min-height: max(100dvh, 680px) !important;
  overflow: hidden !important;
  padding-bottom: clamp(104px, 13vh, 148px) !important;
}

html:not(.split-page-html):not(.calendar-page-html) .app-frame:not(.tool-frame):not(.split-frame):not(.calendar-frame) .wave-footer {
  position: absolute !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  height: clamp(104px, 13vh, 144px) !important;
  min-height: 104px !important;
  margin: 0 !important;
  display: grid !important;
  place-items: center !important;
  overflow: visible !important;
  pointer-events: none !important;
}

html:not(.split-page-html):not(.calendar-page-html) .app-frame:not(.tool-frame):not(.split-frame):not(.calendar-frame) .wave-footer > img {
  width: clamp(58px, 6.2vh, 68px) !important;
  height: clamp(58px, 6.2vh, 68px) !important;
  transform: translateY(clamp(8px, 2vh, 22px)) !important;
}

@media (max-width: 900px) {
  html:not(.split-page-html):not(.calendar-page-html) .app-frame:not(.tool-frame):not(.split-frame):not(.calendar-frame) {
    min-height: 100dvh !important;
    padding-bottom: 128px !important;
  }
}
'''

LINK_LINE = '  <link rel="stylesheet" href="{{ url_for(\'static\', filename=\'css/footer-fix.css\') }}">'
AFTER_LINE = '  <link rel="stylesheet" href="{{ url_for(\'static\', filename=\'css/refactor-additions.css\') }}">'


def main() -> None:
    root = Path.cwd()
    base_html = root / "templates" / "base.html"
    css_dir = root / "static" / "css"
    css_file = css_dir / "footer-fix.css"

    if not base_html.exists():
        raise SystemExit(
            "Could not find templates/base.html. Run this script from the sqrtl repo root."
        )

    css_dir.mkdir(parents=True, exist_ok=True)
    css_file.write_text(FOOTER_FIX_CSS, encoding="utf-8")

    html = base_html.read_text(encoding="utf-8")
    if "css/footer-fix.css" not in html:
        if AFTER_LINE in html:
            html = html.replace(AFTER_LINE, AFTER_LINE + "\n" + LINK_LINE, 1)
        else:
            # Fallback: put it after style.css so it can override the base styles.
            style_line = '  <link rel="stylesheet" href="{{ url_for(\'static\', filename=\'css/style.css\') }}">'
            if style_line not in html:
                raise SystemExit(
                    "Could not find the stylesheet links in templates/base.html. "
                    "Add this line manually before </head>:\n" + LINK_LINE
                )
            html = html.replace(style_line, style_line + "\n" + LINK_LINE, 1)
        base_html.write_text(html, encoding="utf-8")

    print("Footer fix applied:")
    print("- static/css/footer-fix.css")
    print("- templates/base.html link inserted, if it was not already present")
    print("\nRun your site and check /, /gallery, /collections, /about, /things/calendar, and /things/split.")


if __name__ == "__main__":
    main()
