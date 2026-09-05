create table if not exists health_metrics (
  id bigserial primary key,
  metric_type text not null,
  recorded_at timestamptz not null,
  value numeric not null,
  unit text,
  source text,
  created_at timestamptz not null default now(),
  unique (metric_type, recorded_at, source)
);

create index if not exists health_metrics_type_time_idx
  on health_metrics (metric_type, recorded_at desc);

create table if not exists health_sleep (
  id bigserial primary key,
  start_at timestamptz not null,
  end_at timestamptz not null,
  stage text not null,
  source text,
  created_at timestamptz not null default now(),
  unique (start_at, end_at, stage, source)
);

create index if not exists health_sleep_start_idx
  on health_sleep (start_at desc);

create table if not exists health_workouts (
  id bigserial primary key,
  workout_type text not null,
  start_at timestamptz not null,
  end_at timestamptz not null,
  duration_seconds numeric,
  active_energy_kcal numeric,
  distance_km numeric,
  avg_heart_rate numeric,
  source text,
  created_at timestamptz not null default now(),
  unique (workout_type, start_at, end_at, source)
);

create index if not exists health_workouts_start_idx
  on health_workouts (start_at desc);

create table if not exists health_raw_ingest (
  id bigserial primary key,
  received_at timestamptz not null default now(),
  payload jsonb not null
);
