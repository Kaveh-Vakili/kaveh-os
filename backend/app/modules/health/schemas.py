from typing import Any

from pydantic import BaseModel, ConfigDict


class HealthMetricEntry(BaseModel):
    model_config = ConfigDict(extra="allow")

    date: str
    qty: float | None = None
    Avg: float | None = None
    Min: float | None = None
    Max: float | None = None
    asleep: float | None = None
    inBed: float | None = None
    core: float | None = None
    deep: float | None = None
    rem: float | None = None
    awake: float | None = None
    sleepStart: str | None = None
    sleepEnd: str | None = None


class HealthMetric(BaseModel):
    model_config = ConfigDict(extra="allow")

    name: str
    units: str | None = None
    data: list[HealthMetricEntry] = []


class HealthWorkout(BaseModel):
    model_config = ConfigDict(extra="allow")

    name: str
    start: str
    end: str
    duration: float | None = None
    activeEnergyBurned: dict[str, Any] | float | None = None
    distance: dict[str, Any] | float | None = None
    heartRateData: list[dict[str, Any]] | None = None


class HealthExportData(BaseModel):
    model_config = ConfigDict(extra="allow")

    metrics: list[HealthMetric] = []
    workouts: list[HealthWorkout] = []


class HealthIngestPayload(BaseModel):
    model_config = ConfigDict(extra="allow")

    data: HealthExportData
