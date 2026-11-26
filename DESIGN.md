# NIMIS Design System (`DESIGN.md`)

Authoritative visual design tokens, typography scale, and anti-AI-slop rules for the **National Irrigation Management Information System (NIMIS)** — Department of Irrigation Development, Republic of Zimbabwe.

---

## 1. Color Tokens (Disciplined Institutional Palette)

| Token | Hex | Usage |
| :--- | :--- | :--- |
| `--color-canvas` | `#F6F6F2` | Page background (warm alabaster stone) |
| `--color-surface` | `#FFFFFF` | All primary cards, tables, modals, sidebar |
| `--color-surface-subtle` | `#FAF9F6` | Table headers, filter bars, row hover |
| `--color-border` | `#E7E5E0` | 1px hairline card & layout dividers |
| `--color-border-strong` | `#D6D3CB` | Hover borders, inputs |
| `--color-forest` | `#133A26` | Top Ministry header, active nav, primary CTA, primary hero KPI card |
| `--color-botanical` | `#2D7A4D` | Primary chart stroke, positive progress bars, functional status dot |
| `--color-earth` | `#C88A2E` | Warning / partial status dot, secondary chart accent |
| `--color-water` | `#1E5B88` | Hydrology / rehabilitation indicator |
| `--color-danger` | `#C53030` | Critical / non-functional / behind status dot |
| `--color-ink` | `#141A16` | Primary headings & figures |
| `--color-ink-secondary` | `#525E56` | Secondary labels & body copy |
| `--color-ink-muted` | `#738077` | Metadata, dates, table secondary lines |

**Chart Palette (Cohesive Botanical/Slate — Never Rainbow):**
`['#133A26', '#2D7A4D', '#5F9E78', '#9BC2AA', '#C88A2E', '#CBD5E1']`

---

## 2. Typography Rules (Strict 5-Step Scale)

- **Display / Headings Font:** `Plus Jakarta Sans`, weights `600` (semibold) and `700` (bold), letter-spacing `-0.025em`.
- **Body / UI / Data Font:** `Inter`, weights `400` (regular), `500` (medium), `600` (semibold).
- **Numerals:** Always use `font-variant-numeric: tabular-nums` on KPIs, tables, percentages, and coordinates.

| Role | Size | Weight | Line Height | Tracking | Case |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **KPI Display Number** | `28px–30px` (`1.75rem–1.875rem`) | `700` | `1.1` | `-0.03em` | Numeric (`tabular-nums`) |
| **Page Title (H2)** | `22px` (`1.375rem`) | `700` | `1.25` | `-0.025em` | Sentence case |
| **Card / Section Heading (H3)** | `15px–16px` (`0.95rem–1rem`) | `600` | `1.35` | `-0.015em` | Sentence case |
| **Body / Nav / Table Cell** | `14px` (`0.875rem`) | `400–500` | `1.5` | `0` | Sentence case |
| **Caption / Table Header / Meta** | `12px` (`0.75rem`) | `500` | `1.4` | `0` | Sentence case |

### Hard Typography Bans
1. **No micro-text below `12px`** — never use `text-[9px]`, `text-[10px]`, or `text-[11px]`.
2. **No `font-black` (`900`)** — maximum weight across the entire app is `700` (`font-bold`).
3. **No `tracking-widest` / `tracking-wider` uppercase labels** — use clean sentence case instead of shouting uppercase headers.

---

## 3. Spacing, Radius & Surface Discipline

- **Grid Rhythm:** 4px base unit (`p-5` standard card padding, `gap-4` or `gap-5` between grid items).
- **Border Radius:** `rounded-xl` (`12px`) for cards/panels, `rounded-lg` (`8px`) for buttons/inputs/tabs, `rounded-md` (`6px`) for subtle tags.
- **Borders & Shadows:** `1px solid #E7E5E0` with minimal `0 1px 2px rgba(20, 26, 22, 0.03)` shadow.

---

## 4. Anti-AI-Slop Checklist (Strictly Banned)

- **No fake pulsing `• Live` badges** unless backed by real-time telemetry (also required by NIMIS Concept Note Section 7).
- **No pastel rainbow KPI cards** (`bg-sky-50`, `bg-amber-50`, `bg-rose-50`, `bg-violet-50` tiled together). All cards are `#FFFFFF` (with at most one `#133A26` hero card per view).
- **No hover-lift bounce animations** (`transform: translateY(-1px)`) on static cards.
- **No emojis in navigation, tables, or buttons** — use crisp vector icons only.
- **No rainbow bar/pie charts** — always use the botanical/slate palette, horizontal-only dashed gridlines (`#ECEAE4`), hidden axis lines/ticks, and dark `#141A16` tooltips.
- **No bulky solid status rectangles** — use an `8px` colored status dot + clean `#141A16` text.
