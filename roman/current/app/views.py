from app import app
from flask import render_template, flash, redirect

@app.route('/login', methods = ['GET', 'POST'])
def login():
    return render_template('index1.html')


@app.route('/')
@app.route('/index')
def index():
    user = { 'nickname': 'Miguel' } # выдуманный пользователь
    return render_template("index.html",
        title = 'Home',
        user = user)