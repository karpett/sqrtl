from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calendar')
def calendar():
    return render_template('calendar.html')

@app.route('/split')
def split():
    return render_template('split.html')

@app.route('/trip')
def trip():
    return render_template('trip.html')

if __name__ == '__main__':
    app.run(debug=True)
