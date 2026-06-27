import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get values from .env
uri = os.getenv("MONGO_URI")
db_name = os.getenv("DB_NAME")

# Connect to MongoDB
client = MongoClient(uri)
db = client[db_name]

try:
    # Check connection
    client.server_info()
    print("✅ MongoDB se connection successful!")
except Exception as e:
    print("❌ Connection failed:", e)
