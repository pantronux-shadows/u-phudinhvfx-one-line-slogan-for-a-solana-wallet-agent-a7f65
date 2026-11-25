// Writes this entry's one-line slogan to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const SLOGAN: string =
  "Tell your Solana wallet what you want; it finds the way and waits for your yes.";

const TARGET = "/output/entry.txt";

mkdirSync(dirname(TARGET), { recursive: true });
writeFileSync(TARGET, `${SLOGAN}\n`, "utf8");
