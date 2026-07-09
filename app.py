from __future__ import annotations

from dataclasses import dataclass

from flask import Flask, redirect, render_template, url_for


@dataclass(frozen=True)
class PlaceholderPage:
    title: str
    kicker: str
    message: str


PLACEHOLDER_PAGES: dict[str, PlaceholderPage] = {
    "gallery": PlaceholderPage(
        title="gallery",
        kicker="photo space",
        message=(
            "soon this will become your squad gallery with albums, tags, "
            "search, and shared memories."
        ),
    ),
    "collections": PlaceholderPage(
        title="collections",
        kicker="organize together",
        message=(
            "soon this will hold shared links, files, trip ideas, plans, "
            "and friend-group collections."
        ),
    ),
    "about": PlaceholderPage(
        title="about",
        kicker="about sqrtl",
        message=(
            "soon this page will explain what sqrtl is, who it is for, "
            "and how the squad space works."
        ),
    ),
}

app = Flask(__name__)


@app.get("/", endpoint="home_page")
def home_page():
    return render_template("index.html", active_page="home")


@app.get("/gallery")
def gallery():
    return render_placeholder("gallery")


@app.get("/collections")
def collections():
    return render_placeholder("collections")


@app.get("/shared")
def shared():
    return redirect(url_for("calendar_page"), code=302)


@app.get("/things/calendar")
def calendar_page():
    return render_template("calendar.html", active_page="things")


@app.get("/things/split")
def split_page():
    return render_template("split.html", active_page="things")


@app.get("/about")
def about():
    return render_placeholder("about")


@app.get("/health")
def health():
    return {"status": "ok"}


def render_placeholder(page_key: str):
    page = PLACEHOLDER_PAGES[page_key]
    return render_template("placeholder.html", active_page=page_key, page=page)


if __name__ == "__main__":
    app.run(debug=True)
