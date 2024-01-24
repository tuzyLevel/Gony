from datetime import datetime

from .user import UserBase


class Friends(UserBase):
    follow_user: str
    follow_date: datetime
    is_deleted: bool
