from fastapi import FastAPI
from api_gateway.api.v1 import router as v1_router

app = FastAPI(title="RestructXAI API Gateway")

app.include_router(v1_router, prefix="/api")
