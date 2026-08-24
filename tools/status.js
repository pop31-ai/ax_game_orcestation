#!/usr/bin/env node
"use strict";
/* orchestra-status: парсит PLAN-*.md, считает прогресс фаз, пишет STATUS.md */
const fs = require("fs");
const path = require("path");
const DIR = path.join(__dirname, "..");

function parsePlan(file) {
  const lines = fs.readFileSync(path.join(DIR, file), "utf8").split("\n");
  const phases = [];
  let cur = null;
  for (const ln of lines) {
    const h = ln.match(/^##\s+(.+)$/);
    if (h) { cur = { name: h[1].trim(), done: 0, wip: 0, total: 0 }; phases.push(cur); continue; }
    if (!cur) continue;
    if (/^- \[x\]/.test(ln)) { cur.total++; cur.done++; }
    else if (/^- \[~\]/.test(ln)) { cur.total++; cur.wip++; }
    else if (/^- \[ \]/.test(ln)) { cur.total++; }
  }
  return phases.filter(p => p.total > 0);
}

function bar(done, wip, total, width) {
  const d = Math.round(done / total * width);
  const w = Math.round(wip / total * width);
  return "█".repeat(d) + "░".repeat(Math.max(0, w)) + "·".repeat(Math.max(0, width - d - w));
}

const planFiles = fs.readdirSync(DIR).filter(f => /^PLAN.*\.md$/.test(f)).sort();
let out = `# STATUS — авто-снимок

_Генерируется: \`node tools/status.js\` · ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })} МСК_

`;
let grandDone = 0, grandTotal = 0;

for (const f of planFiles) {
  const phases = parsePlan(f);
  out += `## ${f}\n\n| Фаза | Прогресс | Готово |\n|------|----------|--------|\n`;
  for (const p of phases) {
    grandDone += p.done; grandTotal += p.total;
    const pct = Math.round(p.done / p.total * 100);
    const mark = p.done === p.total ? "✅" : p.done > 0 ? "🔄" : "⬜";
    out += `| ${mark} ${p.name} | \`${bar(p.done, p.wip, p.total, 20)}\` | ${p.done}/${p.total} (${pct}%) |\n`;
  }
  out += "\n";
}

const pct = grandTotal ? Math.round(grandDone / grandTotal * 100) : 0;
out = `# STATUS — ${pct}% (${grandDone}/${grandTotal} задач)\n\n` + out.split("\n").slice(2).join("\n");

fs.writeFileSync(path.join(DIR, "STATUS.md"), out, "utf8");
console.log(out);
