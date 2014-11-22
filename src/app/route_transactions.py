#!/usr/bin/python3
from app import app
from app.route_login import requires_auth, get_user
from db import transactions_db
from flask import Flask, render_template, jsonify, session, redirect, url_for, escape, request


@app.route('/transaction', methods=['POST'])
@requires_auth
def transaction_post():
    username = get_user()
    indef = request.form.get('indef', None)
    fromIndef = request.form.get('from', None)
    fromClass = request.form.get('fromClass', None)
    toIndef = request.form.get('to', None)
    toClass = request.form.get('toClass', None)
    data = request.form.get('data', None)
    delta = request.form.get('delta', None, type=int)
    transaction = {"user": username,
            "indef": indef,
            "from": fromIndef,
            "fromClass": fromClass,
            "to": toIndef,
            "toClass": toClass,
            "delta": delta,
            "visible": 1,
            "data": data}
    if not indef:
        return jsonify(result="Fail")
    transactions_db.insert(transaction)
    return jsonify(result="Success")


@app.route('/transaction', methods=['GET'])
@requires_auth
def transaction_get():
    d = dict()
    for record in transactions_db.find({"user": get_user()}):
        record.pop("_id", None)
        d[record["indef"]] = record
    return jsonify(**d)


@app.route('/transaction', methods=['PUT'])
@requires_auth
def transaction_put():
    indef = request.form.get('indef', None)

    req = {"indef": indef}
    if not indef:
        return jsonify(result="Fail")
    transaction = {"user": get_user()}
    if "visible" in request.form:
        bill["visible"] = request.form.get("visible", type=int)

    bills_db.update(req, {"$set": bill})
    return jsonify(result="Success")

