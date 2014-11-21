from flask import Flask, render_template

app = Flask(__name__)

from app import route_login
from app import route_bills
from app import route_transactions
from app.route_login import requires_auth


@app.route('/')
@app.route('/index')
@requires_auth
def index():
    return render_template("index.html")
