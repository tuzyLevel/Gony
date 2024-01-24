
from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session
from app.schemas.user import UserCreate, User


from app.models.user import crud
from app.database import get_db

router = APIRouter(
    prefix='/user'
)


@router.get('/{userId}')
def get_user(userId: str) -> User:
    return User(userId=userId)


@router.post('/')
def create_user(user: UserCreate, db: Session = Depends(get_db)):

    db_user = crud.get_user(db=db, user_id=user.id)

    if db_user:
        raise HTTPException(
            status_code=400, detail="Already registered user Id")
    return crud.create_user(db=db, user=user)
