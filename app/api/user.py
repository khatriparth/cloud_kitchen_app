#app/api/user.py

from fastapi import APIRouter, Depends
from app.schemas.user import UserUpdate
from app.models.user import User
from app.core.dependencies import get_current_user
from app.core.database import SessionLocal
from app.core.security import hash_password
from sqlalchemy.orm import Session
from app.schemas.user import UserOut

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.put("/update")
def update_user(update: UserUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    user = db.query(User).filter(User.id == current_user.id).first()

    if update.email:
        user.email = update.email
    if update.phone_number:
        user.phone_number = update.phone_number
    if update.address:
        user.address = update.address
    if update.password:
        user.hashed_password = hash_password(update.password)

    db.commit()
    db.refresh(user)
    return user

@router.get("/profile", response_model=UserOut)
def get_profile(current_user: User = Depends(get_current_user)):
    return current_user