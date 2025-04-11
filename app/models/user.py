# app/models/user.py

from sqlalchemy import Column, Integer, String
from app.core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key = True, index = True)
    email = Column(String(50), unique = True, index = True)
    name = Column(String(50), nullable = False)
    phone_number = Column(String(10), unique = True, nullable = False)
    address = Column(String(200), nullable = False)
    hashed_password = Column(String, nullable = False)
