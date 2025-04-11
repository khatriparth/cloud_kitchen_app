# app/schemas/main.py

from fastapi import FastAPI
from app.api import auth, user

app = FastAPI()

app.include_router(auth.router, prefix = "/api/auth")
app.include_router(user.router, prefix = "/api/user")

@app.get("/")
def home():
    return {"message": "Welcome to Cloud Kitchen API!"}