from pydantic import BaseModel, EmailStr, Field, field_validator
from pydantic_core.core_schema import ValidationInfo
from typing import Optional

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    phone_number: str
    address: str
    password: str = Field(min_length=8)
    confirm_password: str

    @field_validator("confirm_password")
    def passwords_match(cls, v, info: ValidationInfo):
        password = info.data.get("password")
        if password and v != password:
            raise ValueError("Passwords do not match")
        return v

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    phone_number: Optional[str] = None
    address: Optional[str] = None
    password: Optional[str] = None

class UserInDB(BaseModel):
    id: int
    name: str
    email: EmailStr
    phone_number: str
    address: str
    hashed_password: str

    class Config:
        from_attributes = True

class User(BaseModel):
    id: int
    name: str
    email: EmailStr
    phone_number: str
    address: str

    class Config:
        from_attributes = True
