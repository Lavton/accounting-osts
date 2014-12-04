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
    parent = request.form.get('parent', "#")
    name = request.form.get('name', None)
    cat_type = request.form.get('type', None)
    summa = request.form.get('sum', None, type=int)
    opened = request.form.get('opened', False, type=bool)
    category = {
            "user": username,
            "indef": indef,
            "name": name,
            "parent": parent,
            "type": cat_type,
            "sum": summa,
            "opened": opened
            }
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
    if not d:
        default_data = {
        "gains": {
            "indef" : "gains",
            "parent" : "#",
            "name" : "Приобретения",
            "type" : "gains",
            "sum" : 0,
            "opened": True
        },
        "incomes": {
            "indef" : "incomes",
            "parent" : "#",
            "name" : "Доходы",
            "type" : "incomes",
            "sum" : 0,
            "opened"    : True 
        }}
        d = default_data
        for indef in default_data:
            category = {"user": get_user()}
            for cat_field in default_data[indef]:
                category[cat_field] = default_data[indef][cat_field]
            categories_db.insert(category)

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

    categories_db.update(req, {"$set": category})
    if "type" in request.form:
        categories_db.remove(req)
    return jsonify(result="Success")

