# app/core/create_db.py

# from app.core.database import Base, engine
# from app.models.user import User

# print("BEEP! BOOP! Creating database...")
# Base.metadata.create_all(bind=engine)
# print("Database created. YIPPEE!")

from app.core.database import Base, engine
Base.metadata.create_all(bind=engine)