# Tetris v1 (single-player) — Design Spec

**Date:** 2026-07-24
**Status:** Approved (v1 scope), pending final read-through before implementation planning

## Purpose

Portfolio project. A Tetris implementation differentiated by two features planned for
a later phase: real-time multiplayer and player "skills"/powers. This spec covers only
**v1: a complete, polished single-player Tetris**. Multiplayer and skills are explicitly
out of scope here and will get their own spec once v1 ships.

## Scope

**In scope (v1):**
- Full core Tetris: 10x20 board, 7 standard pieces, rotation, soft/hard drop, line
  clear, scoring, level-based speed increase, game over
- Ghost piece (landing preview)
- Hold piece
- Next piece preview
- Keyboard input only
- Local high score (persisted in the browser)

**Explicitly out of scope (deferred to phase 2, alongside multiplayer):**
- Skills/powers — decided against including in v1 even in single-player form, to avoid
  redesigning the architecture once multiplayer introduces player-vs-player skill
  interactions (e.g., sending garbage lines, disrupting an opponent)
- Multiplayer / networking
- Touch/mobile input
- Any backend/server

## Tech stack

- **Language:** TypeScript, no UI framework
- **Rendering:** Canvas API (2D context) for the game board
- **UI overlay (score, hold, next, game over):** plain HTML/CSS, positioned around/over
  the canvas — no framework. Rejected React/Vue/etc. for this layer: the UI surface is
  4-5 static panels, which doesn't justify framework overhead (YAGNI). Revisit only if
  the UI grows substantially more complex, which is not expected even after phase 2.
- **Build tool:** Vite
- **Testing:** Vitest, focused on the `game/` module (pure logic, no DOM dependency)
- **Deployment:** Vercel (static build). Known limitation flagged for phase 2: Vercel's
  serverless functions are not suited to persistent WebSocket connections needed for
  multiplayer — that phase will likely need a separate host (e.g., Fly.io, Railway,
  Render) for the realtime server, with the front-end remaining on Vercel.

## Architecture

```
tetris/
├── src/
│   ├── game/          # pure game logic (board, pieces, collision, score) — no DOM/Canvas
│   ├── render/         # Canvas rendering layer, reads game state and draws it
│   ├── input/           # keyboard capture, translated into intents (moveLeft, rotateCW, ...)
│   ├── ui/               # HTML/CSS overlay (score, hold, next, game over)
│   ├── main.ts        # game loop; wires input -> game -> render/ui
│   └── persistence/  # high score via localStorage
├── tests/            # Vitest unit tests for game/
├── docs/
│   └── specs/         # one design doc per step/feature
└── CLAUDE.md
```

Core principle: `game/` has no knowledge of Canvas, DOM, or keyboard — it only receives
intents and returns new state. This keeps game logic fully unit-testable and means
swapping keyboard input for network input (or adding skills) later doesn't require
touching `game/`'s internals, only its inputs.

## Rotation system

**SRS (Super Rotation System) with wall kicks** — the industry-standard system used by
modern Tetris (Tetris Guideline), not a naive fixed-4-state rotation. Each piece has 4
rotation states plus a wall-kick offset table (the "I" piece uses a different table from
the others); if a direct rotation would collide, the system tries a small set of
alternate offsets before rejecting the rotation.

Rejected naive rotation (rotate-or-block-if-colliding): simpler to implement, but "feels
wrong" to anyone who has played real Tetris, since rotations that should succeed near
walls/stacks are blocked. The wall-kick table adds data complexity, not architectural
complexity, so the cost is justified by the perceptual quality gain.

## Piece generation

**7-bag randomizer**: shuffle a bag containing exactly one of each of the 7 pieces,
deal from it, and reshuffle a new bag once empty. Guarantees no piece is absent for
more than one bag's length, avoiding unfair droughts a naive random pick could produce.

## Game loop

Piece gravity runs on a **delta-time accumulator**, decoupled from the browser's frame
rate: each frame measures elapsed time and only triggers "piece falls one row" once the
accumulator crosses the current level's fall interval. This keeps fall speed consistent
across machines/frame rates rather than tying it to `requestAnimationFrame` timing.

## Data flow

```
Keyboard → input/ (translates key to intent: moveLeft, rotateCW, softDrop, hardDrop, hold)
         → game/ (applies intent to state: collision, SRS, line clear, scoring)
         → new game state
         → render/ draws the board to Canvas
         → ui/ updates score, next, hold via DOM
```

One-way flow, no hidden back-channels: input doesn't know about render, render doesn't
know about input. Enables testing `game/` in isolation and swapping any single layer
(e.g., input source) without touching the others.

## Scoring and leveling

Standard Tetris Guideline scoring table:
- Single (1 line): 100 × level
- Double (2 lines): 300 × level
- Triple (3 lines): 500 × level
- Tetris (4 lines): 800 × level
- Soft drop: 1 pt/cell; hard drop: 2 pts/cell

Level increases every 10 lines cleared; fall interval decreases per a standard speed
curve.

## Persistence

High score stored in `localStorage`. No backend in v1 — there's no user account
concept yet (that would only become relevant with multiplayer), so nothing beyond local
storage is warranted now.

## Testing strategy

- **Vitest**, covering `game/`: collision, SRS rotation + wall kicks, line clearing,
  scoring, 7-bag distribution, level transitions.
- **`render/` and `input/`**: validated by running the game manually rather than unit
  tested — low return on investment for Canvas pixel output and keyboard event wiring.

## Error handling

No exception-based error states. An invalid move (blocked rotation, collision) is
simply rejected by game logic — this is normal gameplay behavior, not an error. The only
terminal state is game over, handled as an explicit state, not an exception.

## Working conventions for this project

(See project memory `project_workflow_conventions` for the full agreement.)
- Senior-level critical review at every step, not just implementation on request
- Specs before code (this document), reviewed implementation plan before code
  (`writing-plans` skill), tests alongside code, atomic Conventional-Commits-style
  commits
- On-demand review subagent available at key decision points, invoked by the user
- Commits use only the user's own git identity — no AI co-author trailer
