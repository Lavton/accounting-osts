from pymongo import MongoClient

client = MongoClient()
db = client.app_db
bills_db = db.bills_db
users_db = db.users_db