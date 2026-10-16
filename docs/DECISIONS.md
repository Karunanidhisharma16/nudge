# Decisions log
Format: ID, decision, reason, date. Never change silently: explain, ask, then add a new line.

D1 (2026-10-16) PWA (installable web app), not native. Reason: one codebase, Android share target, free, Kannu knows React.
D2 One Next.js app, no separate NestJS/Redis/Kafka for now. Reason: free hosts sleep; offline-first hides latency; fewer pieces. Revisit in Phase 6/7.
D3 Local-first with Dexie; server is sync hub and backup.
D4 Neon Postgres + Prisma; R2 for files. Supabase is the fallback.
D5 Client-side MiniSearch for V1 search.
D6 Last-write-wins sync with serverSeq cursor; single user.
D7 Locked shelf names are plaintext in V1; items and files are encrypted.
D8 Smart/AI layer is optional, last, and never touches locked or private data.
D9 One lock password per account (each shelf keeps its own key, so per-shelf passwords can be added later). One recovery key.
D10 Allowed files in V1: PDF, TXT, DOCX, PPTX; max 15 MB each; preview only PDF and TXT. Never open/execute files; no macro formats.
D11 Android phone first; desktop layout in Phase 5.
D12 Final name: Nudge.
