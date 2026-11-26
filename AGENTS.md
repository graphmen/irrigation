# Project Agent Instructions (`AGENTS.md`)

## Mandatory Design Governance

Before creating, editing, or restyling any UI component in `web-dashboard/` or `mobile-app/`:

1. **Read `DESIGN.md` first** and strictly follow its color tokens, 5-step typography scale, spacing rhythm, and Anti-AI-Slop rules.
2. **Never introduce** `text-[9px]`, `text-[10px]`, `text-[11px]`, `font-black`, `tracking-widest`, pastel rainbow card grids, pulsing `Live` badges, card hover-lift animations, or rainbow chart palettes.
3. **Preserve all 7 NIMIS modules** and the underlying mWater baseline questionnaire fields in `shared/surveySchema.js`.
4. **Always verify** with `npm run build` inside `web-dashboard` (and `mobile-app` when modified) before finishing.
