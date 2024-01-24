from fastapi import APIRouter

router = APIRouter(
    prefix='/question'
)

@router.get('/h')
def question_main():
    return 'Hello question'