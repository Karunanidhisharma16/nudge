# Nudge: Project Brief (technical handoff)

Last updated: 2026-10-16. Status: planning done, decisions made, build starting. Current: Phase 0.
Owner: Kannu (B.Tech ECE, IIIT Una). Knows React, Node, Express, Next.js, NestJS, PostgreSQL, Prisma. Learning GenAI (CampusX) right now.
Name: **Nudge** (final, decided 2026-10-16). Target device: Android phone first; desktop layout comes in Phase 5.

Language rule: Kannu talks in Hinglish. All code, comments, commit messages, docs and in-app text are in English.

---

## 0. How to use this file

1. Start every new Claude chat by attaching this file (or pasting it) plus `docs/PROGRESS.md` if it exists.
2. Paste the kickoff prompt below as your first message.
3. At the end of every session, ask Claude to update `docs/PROGRESS.md` and give you a 3-line "resume prompt" for the next chat.

**Kickoff prompt (copy-paste):**

```
I am Kannu. We are building "Nudge", a free, offline-first PWA: a fast notes app organised into "Shelves", where each shelf has a type (Notes, Movies, Links, PDFs/Files, Code, Music, Courses, Checklist) that adds the right tools and buttons. Shelves can be password-locked with real client-side encryption. Smart/AI features come last and are optional.

Read the attached NUDGE_PROJECT_BRIEF.md fully before answering. It has the product, stack, architecture, data model, project structure and phases. Follow section 13 (working rules) exactly.

Talk to me in Hinglish. Code, comments and UI text in English. Everything must stay free (no paid services). I want to learn, so explain each new concept briefly and tell me what each new file does.

Today: [Phase X, step Y]. First tell me your plan for this step in 5 lines, then we start.
```

---

## 1. The product in one page

Nudge is a simple, fast notes-style app. The user creates **Shelves** (folders). Each shelf has a **type**. The type decides which fields the user can fill and which buttons each item gets. If no type is chosen, the shelf is plain notes.

