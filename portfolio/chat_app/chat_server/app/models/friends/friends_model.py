from sqlalchemy import Integer, Boolean, Column, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from datetime import datetime

from app.database import Base


class Friends(Base):
    __tablename__ = 'friends_tb'
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(String, ForeignKey("users_tb.id"))
    created_at = Column(DateTime, default=datetime.now)
    deleted_at = Column(DateTime, default=None)
    is_deleted = Column(Boolean, default=None)

    follow_user = relationship("User", backref="id")
