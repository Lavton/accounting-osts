#!/usr/bin/python3
from app import app
from app.route_login import requires_auth, get_user
from db import bills_db
from flask import Flask, render_template, jsonify, session, redirect, url_for, escape, request


@app.route('/bill', methods=['POST'])
@requires_auth
def bill_post():
    username = get_user()
    indef = request.form.get('indef', None)
    name = request.form.get('name', None)
    summa = request.form.get('sum', None, type=int)
    bill = {"user": username,
            "indef": indef,
            "name": name,
            "visible": 1,
            "sum": summa}
    if not indef and not name and not summa:
        return jsonify(result="Fail")
    bills_db.insert(bill)
    return jsonify(result="Success")

@app.route('/bill', methods=['GET'])
@requires_auth
def bills_get():
    d = dict()
    for record in bills_db.find({"user": get_user()}):
        record.pop("_id", None)
        d[record["indef"]] = record
    app.logger.debug(d)
    return jsonify(**d)


@app.route('/bill', methods=['PUT'])
@requires_auth
def bill_put():
    indef = request.form.get('indef', None)

    req = {"indef": indef}
    if not indef:
        return jsonify(result="Fail")
    bill = {"user": get_user()}
    if "name" in request.form:
        bill["name"] = request.form.get("name")
    if "sum" in request.form:
        bill["sum"] = request.form.get("sum", type=int)
    if "visible" in request.form:
        bill["visible"] = request.form.get("visible", type=int)

    bills_db.update(req, {"$set": bill})
    return jsonify(result="Success")

