from pymongo import MongoClient

client = MongoClient()
db = client.app_db
bills_db = db.bills_db
categories_db = db.categories_db
users_db = db.users_db
transactions_db = db.transactions_db