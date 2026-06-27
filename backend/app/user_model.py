from pydantic import BaseModel, EmailStr
from typing import Optional

# Input validation model for signup/login requests
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

# Model for user data stored in DB (with ID)
class UserInDB(UserCreate):
    id: Optional[str] = None
