
# from enum import Enum
from fastapi import FastAPI
# from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware


from starlette.config import Config

# from pydantic_settings import BaseSettings, SettingsConfigDict
# from typing_extensions import Annotated

# from .models import
from app.database import Base, engine
from .routers.index import router


# Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)
# Base.metadata.reflect(bind=engine)


# Set .env file to config

config = Config('.env')


# Set FastAPI
app = FastAPI()

# Set cors
origins = [
    "*"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get('/hello')
async def hello():
    return config('NAME_OF_PROJECT')


app.include_router(router)
