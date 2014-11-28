#!/usr/bin/python3
from app import app
from app.route_login import requires_auth, get_user
from db import categories_db
from flask import Flask, render_template, jsonify, session, redirect, url_for, escape, request


@app.route('/category', methods=['POST'])
@requires_auth
def category_post():
    username = get_user()
    indef = request.form.get('indef', None)
    name = request.form.get('name', None)
    summa = request.form.get('sum', None, type=int)
    category = {"user": username,
            "indef": indef,
            "name": name,
            "visible": 1,
            "sum": summa}
    if not indef and not name and not summa:
        return jsonify(result="Fail")
    categories_db.insert(category)
    return jsonify(result="Success")

@app.route('/category', methods=['GET'])
@requires_auth
def category_get():
    d = dict()
    for record in categories_db.find({"user": get_user()}):
        record.pop("_id", None)
        d[record["indef"]] = record
    app.logger.debug(d)
    return jsonify(**d)


@app.route('/category', methods=['PUT'])
@requires_auth
def category_put():
    indef = request.form.get('indef', None)

    req = {"indef": indef}
    if not indef:
        return jsonify(result="Fail")
    category = {"user": get_user()}
    if "name" in request.form:
        category["name"] = request.form.get("name")
    if "sum" in request.form:
        category["sum"] = request.form.get("sum", type=int)
    if "visible" in request.form:
        category["visible"] = request.form.get("visible", type=int)

    categories_db.update(req, {"$set": category})
    return jsonify(result="Success")

