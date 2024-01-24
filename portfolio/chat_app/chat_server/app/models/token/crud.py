from sqlalchemy.orm import Session
from .token_model import Token
from datetime import datetime


def get_token(db: Session, user_id: str) -> Token | None:
    '''
    '''
    return db.query(Token).filter(Token.user_id == user_id and not Token.is_deleted).first()


def create_token(db: Session, refresh_token: str, user_id: str, expire_at: datetime):
    '''
    '''
    db_token = Token(refresh=refresh_token,
                     expire_at=expire_at,
                     user_id=user_id)
    db.add(db_token)
    db.commit()
    db.refresh(db_token)
    return db_token


def update_token(db: Session, user_id: str, refresh_token: str):
    db_token = db.query(Token).filter(Token.user_id == user_id).first()
    if not db_token:
        return False

    db_token.refresh_token = refresh_token
    db.add(db_token)
    db.commit()
    return True


def delete_token(db: Session, user_id: str) -> bool:
    '''
    '''
    db_token = db.query(Token).filter(Token.user_id == user_id).first()
    if not db_token:
        return False

    db.delete(db_token)
    db.commit()
    db.refresh(db_token)
    return True
