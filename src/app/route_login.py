from app import app
from db import users_db
from flask import render_template, jsonify, session, redirect, url_for, request
from functools import wraps


def is_user(username, password):
    req = {"user": username,
           "pass": password}
    
    for i in users_db.find(req):
        return True
    return False


def get_user():
    return session['username']


def requires_auth(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        if not 'username' in session:
            return redirect(url_for('login_get'))
        return func(*args, **kwargs)
    return decorated


@app.route('/login', methods=['GET'])
def login_get():
    return render_template("ind_tmp.html")


@app.route('/login', methods=['POST'])
def login_post():
    username = request.form.get('username')
    password = request.form.get('password')
    if is_user(username, password):
        session['username'] = username
        return jsonify(result="Success", username=username, password=password)
    return jsonify(result="Fail")


@app.route('/logout', methods=['GET', 'POST'])
def logout():
    session.pop('username', None)
    return redirect(url_for('index'))


app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'