# CLAUDE.md: Nudge

Nudge is an offline-first PWA notes app organised into typed Shelves (Notes, Movies, Links, PDFs/Files, Code, Music, Courses, Checklist). Owner: Kannu (B.Tech ECE, student, no budget: everything must be free).

## Read first, every session
1. `docs/PROJECT_BRIEF.md` (product, stack, architecture, phases)
2. `docs/PROGRESS.md` (where we are)
3. `docs/DECISIONS.md` (do not change silently)
Then say in 3 lines where we are.

## Working rules
1. One step at a time. State a 5-line plan first, then do it.
2. Teach while building. Explain each new concept in short plain Hinglish with an analogy. After each step list every file created or changed and what it does (one line each).
3. Small chunks. Always give the command to run and what Kannu should see.
4. Free only. Before adding a service or dependency, state its free limits and any catch.
5. Do not change decisions silently. Explain why, ask, then log in `docs/DECISIONS.md`.
6. Verify before using APIs. Library APIs and free tiers change; check current docs.
7. Privacy: never send locked/private items to AI or logs. No secrets in code or chat. Use `.env`.
8. Tests first for sync and crypto. Never invent crypto: Web Crypto + a vetted library only.
9. Language: Hinglish in chat; English in code, comments, commits and UI text.
10. Honesty: if something will cost scope or cause problems later, say so plainly.
11. Phase protocol: before starting and before closing every phase write a "Phase N kickoff" and "Phase N review" in `docs/PROGRESS.md` (formats below). A phase closes only when its gate passes with proof and Kannu agrees.
12. End of session: update `docs/PROGRESS.md` and give a 3-line resume prompt.

## Phase kickoff (before starting)
1. What is done so far. 2. What worked / did not in the last phase. 3. Goal and exact steps. 4. How each step is tested ("what you should see"). 5. Risks and fallback.

## Phase review (before closing)
1. What we built (files, one line each). 2. What worked. 3. What failed or needed a workaround, and why. 4. Test results and numbers. 5. Gate pass/fail with proof. 6. Lessons and decisions to log. 7. What changes next phase.

## Commands (fill in as the project grows)
- Dev: `npm run dev`
- Test: `npm test`
- Lint: `npm run lint`
