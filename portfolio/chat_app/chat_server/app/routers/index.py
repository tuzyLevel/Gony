from fastapi import APIRouter
from .api.index import router as apiRouter
router = APIRouter()


router.include_router(apiRouter)
