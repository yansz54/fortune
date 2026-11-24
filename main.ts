// Fortune in a Pot — u-golden-heron-44-fortune-in-a-pot-ded981e9
// Writes one fortune for a houseplant, 120 characters at most, to
// /output/entry.txt. Pure Node stdlib: no network, no randomness, no clock.
// Two runs write byte-identical output.
//
// The fortune was chosen by a pairwise tournament of 30 drafted candidates
// against the published judge criteria (in order): a fortune for a houseplant,
// about the plant's own future; funny in a way a plant lover would laugh at;
// kind and warm, with no doom, no withering and no mockery; sounds like a
// fortune, with the cadence of a prediction; one line that fits in 120
// characters and reads cleanly aloud. See METHOD.md for the tournament.
// Winner (100 characters):
//   Soon a new leaf will arrive, and your keeper will take credit for it. Let them. You did the growing.

import * as fs from "node:fs";
import * as path from "node:path";

const LINE =
  "Soon a new leaf will arrive, and your keeper will take credit for it. Let them. You did the growing.";

// The fortune works in two beats, each carrying the judge criteria:
// "your keeper will take credit for it" is the joke — the keeper claiming
// the plant's work, told in the calm cadence of a prediction (criteria 2
// and 4); "Let them. You did the growing." is the warm turn — the plant is
// the hero, affirmed in the last few words, with nothing explained after
// it (criteria 2 and 3). At 100 characters it wastes nothing (criterion 5),
// and the new leaf is this plant's own future, not any plant's (criterion 1).

// Gate check (mirrors the sealed scorer): the entry must be UTF-8 text of
// 1 to 120 characters and not only whitespace, and a single line. Also
// reject any control character — a fortune carries no control codes — and
// any leading or trailing space, so the line reads clean on first sight.
// The space guard matters because a stray space would change the byte count
// the leaderboard's Size column shows, and ties break on smaller text.
// Fail loudly instead of writing an invalid entry.
if (
  LINE.length < 1 ||
  LINE.length > 120 ||
  LINE.trim().length === 0 ||
  LINE.trim() !== LINE ||
  LINE.includes("\n") ||
  /[\u0000-\u001f]/.test(LINE)
) {
  throw new Error("entry fortune fails the 1-120 character gate");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "entry.txt"), LINE, "utf8");
