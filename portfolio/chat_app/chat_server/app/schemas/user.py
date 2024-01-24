from datetime import datetime
from pydantic import BaseModel


class UserBase(BaseModel):
    '''
        This schema is common part of user data type
    '''
    id: str


class UserCreate(UserBase):
    '''
        This schema is the data type for user create
    '''

    pwd: str


class UserLogin(UserCreate):
    pass


class User(UserBase):
    '''
        This schema is the data type for user data
    '''
    is_active: bool


class UserInDB(UserBase):
    '''
        This schema is the data type for user in database
    '''
    hashed_password: str
    is_active: bool
    is_deleted: bool
    created_at: datetime
    deleted_at: datetime | None
