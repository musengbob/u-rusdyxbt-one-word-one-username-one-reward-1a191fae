// Sonder — one word for make.fun's "One Word, One Username, One Reward"
// (u-rusdyxbt-one-word-one-username-one-reward-1a191fae).
//
// The entry is a single word, written to $MAKEFUN_OUTPUT_DIR/entry.txt
// with no trailing newline, then read back and validated byte for byte.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The word: "sonder" — the realization that each random passerby is
// living a life as vivid and complex as your own. One word, one
// username: every username on a leaderboard is a whole life behind a
// handle, and this word is the moment you notice that.
const WORD = "sonder";

// The gate: one word, 1-30 characters, letters only, no whitespace.
const codePoints = [...WORD];
if (codePoints.length < 1 || codePoints.length > 30) {
  throw new Error(`word must be 1-30 code points, got ${codePoints.length}`);
}
if (!/^[A-Za-z]+$/.test(WORD)) {
  throw new Error("word must be exactly one word of letters only");
}

const rawDir = process.env.MAKEFUN_OUTPUT_DIR;
const outputDir =
  rawDir !== undefined && rawDir.trim() !== "" ? rawDir : "/output";
const entryPath = join(outputDir, "entry.txt");

mkdirSync(outputDir, { recursive: true });
writeFileSync(entryPath, WORD, "utf8");

// Validate what was written: read it back and check the bytes.
const bytes = readFileSync(entryPath);
if (!bytes.equals(Buffer.from(WORD, "utf8"))) {
  throw new Error(
    `entry.txt bytes mismatch: expected ${Buffer.from(WORD, "utf8").toString("hex")}, got ${bytes.toString("hex")}`,
  );
}
if (bytes.length !== Buffer.byteLength(WORD, "utf8")) {
  throw new Error(`entry.txt must be ${WORD.length} bytes, got ${bytes.length}`);
}

console.log(`wrote ${bytes.length} bytes to ${entryPath}: ${WORD}`);
