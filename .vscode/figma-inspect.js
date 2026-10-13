// Figma node JSON inspector - companion to .vscode/figma-workflow.md utility scripts.
// Schema: node = { id, name, type, bounds:{x,y,width,height}, styles:{...}, characters?, children?[] }
// Usage: node .vscode/figma-inspect.js <input.json> <inventory.txt>
const fs = require('fs');

const input = process.argv[2] || '.vscode/figma-landing.json';
const outFile = process.argv[3] || '.vscode/figma-inventory.txt';

const raw = JSON.parse(fs.readFileSync(input, 'utf8'));
const root =
  (raw.data && (raw.data.node || raw.data.root || raw.data)) ||
  raw.node ||
  raw.root ||
  raw;

fs.writeFileSync(input.replace(/\.json$/, '-pretty.json'), JSON.stringify(raw, null, 2));

const lines = [];
const texts = [];
const images = [];
const colorSet = new Set();
const fontSet = new Set();

function toHex(c) {
  if (!c) return null;
  if (typeof c === 'string') return c;
  if (c.hex) return c.hex;
  return JSON.stringify(c);
}

function fillInfo(fills) {
  if (!Array.isArray(fills) || !fills.length) return '';
  return fills
    .map((f) => {
      if (f && (f.type === 'IMAGE' || f.imageHash)) return 'IMAGE:' + (f.imageHash || '?');
      return toHex((f && f.color) || f) + (f && f.opacity != null && f.opacity !== 1 ? '@' + f.opacity : '');
    })
    .join(',');
}

function walk(x, depth) {
  const st = x.styles || {};
  const al = st.autoLayout || {};
  const pad = st.padding || {};
  const b = x.bounds || {};
  const fills = fillInfo(st.fills);
  const strokes = fillInfo(st.strokes);
  const radius = st.cornerRadius;
  const fs_ = st.fontSize;
  const fw = st.fontWeight;
  const lh = st.lineHeight;
  const fam = st.fontFamily;

  if (fills && !fills.startsWith('IMAGE')) fills.split(',').forEach((c) => colorSet.add(c.split('@')[0]));

  const meta = [];
  if (al.direction) meta.push('dir=' + al.direction);
  if (al.gap != null) meta.push('gap=' + al.gap);
  const p = [pad.top, pad.right, pad.bottom, pad.left];
  if (p.some((v) => v != null && v !== 0)) meta.push('pad=' + p.map((v) => (v ?? 0)).join('/'));
  if (fills) meta.push('bg=' + fills);
  if (strokes) meta.push('stroke=' + strokes + '@' + (st.strokeWeight ?? 1) + 'px');
  if (radius != null && radius !== 0) meta.push('r=' + radius);
  if (al.primaryAxisAlign) meta.push('pAlign=' + al.primaryAxisAlign);
  if (al.counterAxisAlign) meta.push('cAlign=' + al.counterAxisAlign);
  if (al.primaryAxisSizing) meta.push('pSize=' + al.primaryAxisSizing);
  if (al.counterAxisSizing) meta.push('cSize=' + al.counterAxisSizing);
  if (x.layoutGrow) meta.push('grow=' + x.layoutGrow);

  const out = [];
  out.push('  '.repeat(depth) + 'L' + depth + ' ' + x.id + ' [' + x.type + '] "' + x.name + '"');
  out.push('    pos=' + (b.x ?? '?') + ',' + (b.y ?? '?') + ' size=' + (b.width ?? '?') + 'x' + (b.height ?? '?'));
  if (meta.length) out.push('    ' + meta.join(' | '));

  if (x.characters != null) {
    out.push('    TEXT: ' + JSON.stringify(x.characters));
    out.push(
      '    font=' +
        (fam || '?') +
        ' size=' +
        (fs_ ?? '?') +
        ' weight=' +
        (fw ?? '?') +
        ' style=' +
        (st.fontStyle ?? '?') +
        ' lh=' +
        (lh != null ? JSON.stringify(lh) : 'AUTO') +
        ' ls=' +
        (st.letterSpacing != null ? JSON.stringify(st.letterSpacing) : '?') +
        ' align=' +
        (st.textAlignHorizontal ?? '?')
    );
    if (fam) fontSet.add(fam + ' ' + (st.fontStyle ?? '') + ' ' + (fw ?? ''));
    texts.push({
      id: x.id,
      name: x.name,
      characters: x.characters,
      fontFamily: fam,
      fontStyle: st.fontStyle,
      fontSize: fs_,
      fontWeight: fw,
      lineHeight: lh,
      letterSpacing: st.letterSpacing,
      color: fills,
      align: st.textAlignHorizontal,
    });
  }

  const fillList = Array.isArray(st.fills) ? st.fills : [];
  const imgFill = fillList.find((f) => f && (f.type === 'IMAGE' || f.imageHash));
  if (imgFill) {
    images.push({ id: x.id, name: x.name, imageHash: imgFill.imageHash, w: b.width, h: b.height });
    out.push('    IMAGE-FILL hash=' + imgFill.imageHash);
  }
  if (x.type === 'VECTOR' || x.type === 'BOOLEAN_OPERATION' || x.type === 'STAR' || x.type === 'POLYGON') {
    out.push('    VECTOR-ASSET export as SVG');
  }

  lines.push(out.join('\n'));
  (x.children || []).forEach((c) => walk(c, depth + 1));
}

walk(root, 0);

lines.push('');
lines.push('==== TEXT INVENTORY (' + texts.length + ') ====');
texts.forEach((t) => lines.push(JSON.stringify(t)));
lines.push('');
lines.push('==== IMAGE FILLS (' + images.length + ') ====');
images.forEach((i) => lines.push(JSON.stringify(i)));
lines.push('');
lines.push('==== UNIQUE COLORS ====');
lines.push([...colorSet].join(', '));
lines.push('==== FONTS ====');
lines.push([...fontSet].join(' | '));

fs.writeFileSync(outFile, lines.join('\n'));
console.log('texts=' + texts.length + ' images=' + images.length + ' colors=' + colorSet.size);
console.log('FONTS: ' + [...fontSet].join(' | '));
console.log('COLORS: ' + [...colorSet].join(', '));
