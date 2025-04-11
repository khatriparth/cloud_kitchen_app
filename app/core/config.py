# from dotenv import load_dotenv
# import os

# load_dotenv()

# SECRET_KEY = os.getenv("SECRET_KEY")
# DATABASE_URL = os.getenv("DATABASE_URL")

from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    SECRET_KEY: str
    DATABASE_URL: str

    class Config:
        env_file = ".env"

settings = Settings()
