# Portfolio Backend

A minimal Express + TypeScript API that powers the contact features of the portfolio frontend. Keep it simple now and extend it later with databases, auth, or email providers.

## Features
- `/api/health` endpoint for uptime checks.
- `/api/contact` POST endpoint that validates and stores messages in memory (replace with DB/email later).
- CORS + Helmet hardening so the Vite frontend can talk to it safely.
- Graceful shutdown hooks for smoother deployments.

## Quick Start
1. `cd backend`
2. `npm install`
3. Copy `.env.example` to `.env` and adjust values.
4. `npm run dev` to start the watcher on `http://localhost:4000` (default).

## Scripts
- `npm run dev` – hot-reload server via `tsx`.
- `npm run build` – compile TypeScript to `dist/`.
- `npm start` – run the compiled build (used by Render).

## API Overview
- `GET /api/health` → `{ status, time, supportEmail }`
- `POST /api/contact` → accepts `{ name, email, message, source? }`. Returns confirmation payload with a ticket id.
- `GET /api/contact` → dumps in-memory submissions (replace or secure before prod).

## Deploying to Render
1. Push the `backend` folder to its own Git repo (or a monorepo root).
2. Create a **Web Service** on Render and point it to the repo.
3. Build command: `npm install && npm run build`
4. Start command: `npm start`
5. Add env vars (PORT, ALLOWED_ORIGINS, SUPPORT_EMAIL) in Render dashboard.
6. Deploy—Render issues a public URL like `https://your-api.onrender.com`.

## Hooking Up the Frontend
- In the Vite app, add `VITE_API_URL=https://your-api.onrender.com/api` to `.env`.
- Use `fetch(`${import.meta.env.VITE_API_URL}/contact`, { method: 'POST', ... })` inside sections such as `SpotlightReveal`.
- For local dev, set `VITE_API_URL=http://localhost:4000/api`.

That’s enough to start. When ready, drop in storage (Postgres, Mongo, Supabase) or providers (Resend, SendGrid) without rewiring the frontend.
