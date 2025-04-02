from pydantic import BaseModel, EmailStr, Field

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    address: str
    password: str = Field(min_length=8)
    repeat_password: str
