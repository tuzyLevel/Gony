from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import sessionmaker

from starlette.config import Config


config = Config("app/.env")

DB_URL = config("DATABASE_URL")


engine = create_engine(DB_URL, pool_size=10,
                       max_overflow=2,
                       pool_recycle=300,
                       pool_pre_ping=True,
                       pool_use_lifo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()
