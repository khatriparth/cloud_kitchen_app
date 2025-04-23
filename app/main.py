# app/main.py

from fastapi import FastAPI
from app.api import auth, user

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(auth.router, prefix = "/api/auth")
app.include_router(user.router, prefix = "/api/user")

@app.get("/")
def home():
    return {"message": "Welcome to Cloud Kitchen API!"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
