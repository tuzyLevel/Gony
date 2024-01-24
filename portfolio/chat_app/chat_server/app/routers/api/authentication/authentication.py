from fastapi import APIRouter, Form, Depends, HTTPException, status
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app.utils.encrytions.encrytion import get_hashed_password

from app.models.user import crud as user_crud
from app.models.token import crud as token_crud
from app.database import get_db


from app.schemas.user import UserLogin, UserInDB

from app.utils.encrytions.encrytion import generate_token, authenticate_token


router = APIRouter()


@router.post("/login")
async def login(user: UserLogin, db: Session = Depends(get_db)):

    user_data: UserInDB = user_crud.get_user(db=db, user_id=user.id)

    if user_data is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Invalid user id or password")

    hashed_password = get_hashed_password(user.pwd)

    if user_data.hashed_password != hashed_password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid user id or password"
        )

    # Valid User Phase
    ##
    db_token = token_crud.get_token(db=db, user_id=user.id)
    access_token = generate_token({"user_id": user.id}, 'access')
    refresh_token = generate_token({}, 'refresh')
    if db_token is None:
        token_crud.create_token(
            db=db, refresh_token=refresh_token["token"], user_id=user.id, expire_at=refresh_token["expire_at"])

    else:
        stored_refresh_token = {
            "token": db_token.refresh, "expire_at": db_token.expire_at}
        if authenticate_token(stored_refresh_token["token"]):
            refresh_token = stored_refresh_token
        else:
            token_crud.update_token(
                db=db, user_id=user.id, refresh_token=refresh_token)

    return jsonable_encoder({"access_token": access_token,  "refresh_token": refresh_token})
