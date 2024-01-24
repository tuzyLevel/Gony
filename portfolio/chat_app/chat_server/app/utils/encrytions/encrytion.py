from fastapi import HTTPException, status
from hashlib import sha256
from starlette.config import Config
from jose import JWTError, jwt
from datetime import timedelta, datetime, timezone


config = Config('app/.env')

SECRET_KEY = config('JWT_SECRET_KEY')
ACCESS_TOKEN_EXPIRE = -1
# ACCESS_TOKEN_EXPIRE = int(config('JWT_ACCESS_TOKEN_EXPIRE_MINUTES')) | 30
REFRESH_TOKEN_EXPIRE = int(config('JWT_REFRESH_TOKEN_EXPIRE_DAYS')) | 15
ALGORITHM = config('JWT_ALGORITHM')


def get_hashed_password(password: str):
    '''
        get hashed password by sha256
    '''
    # print(config('ENCRYPT_KEY'))
    encoded_key = config("ENCRYPT_KEY").encode('utf-8')

    m = sha256()
    m.update(encoded_key+password.encode('utf-8') + encoded_key)
    hashed_password = m.hexdigest()
    return hashed_password


def generate_token(data: dict, token_type: str = 'access'):
    to_encode = data.copy() if token_type == 'access' else {}
    expire_timedelta = timedelta(minutes=ACCESS_TOKEN_EXPIRE) if token_type == 'access' else timedelta(
        days=REFRESH_TOKEN_EXPIRE)
    expire = datetime.utcnow() + expire_timedelta
    to_encode.update({"exp": expire})
    encode_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return {"token": encode_jwt, "expire_at": expire}


def authenticate_token(token: str) -> dict | bool:
    '''
        This function takes str param(jwt token) and returns dict data when token is valid
        , or bool value when token is invalid
    '''
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM, options={
                             "verify_signature": False})
        return payload
    except JWTError:
        return False
