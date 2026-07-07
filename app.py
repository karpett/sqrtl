from flask import Flask, render_template, redirect, url_for

app = Flask(__name__)

PLACEHOLDER_PAGES = {
    "gallery": {
        "title": "gallery",
        "kicker": "photo space",
        "message": "soon this will become your squad gallery with albums, tags, search, and shared memories.",
    },
    "collections": {
        "title": "collections",
        "kicker": "organize together",
        "message": "soon this will hold shared links, files, trip ideas, plans, and friend-group collections.",
    },
    "about": {
        "title": "about",
        "kicker": "about sqrtl",
        "message": "soon this page will explain what sqrtl is, who it is for, and how the squad space works.",
    },
}

@app.route("/")
def home():
    return render_template("index.html", active_page="home")

@app.route("/gallery")
def gallery():
    return render_template("placeholder.html", active_page="gallery", page=PLACEHOLDER_PAGES["gallery"])

@app.route("/collections")
def collections():
    return render_template("placeholder.html", active_page="collections", page=PLACEHOLDER_PAGES["collections"])

@app.route("/shared")
def shared():
    return redirect(url_for("calendar_page"))

@app.route("/things/calendar")
def calendar_page():
    return render_template("calendar.html", active_page="things")

@app.route("/things/split")
def split_page():
    return render_template("split.html", active_page="things")

@app.route("/about")
def about():
    return render_template("placeholder.html", active_page="about", page=PLACEHOLDER_PAGES["about"])

@app.route("/health")
def health():
    return {"status": "ok"}
