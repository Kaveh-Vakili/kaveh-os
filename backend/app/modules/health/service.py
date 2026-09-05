from datetime import datetime, timedelta

from app.core.supabase_client import get_supabase
from app.modules.health.schemas import HealthIngestPayload, HealthMetric, HealthWorkout

SOURCE = "health_auto_export"


def _parse_date(value: str) -> str:
    dt = datetime.strptime(value, "%Y-%m-%d %H:%M:%S %z")
    return dt.isoformat()


def _qty_and_units(value: dict | float | None) -> tuple[float | None, str | None]:
    if isinstance(value, dict):
        return value.get("qty"), value.get("units")
    return value, None


def _extract_metric_rows(metric: HealthMetric) -> list[dict]:
    rows = []
    for entry in metric.data:
        value = entry.qty if entry.qty is not None else entry.Avg
        if value is None:
            continue
        rows.append(
            {
                "metric_type": metric.name,
                "recorded_at": _parse_date(entry.date),
                "value": value,
                "unit": metric.units,
                "source": SOURCE,
            }
        )
    return rows


def _extract_sleep_rows(metric: HealthMetric) -> list[dict]:
    # Health Auto Export's exact sleep_analysis shape is unconfirmed (no live
    # sample yet) — for now we only capture the overall asleep span from
    # sleepStart/sleepEnd; per-stage (core/deep/rem) breakdowns are skipped
    # until we can verify the real payload shape.
    rows = []
    for entry in metric.data:
        if entry.sleepStart and entry.sleepEnd:
            rows.append(
                {
                    "start_at": _parse_date(entry.sleepStart),
                    "end_at": _parse_date(entry.sleepEnd),
                    "stage": "asleep",
                    "source": SOURCE,
                }
            )
    return rows


def _extract_workout_row(workout: HealthWorkout) -> dict:
    energy_qty, _ = _qty_and_units(workout.activeEnergyBurned)
    distance_qty, distance_units = _qty_and_units(workout.distance)

    distance_km = distance_qty
    if distance_qty is not None and distance_units and "mi" in distance_units.lower():
        distance_km = distance_qty * 1.60934

    avg_heart_rate = None
    if workout.heartRateData:
        values = [s.get("qty") for s in workout.heartRateData if s.get("qty") is not None]
        if values:
            avg_heart_rate = sum(values) / len(values)

    return {
        "workout_type": workout.name,
        "start_at": _parse_date(workout.start),
        "end_at": _parse_date(workout.end),
        "duration_seconds": workout.duration,
        "active_energy_kcal": energy_qty,
        "distance_km": distance_km,
        "avg_heart_rate": avg_heart_rate,
        "source": SOURCE,
    }


def ingest_payload(payload: HealthIngestPayload, raw: dict) -> dict:
    supabase = get_supabase()

    supabase.table("health_raw_ingest").insert({"payload": raw}).execute()

    metric_rows: list[dict] = []
    sleep_rows: list[dict] = []
    for metric in payload.data.metrics:
        if metric.name == "sleep_analysis":
            sleep_rows.extend(_extract_sleep_rows(metric))
        else:
            metric_rows.extend(_extract_metric_rows(metric))

    workout_rows = [_extract_workout_row(w) for w in payload.data.workouts]

    if metric_rows:
        supabase.table("health_metrics").upsert(
            metric_rows, on_conflict="metric_type,recorded_at,source"
        ).execute()
    if sleep_rows:
        supabase.table("health_sleep").upsert(
            sleep_rows, on_conflict="start_at,end_at,stage,source"
        ).execute()
    if workout_rows:
        supabase.table("health_workouts").upsert(
            workout_rows, on_conflict="workout_type,start_at,end_at,source"
        ).execute()

    return {
        "metrics_ingested": len(metric_rows),
        "sleep_ingested": len(sleep_rows),
        "workouts_ingested": len(workout_rows),
    }


def get_summary(days: int = 14) -> dict:
    supabase = get_supabase()
    since = (datetime.now().astimezone() - timedelta(days=days)).isoformat()

    metrics = (
        supabase.table("health_metrics")
        .select("*")
        .gte("recorded_at", since)
        .order("recorded_at", desc=True)
        .execute()
    )
    sleep = (
        supabase.table("health_sleep")
        .select("*")
        .gte("start_at", since)
        .order("start_at", desc=True)
        .execute()
    )
    workouts = (
        supabase.table("health_workouts")
        .select("*")
        .gte("start_at", since)
        .order("start_at", desc=True)
        .execute()
    )

    return {
        "metrics": metrics.data,
        "sleep": sleep.data,
        "workouts": workouts.data,
    }
