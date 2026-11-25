import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The Worst App Idea Ever Pitched — one sentence, at most 240 characters.
// A specific app + what it uselessly does, with absurd logic and a vivid image.
const PITCH =
  "SnoreSync is a dating app that matches insomniacs by the exact pitch of their snoring, then books them a shared hotel room with one pillow, no earplugs, and a kazoo orchestra playing lullabies at 3am";

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

// Gate: reject invalid pitches loudly, and write nothing.
if (PITCH.length < 1 || PITCH.length > 240) {
  fail(`pitch must be 1-240 characters, got ${PITCH.length}`);
}
if (PITCH.trim().length === 0) {
  fail("pitch must not be whitespace-only");
}
if (PITCH.includes("\n") || PITCH.includes("\r")) {
  fail("pitch must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", PITCH, "utf8");

// Read-back verification: the written file must be byte-identical
// to the validated pitch text, otherwise fail loudly.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== PITCH) {
  fail("read-back mismatch: /output/entry.txt does not match the validated pitch");
}

console.log(`wrote /output/entry.txt (${PITCH.length} characters)`);
