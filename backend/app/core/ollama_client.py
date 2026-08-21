import httpx

from app.core.config import settings


async def generate(prompt: str, system: str | None = None) -> str:
    async with httpx.AsyncClient(base_url=settings.ollama_base_url, timeout=120) as client:
        response = await client.post(
            "/api/generate",
            json={
                "model": settings.ollama_model,
                "prompt": prompt,
                "system": system,
                "stream": False,
            },
        )
        response.raise_for_status()
        return response.json()["response"]
