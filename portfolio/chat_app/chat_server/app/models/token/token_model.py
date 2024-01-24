import datetime as dt
from sqlalchemy import Column, ForeignKey, Boolean, String, DateTime, Integer
from sqlalchemy.orm import relationship

from app.database import Base


class Token(Base):
    '''
        Model for token_tb
    '''
    __tablename__ = 'token_tb'
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    refresh = Column(String, unique=True, index=True)
    user_id = Column(String, ForeignKey("users_tb.id"))
    expire_at = Column(DateTime)
    created_at = Column(DateTime, default=dt.datetime.now)
    deleted_at = Column(DateTime, default=None)
    is_deleted = Column(Boolean)

    owner = relationship("User", back_populates="token", cascade="save-update")
