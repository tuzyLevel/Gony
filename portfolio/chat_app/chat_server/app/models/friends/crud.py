from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from ..user.user_model import User
from .friends_model import Friends


def add_friends(db: Session, user_id: str, follow_user: str):
    target_user = db.query(User).filter(User.id == follow_user).first()
    if target_user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="user not exists")

    friends = Friends(id=user_id, )
