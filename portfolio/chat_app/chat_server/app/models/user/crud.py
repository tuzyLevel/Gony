from sqlalchemy.orm import Session


from app.schemas import user as userSchema
from .user_model import User

from app.utils.encrytions.encrytion import get_hashed_password


class UserAlreadyExists(Exception):
    pass


def get_user(db: Session, user_id: str) -> userSchema.UserInDB:
    return db.query(User).filter(User.id == user_id).first()


def create_user(db: Session, user: userSchema.UserCreate):
    '''
    '''
    # Check User that exists already
    user_data = get_user(db=db, user_id=user.id)
    if user_data:
        raise UserAlreadyExists

    hashed_password = get_hashed_password(user.pwd)
    db_user = User(
        id=user.id, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def authenticate_user(db: Session, user: userSchema.UserLogin):
    user_data = get_user(db=db, user_id=user.id)
    if not user_data:
        return False

    hashed_password = get_hashed_password(user_data.pwd)
    if user_data.hashed_password != hashed_password:
        return False

    return user_data
