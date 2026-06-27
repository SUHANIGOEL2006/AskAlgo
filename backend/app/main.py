from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from backend.app.model_engine import get_answer
#from dotenv import load_dotenv
#import os

# ✅ Load environment variables
#load_dotenv()

# ✅ Initialize app
app = FastAPI()

# ✅ Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://ask-algo.vercel.app"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Models
class QuestionRequest(BaseModel):
    question: str

    
print("🟢 [DEBUG] Pydantic models loaded")

# ✅ Chatbot route
@app.post("/ask")
def ask_question(request: QuestionRequest):
    answer = get_answer(request.question)
    return {"answer": answer}

