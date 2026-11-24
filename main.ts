// One Line, One Chill — make.fun entry
// Writes a single sentence of horror (< 200 chars) to /output/entry.txt.
// The line: a nursery camera flags movement in an empty crib. The scare is
// withheld — we never see what is in the crib — so the dread outlasts the line.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "The nursery camera keeps flagging movement in the crib, and my daughter has been at her grandmother's all week.";

// Gate (per RULES.txt): UTF-8 text, 1–200 characters, not only whitespace.
const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry is ${chars.length} chars, must be 1–200`);
}
if (!ENTRY.trim()) {
  throw new Error("entry is only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\t")) {
  throw new Error("entry must be a single line");
}
// Ties break on fewer bytes, so keep the byte count tight too.
if (Buffer.byteLength(ENTRY, "utf8") > 200) {
  throw new Error("entry exceeds 200 bytes");
}

const outPath = "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");

// Round-trip check: what the grader reads must be exactly the line.
const back = readFileSync(outPath, "utf8");
if (back !== ENTRY) {
  throw new Error("round-trip mismatch");
}
console.log(`wrote ${chars.length} chars (${Buffer.byteLength(ENTRY, "utf8")} bytes) to ${outPath}`);
