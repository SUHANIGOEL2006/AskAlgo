from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from pymongo import MongoClient
from backend.app.model_engine import get_answer
from dotenv import load_dotenv
import os

# ✅ Load environment variables
load_dotenv()

# ✅ Initialize app
app = FastAPI()

# ✅ Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ MongoDB connection (from .env)
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["ask_algo_db"]
users_collection = db["users"]

# ✅ Models
class QuestionRequest(BaseModel):
    question: str

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    
print("🟢 [DEBUG] Pydantic models loaded")

# ✅ Chatbot route
@app.post("/ask")
def ask_question(request: QuestionRequest):
    answer = get_answer(request.question)
    return {"answer": answer}

# ✅ Signup route
# ✅ Signup route (with debug prints)
@app.post("/signup")
def signup(user: UserCreate):
    print("🟡 [DEBUG] /signup route hit!")  # 1️⃣ Route hit hua

    # Check if email already exists
    print("🟢 [DEBUG] Checking if email exists in DB...")
    existing_user = users_collection.find_one({"email": user.email})
    if existing_user:
        print("🔴 [DEBUG] Email already registered:", user.email)
        raise HTTPException(status_code=400, detail="Email already registered")

    # Insert new user
    print("🟢 [DEBUG] Inserting new user into MongoDB...")
    new_user = dict(user)
    result = users_collection.insert_one(new_user)

    print("🟢 [DEBUG] Insert result:", result.inserted_id)
    new_user["_id"] = str(result.inserted_id)
    print("✅ [DEBUG] User registered successfully!")

    return {"message": "User registered successfully", "user": new_user}
