# Kaveh OS

Personal operations dashboard — Health, Finance, Leetcode, Assistant, Calendar, News.

## Stack

- Frontend: React + Vite + TypeScript, Tailwind CSS, Framer Motion (`frontend/`)
- Backend: FastAPI, async (`backend/`)
- Database: Supabase (Postgres), migrations in `supabase/migrations/`
- Local LLM: Ollama (Llama 3.1 8B) via its local REST API

## Getting started

### Frontend

```
cd frontend
cp .env.example .env   # fill in Supabase URL/anon key
pnpm install
pnpm dev
```

### Backend

```
cd backend
cp .env.example .env   # fill in Supabase URL/service role key
uv run uvicorn app.main:app --reload
```

### Supabase

```
supabase login
supabase link --project-ref <project-ref>
supabase db push        # apply migrations in supabase/migrations/
```

### Ollama

Requires Ollama running locally with the model pulled:

```
ollama pull llama3.1:8b
```
