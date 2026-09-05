from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.auth import CurrentUser, get_current_user
from app.core.config import settings
from app.modules.health.router import router as health_router

app = FastAPI(title="Kaveh OS API")
app.include_router(health_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/api/me")
async def me(user: CurrentUser = Depends(get_current_user)) -> CurrentUser:
    return user