Core rules:
- Capture must be 2 taps: + then write then Save. No loading screens. Works offline.
- The user writes everything himself (title, description, vibe). No AI needed to use the app.
- Shelves can have sub-shelves (one level only). Example: Movies > Bollywood, Hollywood, Web Series.
- Any shelf can be locked with a password. Locked shelves are hidden from home and search until unlocked.
- Quick notes without a shelf go to an **Inbox** and can be moved to a shelf with one tap (the item converts to that shelf's type).
- Resumes: Nudge only stores PDFs (the user edits resumes in Overleaf). Buttons: Download, Share, Replace file.
- Export everything as JSON in one click. No lock-in.

Shelf types and their buttons:

| Type | User fills | Extra features | Item buttons | Phase |
| --- | --- | --- | --- | --- |
| Notes (default) | title, text | pin, search, checklist tick | Copy, Share | V1 |
| Movies and Shows | title, own description, own vibe tags, suggested by, status (To watch / Watching / Watched), optional poster | filters by status, vibe, suggested by | Mark watched, Share | V1 |
| Links | URL, title, note | favicon, tags | Open, Copy link, Share link | V1 |
| PDFs and Files | file, title, labels (Backend, AI, On-campus) | preview, label filter, replace file | Download, Share, Replace | V1 |
| Code | title, language, code | syntax colours, language filter | Copy code, Share | V1 |
| Music | song or playlist link, title, mood | mood filter | Open, Copy link | V1.5 |
| Courses | playlist link, lesson list | lesson tick, progress bar | Open, Mark done | V1.5 |
| Checklist | tasks | tick, due date | Share | V1.5 |
| Later | Books, Places, Quotes, Images, Documents/IDs (locked) | per type | per type | V2 |

Smart extras (optional, last): Tonight picker (mood + time), auto-fill (movie poster/runtime), search by meaning, link summary, reminders, friend suggest link, Ask chat. They only suggest and never overwrite what the user wrote. Locked shelves are never sent to AI.

Out of scope on purpose: password manager (use Bitwarden), Aadhaar/PAN storage before locked shelves are tested, real-time collaboration, native apps (for now).

Screens (designed in Stitch): Home (search, Inbox card, shelves grid, + button), + menu (Quick note / New item / New shelf), New shelf with type picker, Shelf screen (sub-shelf chips, type filters, list), Item add form per type, Item detail per type, Inbox, Search, Locked shelf flows (set password, recovery key, unlock), Desktop layout (sidebar tree, list, preview, Ctrl+K).

---

## 2. What we are building: a PWA

**Nudge is an installable PWA** (Progressive Web App): one web codebase that runs on the Android phone (installed from Chrome like an app) and on the laptop browser.

| Option | Verdict | Why |
| --- | --- | --- |
| PWA (Next.js) | **Chosen** | One codebase for phone and laptop, installable, works offline, free to distribute, Kannu already knows React/Next.js. On Android an installed PWA can appear in the system Share sheet. |
| Native (Kotlin, Flutter, React Native/Expo) | Later, only if needed | New language or toolchain, slower to learn, needs store setup. Consider Expo or a Trusted Web Activity wrapper later for widgets or iOS sharing. |
| Plain responsive website | Rejected | No install, no share target, weak offline. |

Known PWA limits we accept:
- **Web Share Target** (receiving "Share to Nudge" from YouTube or Chrome) works on Android (WebAPK) and ChromeOS, and only after the PWA is installed. It is not available on iPhone. Fallback on iPhone: quick box and copy-paste.
- Background sync and widgets are limited. The app syncs when opened, on reconnect, and on a timer while open.
- Safari/iOS may clear site storage for sites that are not installed. Server sync is the backup, which is why sync comes before heavy daily use.

---

## 3. Tech stack

All free for one personal user. Limits were checked on 2026-10-15 from search results, not from opened official pages. Recheck each limit when you actually sign up.

| Layer | Choice | Plain meaning (Hinglish) | Why | Free limit and notes |
| --- | --- | --- | --- | --- |
| Framework | Next.js (App Router) + TypeScript | React ka full-stack framework; UI aur API ek hi project mein | Kannu already knows it; one deploy | Free |
| UI | Tailwind CSS, shadcn/ui, Lucide icons, Motion | Styling aur ready-made components | Fast to build the Stitch design | Free |
| Local database | IndexedDB via Dexie (+ dexie-react-hooks) | Browser ke andar ka database; offline kaam yahin hota hai | Offline-first; instant UI | Browser storage, free |
| Offline and PWA | Service worker with Serwist (Workbox successor), web app manifest | App ko install aur offline chalane wala hissa | Installable, share target | Free |
| Client search | MiniSearch | Phone/laptop pe hi search, server ke bina | Fast, offline, private | Free |
| Forms and validation | react-hook-form + zod | Form handle karna aur data ka shape check karna | One zod schema per shelf type, shared by client and server | Free |
| Code highlighting | Shiki | Code ko colour dene ke liye | Code shelf | Free |
| Server API | Next.js route handlers | Server ke functions (sync, files) | No separate server to host or keep awake | On Vercel |
| Server database | PostgreSQL on Neon + Prisma | Cloud database + uska easy interface | Kannu knows Prisma; supports pgvector later | Neon free: about 0.5 to 1 GB per project (pages disagree, check), 100 CU-hours per project per month, scales to zero after 5 min idle |
| Auth | Auth.js with Google login (check current docs; Better Auth is an alternative) | Google se sign-in | Smallest setup | Free |
| File storage | Cloudflare R2 (S3-compatible) with presigned URLs | PDFs/files ka cloud storage; browser seedha upload karta hai | Free 10 GB, no egress fees | 10 GB storage, 1M writes and 10M reads per month |
| Crypto | Web Crypto API (AES-GCM) + Argon2id via a WASM library | Locked shelf ko asli encryption dena | Built into browsers; never write our own algorithm | Free |
| Hosting | Vercel Hobby | Web app deploy karne ki jagah | One-click Next.js deploys | Free but non-commercial only; hard caps (about 100 GB bandwidth, about 1M function calls per month); short function time limits |
| CI and tests | GitHub Actions, Vitest, Playwright | Auto-checks aur tests | Sync and crypto need tests | Free |
| AI (Phase 6 only) | Gemini API free tier from a server route; Ollama locally for dev | Optional smart features | Free tier has Flash and Flash-Lite models | Limits changed in Dec 2025 and Apr 2026; free-tier content can be used by Google to improve its products, so never send private or locked data |
| Embeddings (Phase 6) | pgvector on Neon | Meaning-based search | Same Postgres | Counts toward the Neon storage cap |
| Movie data (Phase 6) | TMDB API | Poster, runtime | Verify the terms and attribution at that time | Check |

**Decisions worth knowing:**
- **No separate NestJS server, no Redis, no Kafka, no BullMQ.** The earlier plan had them. For one user and short API calls they only add things to host, and free hosts put idle servers to sleep (Render's free web service sleeps after 15 minutes idle and takes about a minute to wake). The offline-first design also hides server delays. If heavy background jobs appear in Phase 6, we can add a NestJS worker then. If Kannu wants NestJS on the resume, Phase 6 or 7 is the right place for it.
- **No Supabase for now.** It is a good all-in-one (database, auth, storage), but its free projects pause after 7 days of inactivity. It stays as the fallback if Neon + R2 + Auth.js feels like too many pieces.
- **Render free Postgres is not used** (free databases expire).

---

## 4. Architecture

The golden rule: **the phone's local database is the source of truth for the UI. The server is a backup and sync hub.** A write never waits for the network.

```
                    ┌──────────────────────────── Browser / installed PWA ────────────────────────────┐
 Share sheet  ───►  │  Service worker (Serwist)  ── caches app shell, handles /share target            │
 (Android)          │                                                                                 │
                    │  React UI (Next.js client) ◄── live queries ──  IndexedDB (Dexie)               │
 User taps  ─────►  │      │                                          shelves | items | outbox | meta │
                    │      │ write = 1 local transaction (item + outbox entry)                        │
                    │      ▼                                                                          │
                    │  Sync engine: push outbox ─► pull changes since cursor (on open/online/timer)   │
                    │  Crypto module: locked shelves encrypted/decrypted here (keys only in memory)   │
                    │  Search: MiniSearch index built from IndexedDB (locked shelves only when open)  │
                    └───────────────┬──────────────────────────────────────────┬──────────────────────┘
                                    │ HTTPS JSON                               │ presigned URL (direct)
                                    ▼                                          ▼
                       Next.js route handlers (Vercel)                 Cloudflare R2 (files)
                       /api/auth  /api/sync  /api/files  /api/export   (locked-shelf files are ciphertext)
                                    │
                                    ▼
                           PostgreSQL (Neon) via Prisma
                           users | shelves | items | file_objects  (+ pgvector in Phase 6)
```

Request flows:

1. **Add an item (offline or online):** form to zod validation to one Dexie transaction (write item + add outbox entry) to UI updates instantly via live query. Sync engine pushes later.
2. **Sync:** push outbox batch (`POST /api/sync/push`), server upserts each change and assigns a `serverSeq`, returns accepted ids. Then pull (`GET /api/sync/pull?since=cursor`), apply remote changes to Dexie, save new cursor.
3. **Upload a PDF:** client asks `POST /api/files/presign-upload` (checks auth, size, type) to uploads straight to R2 with the presigned URL to `POST /api/files/confirm` saves the file record. Download uses a short-lived presigned GET URL.
4. **Lock a shelf:** all in the browser (section 7). Server only ever stores ciphertext and wrapped keys.
5. **Share to Nudge (Android):** system share sheet to service worker handles `POST /share` to stores the shared text/URL/file in IndexedDB to opens "Save to shelf" screen. Works offline.
6. **Smart layer (Phase 6):** server route calls the AI only for non-private items, result is a suggestion the user accepts or edits.

---

## 5. Data model

### 5.1 Common rules
- IDs are UUIDs created on the client (`crypto.randomUUID()`), so items can be created offline.
- Soft delete: `deletedAt` is set instead of removing rows, so deletions can sync.
- Timestamps are ISO strings. `updatedAt` is set on every change.
- Item type-specific fields live in a JSON `data` field, validated by a zod schema per type (`src/lib/types/*`). This avoids a new table for every type.

### 5.2 Postgres (Prisma) tables

| Table | Columns |
| --- | --- |
| `User` | id, email, name, image, createdAt (plus the tables the auth library needs) |
| `Shelf` | id, userId, parentId (nullable, one level only), name, type (enum), icon, color, sortOrder, isLocked, lockMeta (JSON: kdf name and params, salt, wrappedShelfKey, recoveryWrappedKey, nonces), createdAt, updatedAt, deletedAt, serverSeq |
| `Item` | id, userId, shelfId (null = Inbox), type, title (null if encrypted), data (JSON, null if encrypted), cipher (base64, null if not encrypted), nonce, isEncrypted, pinned, createdAt, updatedAt, deletedAt, serverSeq |
| `FileObject` | id, userId, itemId, r2Key, originalName, mime, sizeBytes, isEncrypted, createdAt, deletedAt, serverSeq |
| `LockProfile` | userId, kdf (name and params), salt, createdAt (one row per user; added in Phase 4) |
| `Embedding` (Phase 6) | itemId, vector, model, updatedAt (only for non-private, non-locked items) |

`serverSeq` comes from one Postgres sequence shared by all tables. Every write takes the next number. The client's pull cursor is the highest `serverSeq` it has seen.

### 5.3 IndexedDB (Dexie) stores

| Store | Purpose |
| --- | --- |
| `shelves`, `items`, `files` | Same shape as the server rows, plus `dirty` flag |
| `outbox` | Pending changes: id, entity, entityId, op (upsert/delete), payload, createdAt, tries |
| `meta` | deviceId, syncCursor, lastSyncAt, settings |

Locked shelf items are stored in IndexedDB as ciphertext too. Plaintext of locked items exists only in memory while unlocked.

### 5.4 Item `data` per type

```
note:      { body }
movie:     { description, vibeTags[], suggestedBy, status: "to_watch"|"watching"|"watched", year?, posterFileId? }
link:      { url, note, faviconUrl? }
file:      { fileId, labels[], mime, sizeBytes, originalName }
code:      { language, code }
music:     { url, mood }
course:    { url, lessons: [{ id, title, done }] }
checklist: { tasks: [{ id, text, done, due? }] }
```

Moving an Inbox note into a Movies shelf converts it: note.body becomes movie.description, status defaults to "to_watch". Each type module exports a `fromNote()` converter.

---

## 6. Sync design (the hardest part, keep it simple)

Scope: one user, a few devices. Not real-time collaboration.

- **Push:** send outbox entries in batches of about 50, in order. Server validates with zod, checks `userId` ownership on every row, upserts, assigns `serverSeq`. Pushes are **idempotent** (same change twice is harmless) so retries are safe.
- **Pull:** `GET /api/sync/pull?since=<serverSeq>&limit=200` returns changed rows after the cursor. Client applies them in one transaction and stores the new cursor. Repeat until empty.
- **Conflicts:** last write wins, decided by the server receipt order. Rare for a single user. Later improvement: keep a "conflicted copy" instead of overwriting when both sides changed the same item since the last pull.
- **Triggers:** on app open, when the browser goes online, on `visibilitychange`, every few minutes while open, and after each local write (debounced).
- **Failure handling:** exponential backoff, never block the UI, show a small "Synced / Syncing / Offline" indicator.
- **Deletes:** tombstones (`deletedAt`) sync like any other change. A cleanup job can purge old tombstones later.
- **Tests (Vitest):** two simulated devices, offline edits, duplicate pushes, delete then edit, cursor resume.

---

## 7. Locked shelves (client-side encryption)

Threat model: protects against a leaked database, a curious server admin, and someone casually opening the app on an unlocked phone. It does **not** protect against malware on the device or a cross-site-scripting bug (so we use a strict Content Security Policy and never render raw HTML).

Design (never invent our own algorithm; use Web Crypto and a vetted Argon2id library):

0. **One lock password per account (decision D9).** The first time Kannu locks any shelf, he creates the "Nudge lock password" and gets one recovery key. Later locked shelves reuse it, so there is only one password to remember. Trade-off: unlocking opens all locked shelves for that session, and auto-lock closes them. Each shelf still has its own key, so an optional per-shelf password can be added later without a redesign.
1. **Lock a shelf:** generate a random 256-bit `shelfKey` for that shelf.
2. **Password path:** `passwordKey = Argon2id(lockPassword, salt)`. Wrap each `shelfKey` with `passwordKey` using AES-GCM, giving `wrappedShelfKey`.
3. **Recovery path:** generate one random recovery key (shown once as grouped characters, with "Copy" and "Save as file"). Wrap each `shelfKey` with it, giving `recoveryWrappedKey`.
4. **Store on server:** salt and KDF params in the per-user `LockProfile`; each shelf's two wrapped keys and nonces in `Shelf.lockMeta`. The server never sees the password, recovery key or any `shelfKey`.
5. **Encrypt items:** JSON of `{title, data}` is encrypted with AES-GCM and a fresh 96-bit random nonce. Use the item id and shelf id as additional authenticated data so ciphertext cannot be swapped between items. Store `cipher` and `nonce`; set `title` and `data` to null.
6. **Encrypt files:** encrypt in the browser before the R2 upload.
7. **Unlock:** enter the lock password once per session, derive the key, unwrap each `shelfKey` when its shelf is opened, hold it only in memory as a non-extractable CryptoKey. Decrypt items into memory. Build the search index in memory only. **Auto-lock** after a short idle time or when the tab is hidden for a while.
8. **Hidden:** locked shelves do not appear in search, recents, share suggestions or notifications. The shelf name stays visible on Home (decision D7: names are plaintext in V1; encrypting names is a later option).
9. **Forgot password:** use the recovery key. No recovery key means the data is gone. The UI must say this before locking.
10. **Never** send locked or private items to any AI or analytics.

Build the `src/lib/crypto/` module with tests first, before any UI. Label the feature "experimental" until it has been reviewed and tested. Test Argon2 speed on a low-end phone.

Later: unlock with fingerprint via WebAuthn, change password (re-wrap the key only), encrypt shelf names.

---

## 8. File handling

- Allowed types (V1, decision D10): **PDF, TXT, DOCX, PPTX**. Legacy .doc and .ppt and macro files (.docm, .pptm) are not allowed in V1 (add .doc/.ppt later only if needed). Check both extension and MIME type on the server.
- Size: max **15 MB per file** (decks can be bigger than resumes); per-user quota about 1 GB until the R2 free 10 GB is a concern.
- In-app preview: PDF and TXT only. DOCX and PPTX get Download and Share only (no preview in V1).
- Safety: Nudge never opens or runs these files. Serve downloads as attachments. Enforce the size limit when signing the upload URL, and re-check size on confirm.
- Flow: presign upload (server checks session, type, size) then browser PUT to R2 then confirm. Download: presigned GET, short expiry.
- R2 bucket stays private. No public URLs.
- **Share a file:** use the Web Share API with a `File` object where supported, else fall back to Download.
- Offline PDFs: cache downloaded files in Cache Storage so previously opened resumes open offline.
- Deleting an item marks the file for deletion; a cleanup route removes the R2 object.

---

## 9. Search

- **V1 search is on the device:** MiniSearch index over title, text fields, tags, URL, vibe tags. Rebuild incrementally from Dexie changes. Works offline and keeps data private.
- Shelf-aware: results show the shelf path ("Movies > Web Series"). Filters by type.
- Locked shelves are only searched while unlocked, in memory.
- **Phase 6:** embeddings in pgvector (non-private items only, opt-in) and merge keyword and vector results with Reciprocal Rank Fusion. Measure with a hand-labelled query set.

---

## 10. Project structure

Single Next.js app (no monorepo). Feature folders keep the type system, sync, crypto and search separate and testable.

```
nudge/
├─ README.md
├─ CLAUDE.md                      # working rules for Claude (copy of section 13)
├─ .env.example                   # all env var names, no secrets
├─ .github/workflows/ci.yml       # lint, typecheck, unit tests on every push
├─ docs/
│  ├─ PROJECT_BRIEF.md            # this file
│  ├─ PROGRESS.md                 # updated at the end of every session
│  ├─ DECISIONS.md                # why we chose things (short entries)
│  └─ product-plan.md             # the simple product plan (Shelves)
├─ prisma/
│  ├─ schema.prisma               # Postgres tables
│  └─ migrations/
├─ public/
│  ├─ manifest.webmanifest        # PWA identity, icons, share_target
│  └─ icons/                      # app icons (192, 512, maskable)
├─ src/
│  ├─ app/                        # routes (Next.js App Router)
│  │  ├─ layout.tsx               # root layout, theme, providers
│  │  ├─ sw.ts                    # service worker source (Serwist)
│  │  ├─ (app)/                   # the signed-in app screens
│  │  │  ├─ page.tsx              # Home: search, Inbox card, shelves grid
│  │  │  ├─ inbox/page.tsx        # Inbox list and "Move to shelf"
│  │  │  ├─ search/page.tsx       # search screen
│  │  │  ├─ you/page.tsx          # settings, export, sync status
│  │  │  ├─ shelf/[shelfId]/page.tsx   # shelf screen (items, sub-shelves, filters)
│  │  │  └─ item/[itemId]/page.tsx     # item detail (renders by type)
│  │  ├─ share/page.tsx           # landing screen after "Share to Nudge"
│  │  ├─ login/page.tsx           # Google sign-in
│  │  └─ api/
│  │     ├─ auth/[...nextauth]/route.ts   # auth endpoints
│  │     ├─ sync/push/route.ts            # receive client changes
│  │     ├─ sync/pull/route.ts            # send changes since cursor
│  │     ├─ files/presign-upload/route.ts # signed R2 upload URL
│  │     ├─ files/presign-download/route.ts
│  │     ├─ files/confirm/route.ts        # save file record after upload
│  │     └─ export/route.ts               # full JSON export
│  ├─ components/
│  │  ├─ ui/                      # shadcn/ui primitives (button, dialog, sheet...)
│  │  ├─ layout/                  # BottomNav, Fab (+ button), AddMenuSheet, Sidebar (desktop)
│  │  ├─ shelf/                   # ShelfGrid, ShelfTile, TypePicker, NewShelfForm, SubShelfChips
│  │  ├─ item/                    # ItemRow, ItemActions, MoveToShelfSheet
│  │  │  └─ types/                # per type: MovieForm/MovieDetail, LinkForm/LinkDetail, FileForm/FileDetail, CodeForm/CodeDetail, NoteForm/NoteDetail, ...
│  │  └─ lock/                    # SetPasswordForm, RecoveryKeyCard, UnlockDialog, LockBadge
│  ├─ lib/
│  │  ├─ db/
│  │  │  ├─ local.ts              # Dexie database and schema versions
│  │  │  ├─ shelves.ts            # create/read/update/delete shelves (local)
│  │  │  ├─ items.ts              # create/read/update/delete items (local)
│  │  │  └─ outbox.ts             # add pending changes
│  │  ├─ types/                   # THE shelf type system
│  │  │  ├─ registry.ts           # list of types: label, icon, tint, zod schema, form, actions
│  │  │  ├─ note.ts movie.ts link.ts file.ts code.ts music.ts course.ts checklist.ts
│  │  │  └─ convert.ts            # note to other type converters
│  │  ├─ sync/
│  │  │  ├─ engine.ts             # decides when to sync, runs push then pull
│  │  │  ├─ push.ts  pull.ts      # network calls
│  │  │  ├─ apply.ts              # applies remote changes to Dexie
│  │  │  └─ status.ts             # Synced/Syncing/Offline state
│  │  ├─ crypto/
│  │  │  ├─ kdf.ts                # password to key (Argon2id)
│  │  │  ├─ aead.ts               # AES-GCM encrypt/decrypt with AAD
│  │  │  ├─ keywrap.ts            # wrap/unwrap shelf key
│  │  │  ├─ recovery.ts           # recovery key generate/format/parse
│  │  │  └─ session.ts            # in-memory unlocked keys, auto-lock timer
│  │  ├─ search/
│  │  │  └─ index.ts              # MiniSearch index build and query
│  │  ├─ files/
│  │  │  ├─ upload.ts  download.ts  limits.ts   # R2 flow, size/type rules
│  │  ├─ pwa/
│  │  │  ├─ register-sw.ts        # register the service worker
│  │  │  ├─ share-target.ts       # read shared data saved by the service worker
│  │  │  └─ install-prompt.ts     # "Add to home screen" handling
│  │  └─ utils/                   # ids, dates, url helpers
│  ├─ server/                     # server-only code, never imported by client components
│  │  ├─ auth.ts                  # Auth.js config
│  │  ├─ db.ts                    # Prisma client
│  │  ├─ r2.ts                    # S3 client for R2 and signing
│  │  ├─ sync-service.ts          # upsert changes, assign serverSeq, query pulls
│  │  └─ validate.ts              # zod schemas shared with lib/types
│  └─ hooks/                      # useShelves, useItems, useUnlockedShelf, useSyncStatus
├─ tests/
│  ├─ unit/                       # sync, crypto, converters, search
│  └─ e2e/                        # Playwright: add item offline, sync, lock/unlock
└─ evals/                         # Phase 6: labelled query sets and scripts for measuring smart features
```

**Rule of the type system:** adding a new shelf type should mean adding one file in `lib/types/`, one form and one detail component, and registering it in `registry.ts`. Nothing else should change.

---

## 11. Phases

Build layer by layer. Do not start a phase before the gate of the previous one passes. Dates are not fixed (exams); rough total is 3 to 4 months, but that is an estimate. Phase numbers match the product plan roadmap, with Phase 2 split into local-first and sync work.

### Phase 0: Foundation (about 1 week)
Steps: 0.1 create GitHub repo, Next.js + TypeScript, Tailwind, shadcn/ui, ESLint, Prettier. 0.2 Vitest + a first test, GitHub Actions CI. 0.3 Neon project, Prisma, first migration (User table), `.env.example`. (Follow Neon's current Prisma guide: pooled `DATABASE_URL` for the app, direct `DIRECT_URL` for the Prisma CLI, set in `prisma.config.ts`, with the `@prisma/adapter-neon` driver adapter. Prisma's setup changed recently, so always check the current docs.) 0.4 Cloudflare R2 bucket and an S3 client test. 0.5 deploy a hello page on Vercel. 0.6 create `docs/` files and `CLAUDE.md`.
Learn: Git branches and PRs, environment variables, App Router basics, what Vercel does.
Gate: deployed URL loads, DB connection works from a route, CI is green.

### Phase 1: Local-first core, no server yet
Steps: 1.1 Dexie schema (`shelves`, `items`, `meta`). 1.2 shelves CRUD + one-level sub-shelves. 1.3 Notes items + Inbox + Quick note + Move to shelf. 1.4 Home, Shelf, Item screens from the Stitch designs. 1.5 + menu and Fab. 1.6 MiniSearch. 1.7 manifest + Serwist service worker so it installs and the shell opens offline. 1.8 install on the phone.
Files: `lib/db/*`, `components/shelf/*`, `components/layout/*`, `app/(app)/*`, `public/manifest.webmanifest`, `src/app/sw.ts`, `hooks/*`.
Learn: IndexedDB and Dexie live queries, service workers and caching, the manifest.
Gate: install on Android, add notes and shelves in airplane mode, search works.

### Phase 2: Auth, sync, export (data safety)
Steps: 2.1 Auth.js with Google. 2.2 Prisma tables for Shelf, Item, FileObject and the shared sequence. 2.3 `/api/sync/push` and `/api/sync/pull`. 2.4 sync engine, outbox, status indicator. 2.5 JSON export. 2.6 sync tests with two simulated devices. 2.7 test on phone + laptop.
Files: `server/*`, `app/api/*`, `lib/sync/*`, `lib/db/outbox.ts`, `tests/unit/sync*`.
Learn: OAuth sessions, idempotent APIs, cursors and change feeds, offline queues.
Gate: create offline on the phone, see it on the laptop after reconnect. **Kannu uses Nudge daily for 2 weeks.** Fix the pain points before Phase 3.

### Phase 3: Shelf types (Movies, Links, PDFs/Files, Code)
Steps: 3.1 type registry + zod schemas. 3.2 Movies (form, detail, status and vibe filters). 3.3 Links (open, copy, share, favicon). 3.4 Code (Shiki, Copy code). 3.5 PDFs and Files: presign, upload, confirm, download, Web Share with file, replace file, label filters. 3.6 type picker on New shelf; change shelf type; Inbox note conversion.
Files: `lib/types/*`, `components/item/types/*`, `lib/files/*`, `app/api/files/*`, `server/r2.ts`.
Learn: zod, presigned URLs, Web Share API, syntax highlighting.
Gate: all resume PDFs and the saved links/snippets moved into Nudge and usable daily.

### Phase 4: Locked shelves
Steps: 4.1 crypto module with unit tests first (known-answer tests, wrong password, tampered ciphertext). 4.2 lock/unlock flow and recovery key UI. 4.3 encrypt existing items on lock; decrypt on unlock. 4.4 encrypted files. 4.5 auto-lock, hidden from search/recents. 4.6 inspect the database and confirm only ciphertext is stored. 4.7 test Argon2 speed on a low-end phone.
Files: `lib/crypto/*`, `components/lock/*`, `lib/search` (exclude locked), `tests/unit/crypto*`.
Learn: symmetric encryption, nonces, key derivation, key wrapping, threat modelling.
Gate: tests pass, recovery key works, database shows no plaintext for locked shelves.

### Phase 5: Share target, more types, desktop
Steps: 5.1 `share_target` in manifest + service worker handler + `/share` screen. 5.2 Music, Courses (manual lessons first), Checklist. 5.3 desktop layout (sidebar tree, preview pane) and Ctrl+K palette. 5.4 accessibility and performance pass.
Files: `public/manifest.webmanifest`, `sw.ts`, `lib/pwa/share-target.ts`, `app/share/page.tsx`, `lib/types/*`, `components/layout/Sidebar.tsx`.
Learn: Web Share Target, multipart handling in a service worker, responsive layouts.
Gate: Share from YouTube or Chrome to Nudge works on Android; desktop layout is usable.

### Phase 6: Smart extras (optional layer, where the GenAI learning goes)
Steps: 6.1 Tonight picker with rules first (status, runtime if present, matching vibe words, who suggested). 6.2 auto-fill for movies (movie database and/or LLM, user can edit). 6.3 link summary. 6.4 embeddings in pgvector and hybrid search. 6.5 evals: 40 hand-labelled search queries (hit rate in top 5) and 30 mood-and-time queries (hit rate in top 3). 6.6 reminders and weekly digest.
Rules: AI only suggests; never overwrites user text; never sees locked or private items; cache results; handle 429 rate limits with backoff; recheck free-tier limits and data-use terms before starting.
Learn: structured LLM output, embeddings, hybrid search with Reciprocal Rank Fusion, evaluation.
Gate: eval numbers written in the README.

### Phase 7: Friends and polish
Steps: 7.1 public "suggest something" page (rate-limited, no login for the friend). 7.2 Ask chat over non-private items. 7.3 error tracking, performance audit, README with screenshots, demo video. 7.4 optional NestJS worker if background jobs are needed.
Gate: 3 friends use it.

---

## 12. Learning map

| Topic | Plain meaning (Hinglish) | Phase |
| --- | --- | --- |
| Next.js App Router | Routes aur server/client components kaise bante hain | 0, 1 |
| IndexedDB + Dexie | Browser ka apna database | 1 |
| Service worker, manifest | App ko install aur offline chalana | 1, 5 |
| Offline-first design | Pehle phone mein save, baad mein server pe | 1, 2 |
| OAuth / sessions | Google login kaise kaam karta hai | 2 |
| Change feeds and cursors | "Last baar ke baad kya badla" nikalna | 2 |
| Idempotency | Ek hi request do baar aaye toh bhi gadbad na ho | 2 |
| zod | Data ka shape check karna | 3 |
| Presigned URLs | Server ek temporary pass deta hai, file seedha storage mein jaati hai | 3 |
| Web Crypto, AES-GCM | Browser ka built-in encryption | 4 |
| Key derivation (Argon2id) | Password se strong key banana | 4 |
| Key wrapping | Ek key ko doosri key se lock karna | 4 |
| Threat modelling | Kis cheez se bachna hai, kis se nahi | 4 |
| Web Share Target | Doosri app se "Share to Nudge" | 5 |
| LLM structured output | AI se fixed format mein jawab lena | 6 |
| Embeddings, hybrid search | Matlab ke hisaab se search | 6 |
| Evals | AI kitni baar sahi hai, ye naapna | 6 |

Official docs to use first: MDN (IndexedDB, Web Crypto, Service Worker API), web.dev PWA course, Dexie docs, Next.js docs, Prisma docs, Neon docs, Cloudflare R2 docs. Ask Claude to confirm the current API before using it.

---

## 13. Working rules for Claude (put in `CLAUDE.md` too)

1. **Start of session:** read `docs/PROJECT_BRIEF.md`, `docs/PROGRESS.md`, `docs/DECISIONS.md`. Say in 3 lines where we are.
2. **One step at a time.** Work on exactly one step of the current phase. State a 5-line plan first, then do it.
3. **Teach while building.** Kannu wants to learn. Explain each new concept in short plain Hinglish with an analogy. After each step, list every file created or changed and what each one does (one line each).
4. **Small chunks.** Give code in pieces Kannu can read and run, not huge dumps. Always say the command to run and what he should see.
5. **Free only.** Never add a paid service. Before adding a service or dependency, state its free limits and any catch.
6. **Do not change decisions silently.** If a decision in this brief should change, explain why and ask. Log the change in `DECISIONS.md`.
7. **Verify before using APIs.** Library APIs and free-tier limits change. Check current docs or search before relying on them; say when unsure.
8. **Privacy.** Never send locked or private items to AI or logs. No secrets in code or chat. Use `.env`.
9. **Tests.** Sync and crypto need unit tests before the UI is built on them.
10. **Never invent crypto.** Use Web Crypto and a vetted library.
11. **Language:** Hinglish in chat; English in code, comments, commits and UI.
12. **End of session:** update `docs/PROGRESS.md` and give a 3-line resume prompt.
13. **Honesty:** if something Kannu asks will cost scope or cause problems later, say so plainly.
14. **Phase protocol:** before starting and before closing every phase, write a Phase kickoff and a Phase review (see below). A phase is closed only after its gate passes with proof and Kannu agrees.

### `docs/PROGRESS.md` template

```
# Progress
Last updated: YYYY-MM-DD
Current phase/step: Phase _, step _
Done: ...
In progress: ...
Next: ...
Blockers / questions: ...
Files created this session: path: one-line job
Metrics for resume (add as measured): ...
Resume prompt for next chat: (3 lines)
```

### Phase protocol (before and after every phase)

**Phase kickoff (before starting)**, written in `docs/PROGRESS.md` under "Phase N kickoff":
1. What is done so far.
2. What worked and what did not in the last phase.
3. Goal of this phase and the exact steps.
4. How each step will be tested ("what you should see").
5. Risks, and what we do if blocked.

**Phase review (before closing)**, written under "Phase N review":
1. What we built (files created or changed, one line each).
2. What worked.
3. What failed or needed a workaround, and why.
4. Test results and measured numbers.
5. Gate: pass or fail, with proof (screenshot, command output, URL).
6. Lessons learned and decisions to log in `DECISIONS.md`.
7. What changes in the next phase.

### `docs/DECISIONS.md` starting entries

```
D1 PWA (installable web app), not native. Reason: one codebase, Android share target, free, Kannu knows React.
D2 One Next.js app, no separate NestJS/Redis/Kafka for now. Reason: free hosts sleep; offline-first hides latency; fewer pieces. Revisit in Phase 6/7.
D3 Local-first with Dexie; server is sync hub and backup.
D4 Neon Postgres + Prisma; R2 for files. Supabase is the fallback.
D5 Client-side MiniSearch for V1 search.
D6 Last-write-wins sync with serverSeq cursor; single user.
D7 Locked shelf names are plaintext in V1; items and files are encrypted.
D8 Smart/AI layer is optional, last, and never touches locked or private data.
D9 One lock password per account (each shelf keeps its own key, so per-shelf passwords can be added later). One recovery key.
D10 Allowed files in V1: PDF, TXT, DOCX, PPTX; max 15 MB each; preview only PDF and TXT.
D11 Android phone first; desktop layout in Phase 5.
D12 Final name: Nudge.
```

---

## 14. Resume evidence to collect while building

- Number of shelf types, items, and daily active users (Kannu plus friends).
- Sync test results (two-device scenarios passing), offline use.
- Crypto: tests passing, "only ciphertext stored" check.
- Smart layer: measured hit rates from `evals/`.
- A short demo video and screenshots in the README.

---

## 15. Risks and open decisions

| Risk | Plan |
| --- | --- |
| Offline sync is the hardest part | Keep it single-user and last-write-wins; test heavily; build it before types |
| Free-tier rules change or conflict across sources (Neon storage 0.5 vs 1 GB, Gemini limits) | Recheck on signup; fallback Supabase; text data is tiny anyway |
| Vercel Hobby is non-commercial and has hard caps | Fine for a personal project; revisit if it becomes commercial |
| iPhone has no Share Target | Quick box and copy-paste; Telegram bot or native wrapper later |
| Safari may clear site storage for non-installed sites | Sync early; install the PWA; export button |
| Crypto mistakes | Standard primitives only, tests, "experimental" label, review |
| Scope creep | V1 types only until Phase 5 gate; new ideas go to a "Later" list |
| Neon wakes slowly after idle | Offline-first hides it; sync runs in background |

Decided on 2026-10-16: Android phone, name Nudge, files PDF/TXT/DOCX/PPTX up to 15 MB, one lock password per account, phone-first screens. Still open: none for Phase 0. Revisit when a phase needs a new decision.

---

## 16. Sources and verification

Checked on 2026-10-15 from web search results (official pages were not opened, and some third-party pages disagree). Recheck before you rely on any number.

- Supabase free plan: https://makerkit.dev/blog/saas/supabase-pricing , https://automationatlas.io/answers/supabase-free-tier-limits-2026/
- Neon plans: https://neon.com/pricing , https://neon.com/faqs/managed-postgres-databases-free-tier , https://neon.com/blog/neon-free-plan-1-gb-per-project
- Cloudflare R2 pricing: https://developers.cloudflare.com/r2/pricing/
- Render free services: https://render.com/docs/free
- Vercel Hobby plan: https://vercel.com/docs/plans/hobby
- Web Share Target (Android and ChromeOS, installed only): https://web.dev/learn/pwa/os-integration , https://web.dev/articles/workbox-share-targets
- Gemini API free tier: https://tinkerllm.com/blog/gemini-api-free-tier-limits-rate-quotas/ , https://geotoolbox.ai/blog/gemini-api-pricing
- Next.js installation (version 16.x docs, Node.js 20.9 or later): https://nextjs.org/docs/app/getting-started/installation
- shadcn/ui for Next.js: https://ui.shadcn.com/docs/installation/next
- Neon with Prisma (pooled and direct URLs, driver adapter): https://neon.com/docs/guides/prisma
- Vitest with Next.js: https://nextjs.org/docs/app/building-your-application/testing/vitest
