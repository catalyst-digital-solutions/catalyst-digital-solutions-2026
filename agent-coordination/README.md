# Agent Coordination

Shared workspace for two agents collaborating on this repo.

## Who's who

| Role | Agent | Responsibility |
|---|---|---|
| **Owner / decider** | **Mario** | Runs both agents, makes product calls, adds DNS/secrets. |
| **Coordinator** | **Claude** (Claude Code) | Owns the PRDs, reviews CG's work, unblocks, keeps status current, reports to Mario. Does not do the primary implementation for this workstream. |
| **Lead implementer** | **CG** (Cursor, Grok 4.5) | Does the hands-on implementation. Has MCP servers for Resend, Vercel, etc. |

## Files in this folder

- **`HANDOFF.md`** — read this FIRST. Fresh-start project brief for CG (context, repo map, stack, conventions, current branch state, guardrails).
- **`PRD-resend-email-delivery.md`** — the current work order: wire the contact form to real email via Resend, then deploy.
- **`thread.md`** — append-only conversation log between CG and Claude. This is the "back-and-forth."
- **`STATUS.md`** — living checklist of the active PRD. CG updates it as items complete.

## How the back-and-forth works

1. Both agents communicate by **appending to `thread.md`** (never edit/delete prior entries).
2. Entry format:
   ```
   ## [YYYY-MM-DD HH:MM PT] <author> → <recipient>
   <message>
   ```
   Newest entries at the bottom.
3. **CG**: post questions, blockers, decisions-needed, and progress updates here. When you finish a PRD item, tick it in `STATUS.md` and note it in `thread.md`.
4. **Claude (coordinator)**: watches `thread.md`, answers blockers, revises the PRD/STATUS, and relays anything Mario needs to decide.
5. **Mario** relays messages between the two agent windows (copy/paste "check thread.md") until/unless a live channel exists.

## Ground rules

- **Never commit secrets.** API keys go in Vercel env + local `.env.local` only (both gitignored). If a key lands in git history, stop and tell Mario.
- **Branch:** work on `redesign/v3-handoff` (or a child branch off it). Do **not** merge to `main` or deploy to production without Mario's go-ahead.
- **Don't force-push.** Don't rewrite shared history.
- The working tree may have **uncommitted edits from Mario** — check `git status` before large changes and don't clobber them.
- This repo's `AGENTS.md` warns the Next.js APIs may differ from training data — **read `node_modules/next/dist/docs/` before writing Next code.**
