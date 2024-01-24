from fastapi import APIRouter

# from router.api.question.question import router as questionRouter
from .question.question import router as questionRouter
from .user.user import router as userRouter
from .authentication.authentication import router as authRouter
from .friends.friends import router as friendsRouter


router = APIRouter(
    prefix='/api'
)


@router.get("/")
def api_main():
    return "api main"


router.include_router(questionRouter)
router.include_router(userRouter)
router.include_router(authRouter)
router.include_router(friendsRouter)
