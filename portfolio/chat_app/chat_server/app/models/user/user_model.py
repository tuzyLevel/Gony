import datetime as dt
from sqlalchemy import Boolean, Column, String, DateTime
from sqlalchemy.orm import relationship


from app.database import Base


class User(Base):
    '''
        Model for users_tb
    '''
    __tablename__ = "users_tb"
    id = Column(String, primary_key=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=dt.datetime.utcnow)
    deleted_at = Column(DateTime, default=None)
    is_deleted = Column(Boolean, default=False)

    token = relationship("Token", back_populates="owner")
