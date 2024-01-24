from pydantic import BaseModel

from datetime import datetime


class Token(BaseModel):
    refresh: str
    access: str
    token_type: str
    expire_at: datetime
    created_at: datetime
