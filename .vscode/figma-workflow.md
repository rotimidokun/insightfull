# Figma-to-Code Workflow

## The Strategy: Gather First, Code Once

The key to pixel-perfect implementation in one shot is collecting ALL design data before writing any code.

---

## The Golden Rule: Every Page MUST Match Figma — Do Not Just Glimpse

After building a page, do a **rigorous, element-by-element comparison** against the
Figma reference — NOT a quick glance. "It looks close" is a fail; "every element
matches" is the pass. Before calling a page done, verify each of these against BOTH
the node data and the reference screenshot (captured at the Figma frame's width):

1. **Every section/element is present** — cross-check the design against what you
   built: nothing missing, nothing extra. If the data doesn't make clear what fills a
   region, confirm it against the screenshot/asset list before assuming.
2. **Elements keep their intended size** — a fixed-size container keeps its exact
   bounds; embedded content (image/video/embed) is fitted INSIDE it (cover/contain),
   never growing the container.
3. **Exact values** — colors (hex), font family/weight/size/line-height/letter-spacing,
   spacing, padding, gaps, borders/radius. No "close enough."
4. **Exact text** — `characters` verbatim, plus the correct transform (uppercase /
   capitalize / none) as seen in the screenshot.
5. **Layout geometry** — element positions, column widths, alignment, and the exact
   gaps between sections.

Screenshot YOUR build at the Figma frame's width and compare it side-by-side with the
Figma export, region by region (header → each section → footer). Any region that does
not match is a defect — fix it before handoff.

---

## Step 0: Take a Screenshot (MANDATORY)

When provided with a Figma link or node ID, **always take a screenshot first** using `mcp_figma-bridge_save_screenshots` (or the HTTP RPC fallback in Step 0.5). This serves as your visual reference to compare against throughout implementation.

- Save to `.vscode/figma-[section-name].png`
- View the screenshot with `view_image` so you understand what you're building
- Use this as your north star — after writing code, mentally compare every element against this image
- If something in the extracted JSON seems ambiguous, the screenshot is the tiebreaker

---

## Step 0.5: If MCP tools aren't in your tool list — drive the bridge via HTTP/RPC

**Symptom:** You can see `figma-bridge` configured in `.vscode/mcp.json` but `mcp_figma-bridge_*` tools don't appear in your available functions.

**Why it happens:** MCP tools get registered per-session by the IDE. Some model clients surface them reliably (Cursor, Claude Desktop), others don't. A missing tool list doesn't mean the bridge is dead — it usually means the IDE is running its own bridge instance as a `LEADER` on a local port.

**The unlock:** the bridge exposes an HTTP RPC surface that any HTTP client can drive, even when the MCP tool surface is unavailable.

### Procedure

1. **Probe the leader:**
   ```bash
   curl -s http://localhost:1994/ping
   # -> {"status":"ok","version":"0.0.16"}
   ```
   If that responds, the IDE's bridge LEADER is alive and the Figma plugin in the browser is connected to it.

2. **Discover connected files:**
   ```bash
   curl -s -X POST http://localhost:1994/rpc \
     -H "Content-Type: application/json" \
     -d '{"tool":"list_files","nodeIds":[],"params":{}}'
   # -> {"data":[{"fileKey":"unsaved-XXXX","fileName":"Wema GL (Copy)"}]}
   ```
   **Note:** the `fileKey` for a local unsaved file is `unsaved-XXXXXXXX`, NOT the public share key from the figma URL. Always use the `fileKey` returned by `list_files`, never the URL key.

3. **Fetch a node's design data:**
   ```bash
   curl -s -X POST http://localhost:1994/rpc \
     -H "Content-Type: application/json" \
     -d '{"tool":"get_node","nodeIds":["205:25326"],"params":{},"fileKey":"unsaved-XXXX"}'
   ```
   Returns full auto-layout, padding, fills, font, image-hash data.

4. **Save screenshots to disk:**
   ```bash
   curl -s -X POST http://localhost:1994/rpc \
     -H "Content-Type: application/json" \
     -d '{
       "tool":"save_screenshots","nodeIds":[],
       "params":{
         "format":"PNG","scale":2,
         "items":[
           {"nodeId":"205:25326","outputPath":".vscode/figma-confirm.png"},
           {"nodeId":"380:13756","outputPath":".vscode/figma-loading.png"}
         ]
       },
       "fileKey":"unsaved-XXXX"
     }'
   ```
   **Gotchas:**
   - The `format` field is **uppercase** (`"PNG"`, `"SVG"`, `"JPG"`, `"PDF"`) — the schema rejects lowercase.
   - Paths are relative to the **bridge's CWD**, which is normally the project root.
   - `outputPath` is per-item, not top-level.
   - `save_screenshots` can flake with `"Unable to establish connection to Figma after 10 seconds"` for image-fill assets — retry, or fall back to `get_screenshot` + base64 decode.

5. **Export an image asset (Figma-hosted image fill):**
   ```bash
   curl -s -X POST http://localhost:1994/rpc \
     -H "Content-Type: application/json" \
     -d '{"tool":"get_screenshot","nodeIds":["I205:25765;192:4763"],"params":{"format":"PNG","scale":4},"fileKey":"unsaved-XXXX"}'
   ```
   Returns JSON with `data.exports[0].base64`. Decode it to a PNG:
   ```bash
   node -e "const d=JSON.parse(require('fs').readFileSync('resp.json','utf8'));require('fs').writeFileSync('public/asset.png',Buffer.from(d.data.exports[0].base64,'base64'))"
   ```

6. **After editing components in figma, refresh design data:**
   The data returned by `get_node` is point-in-time. If the designer edits a node while you're working, re-fetch before applying changes — don't trust your cached copy.

### Tool wire format

The `/rpc` endpoint accepts JSON in this shape:
```json
{
  "tool": "<toolName>",
  "nodeIds": ["..."],
  "params": { ...tool-specific },
  "fileKey": "unsaved-XXXX"
}
```

For full schemas, see the bridge repo:
- `server/src/leader.ts` — endpoint definitions
- `server/src/schema.ts` — per-tool arg validation
- https://github.com/gethopp/figma-mcp-bridge

### If `/ping` doesn't respond

The IDE's bridge isn't running. Either:
- Restart VS Code so it spawns the MCP server from `.vscode/mcp.json`, or
- Run it manually: `npx -y @gethopp/figma-mcp-bridge` — but it will start as FOLLOWER with no LEADER to attach to, so you'll need the IDE to own the leader.

Don't kill node.exe processes to "clean up" the bridge — the IDE-managed leader is one of them and you'll break MCP for future sessions.

---

## Step 1: Gather Everything

Before touching any code, collect:

1. **Figma node data** — exact styles (padding, gaps, colors, font sizes, weights, radii, borders)
2. **Text content** — extract all text nodes with their styles via `get_node`. **Don't paraphrase.** The figma `characters` value is the source of truth, even if it feels slightly awkward — designers chose those words deliberately.
3. **Icons & image assets** — for **SVG-style icons**, copy from figma or screenshot small icon frames. For **IMAGE fills** (Figma-hosted raster assets), export via `get_screenshot` + base64 decode (see Step 0.5.5). Don't try to recreate them as inline SVG — they'll never match.
4. **Current code** — read the existing file to understand what's there
5. **Reference the tool catalog** — read `docs/figma-mcp-tools.md` for the full list of 30 available MCP tools before improvising.

## Step 2: Extract Key Properties from Figma JSON

For every element, note:

| Property | Where to find it |
|----------|----------------|
| Background | `fills[0].color` |
| Border | `strokes[0].color`, `strokeWeight` |
| Corner radius | `cornerRadius` |
| Padding | `padding.top/right/bottom/left` |
| Gap between children | `autoLayout.gap` |
| Layout direction | `autoLayout.direction` (VERTICAL/HORIZONTAL) |
| Alignment | `autoLayout.primaryAxisAlign`, `counterAxisAlign` |
| Font size | `fontSize` |
| Font weight | `fontWeight` (400=regular, 500=medium, 600=semibold, 700=bold) |
| Text color | `fills[0].color` on TEXT nodes |
| Width/height constraints | `primaryAxisSizing`, `counterAxisSizing` (AUTO vs FIXED) |
| Image fill | `fills[0].imageHash` (note for asset export) |

## Step 3: Map to CSS/Tailwind

- Use **exact pixel values**: `p-[15px]`, `gap-[7.5px]`, `rounded-[20px]`
- Use **exact hex colors**: `text-[#262626]`, `bg-[#F2F2F2]`
- For Quicksand font (used heavily in this project): `style={{ fontFamily: "Quicksand, sans-serif" }}` or add to your Tailwind config
- Never round or approximate values
- Check if `autoLayout.primaryAxisAlign` is `SPACE_BETWEEN` → use `justify-between`

## Step 4: Write the Code

- Rewrite the component completely (don't patch)
- Follow the Figma layer hierarchy: outer → inner
- For IMAGE fills (Figma-hosted assets), use `<Image src="/asset.png" />` from `public/` — don't try to recreate them as inline SVG
- Verify TypeScript compiles after changes

### Preserve Existing API Integrations

If the project already has APIs integrated (e.g., React Query hooks, fetch calls, data transformations), **keep them wired up**. The goal is to change the UI to match Figma while preserving all working data flows.

Before rewriting a component:
1. Identify all API hooks/queries used (e.g., `useQuery`, `useMutation`, data props)
2. Identify data transformations and conditional rendering based on API state (`isLoading`, `isError`, empty data)
3. Identify fallback/dummy data patterns

When writing the new UI:
- Keep the same hook calls and variable names
- Keep conditional rendering logic (loading states, error states, empty states)
- Only change the JSX structure, class names, and visual styling
- If the component receives data via props, keep the prop interface intact
- If there's an export/download action wired to an API, preserve the handler

## Step 5: Verification Checklist (MANDATORY)

After writing the code, go through EVERY element and cross-check against the extracted Figma data. Do NOT skip this step.

For **each container/frame** in the code, verify:
- [ ] `fills` → correct `bg-[#hex]` (not guessed, not "close enough")
- [ ] `strokes` → `border border-[#hex]` present if strokes array is non-empty
- [ ] `strokeWeight` → correct border width (default 1px)
- [ ] `cornerRadius` → correct `rounded-[Npx]`
- [ ] `padding` → correct `p-[N]` / `px-[N] py-[N]` (check all 4 sides)
- [ ] `autoLayout.gap` → correct `gap-[Npx]`
- [ ] `autoLayout.direction` → `flex-col` (VERTICAL) or `flex-row` (HORIZONTAL)

For **each text node**, verify:
- [ ] `fontSize` → correct `text-[Npx]` or `text-sm`/`text-xs` etc
- [ ] `fontWeight` → correct `font-medium`/`font-semibold`/`font-bold`
- [ ] `fills[0].color` → correct `text-[#hex]`
- [ ] `lineHeight` (if not AUTO) → correct `leading-[N%]`
- [ ] `characters` value matches **exactly** — no paraphrasing

For **icons**, verify:
- [ ] Actual SVG from Figma (not guessed/emoji) for SVG-style icons
- [ ] Image asset file in `public/` for IMAGE fills (not inline SVG)
- [ ] Correct width/height dimensions

For **layout alignment**, verify:
- [ ] `items-start` vs `items-center` — check how children actually align
- [ ] `primaryAxisAlign` MAX/MIN — translate to `justify-end`/`justify-start` correctly
- [ ] Button/element positioning (left/center/right)
- [ ] Width behavior (full-width `w-full` vs auto-sized)

### The Rule:
> If the Figma JSON has a non-empty `strokes` array → the code MUST have a `border` class.
> If the Figma JSON has a `fills` color → the code MUST use that exact color.
> If the Figma text says "Yes" — the code says "Yes", not "Deactivate". The figma copy is the source of truth.
> NEVER change a value that was correctly extracted unless the user explicitly asks.

---

## Utility Script: Extract Text Styles from Figma JSON

```javascript
node -e "
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('PATH_TO_FIGMA_JSON'));
function findTexts(node, results=[]) {
  if (node.characters) results.push({
    text: node.characters,
    fontSize: node.styles?.fontSize,
    fontWeight: node.styles?.fontWeight,
    color: node.styles?.fills?.[0]?.color
  });
  if (node.children) node.children.forEach(c => findTexts(c, results));
  return results;
}
console.log(JSON.stringify(findTexts(data), null, 2));
"
```

## Utility Script: Find Elements by Name

```javascript
node -e "
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('PATH_TO_FIGMA_JSON'));
function find(node, name, results=[]) {
  if (node.name?.includes(name)) results.push({
    id: node.id, name: node.name,
    fills: node.styles?.fills,
    cornerRadius: node.styles?.cornerRadius,
    padding: node.styles?.padding
  });
  if (node.children) node.children.forEach(c => find(c, name, results));
  return results;
}
console.log(JSON.stringify(find(data, 'TARGET_NAME'), null, 2));
"
```

---

## Common Mistakes to Avoid

- ❌ Guessing colors — always use exact hex from Figma
- ❌ Using emoji for icons — export actual SVG from Figma
- ❌ Recreating Figma IMAGE fills as inline SVG — they'll never match. Export the asset.
- ❌ Adding borders when Figma has none (different bg creates visual separation)
- ❌ Wrong progress bar thickness (check actual height in px)
- ❌ Approximating font sizes (12px ≠ 14px ≠ 16px — use exact value)
- ❌ Ignoring `autoLayout.gap` — this is what creates spacing between siblings
- ❌ Forgetting strokes — if `strokes[]` is non-empty, you MUST add `border border-[color]`
- ❌ Flipping between correct and wrong values — if Figma says `#F5F7F8`, never change it to white unless user explicitly says so
- ❌ Making buttons full-width when Figma shows auto-sized (check for `layoutGrow` or `FILL` sizing)
- ❌ Wrong alignment (items-start vs items-center) — look at the horizontal layout and how icon aligns with text block
- ❌ **Paraphrasing figma text** — if figma says "Are you sure about this?" don't write "Are you sure you want to deactivate this rule?". Designers chose those words.
- ❌ Coding before gathering all data — leads to multiple correction rounds
- ❌ Using `head`/`grep`/`tail` on Windows cmd.exe — they're Unix tools, not available by default
- ❌ Declaring a page "matches" after a glance — compare your build to the Figma export element-by-element at the same width, region by region
- ❌ Letting embedded content (image/video) resize a fixed container — fit the content inside; keep the container's exact bounds
- ❌ Assuming a region with no data means "no content" — confirm against the design what belongs there before leaving it blank

---

## Checklist Before Writing Code

- [ ] Got Figma node JSON for the section
- [ ] Extracted all text nodes with styles (exact `characters` values)
- [ ] Identified icon sources (SVG from figma vs IMAGE asset to export)
- [ ] Exported any IMAGE-fill assets to `public/` via `get_screenshot` + base64 decode
- [ ] Read the current component code
- [ ] Noted container styles (bg, border, radius, padding)
- [ ] Noted header layout (alignment, gap, children styles)
- [ ] Noted content area styles (inner cards, lists, tables)
- [ ] Noted status/badge variants (colors, radius, padding)
- [ ] Confirmed `fileKey` via `list_files` if using direct HTTP/RPC fallback
