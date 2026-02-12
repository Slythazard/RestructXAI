from fastapi import APIRouter
from api_gateway.api.v1.endpoints import ingestion_router

router = APIRouter()
router.include_router(ingestion_router, prefix="/v1")
