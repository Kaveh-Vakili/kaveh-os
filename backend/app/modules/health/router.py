from fastapi import APIRouter, Depends, Header, HTTPException

from app.core.auth import get_current_user
from app.core.config import settings
from app.modules.health import service
from app.modules.health.schemas import HealthIngestPayload

router = APIRouter(prefix="/api/health", tags=["health"])


@router.post("/ingest")
def ingest(payload: HealthIngestPayload, x_webhook_secret: str = Header(...)) -> dict:
    if x_webhook_secret != settings.health_ingest_secret:
        raise HTTPException(status_code=401, detail="Invalid webhook secret")

    raw = payload.model_dump(mode="json")
    return service.ingest_payload(payload, raw)


@router.get("/summary")
def summary(days: int = 14, user=Depends(get_current_user)) -> dict:
    return service.get_summary(days)
