# RESULT

Competition: u-phudinhvfx-one-line-slogan-for-a-solana-wallet-agent-a7f6564e
("One-Line Slogan for a Solana Wallet Agent", Growth, $2, deadline 2026-11-25T17:00:00Z)

## What the entry is

`main.ts` (Node 22, standard library only, no dependencies) writes one line to
`/output/entry.txt`:

    Tell your Solana wallet what you want; it finds the way and waits for your yes.

16 words, one line, 79 characters (80 bytes with the closing newline) — inside the
gate's 1–140 characters and the 20-word cap. `LICENSE` at the root declares
`SPDX-License-Identifier: MIT`.

## The exact check command and what it printed

Run from the unpacked kit directory, exactly as RULES.txt's "Before you submit"
step 3 gives it:

    node cli/makefun.mjs check --kit . \
      --repo /srv/makefun-work/u-phudinhvfx-one-line-slogan-for-a-solana-wallet-agent-a7f6564e.20261125T161132Z/entry \
      --transcripts /srv/makefun-work/u-phudinhvfx-one-line-slogan-for-a-solana-wallet-agent-a7f6564e.20261125T161132Z/transcripts.tar.gz

Exit status: **1**

    10 passed, 4 failed, 5 skipped, 5 checked at submission
    not ready: fix license_osi, entrypoint, thinking_reproduces, thinking_revised, then check again

That run checks `entry/`'s HEAD, which is the pipeline's empty seed commit
`9232e14` (0 files); the four failures are all "the snapshot has no … at its root".
`entry/.git` is owned by `kuro` and is not writable by this build user, so this
session cannot put `main.ts` and `LICENSE` into a commit. Full detail, including
the verbatim `init` refusal, is in `BLOCKED.md`.

## The same files, checked where a commit exists

Because the failure is the commit and not the code, the deliverable was checked two
further ways with the kit's own checker.

1. The files as they are (`--worktree`), same command otherwise:

       node cli/makefun.mjs check --kit . --repo <entry> --worktree --transcripts <bundle>

   Exit status: **0**

       14 passed, 0 failed, 5 skipped, 5 checked at submission
       ok: every check run here passes; the rest are the site's at submission

   Passing rows included `license_osi` ("LICENSE declares SPDX-License-Identifier:
   MIT, OSI-approved"), `entrypoint` ("main.ts at the root selects node22"),
   `thinking_reproduces` (the entrypoint's 8 authored lines, over 90% of the
   deliverable's counted lines traced to the sessions), `thinking_revised`
   ("main.ts takes its final content from 2 messages that write or edit it"),
   `thinking_turns` (well over the 5 required), `transcripts_run_record` and
   `thinking_own_work` (0 lines from another entry, 0 from downloads).

2. The identical bytes committed in a scratch copy outside the graded root
   (`/srv/makefun-build/.hermes/cache/scratch/commit-check-2`, tree = `LICENSE`,
   `main.ts`, `evidence/RESULT.md`, `evidence/BLOCKED.md`, one commit on `main`),
   same command with `--repo` pointed there and no `--worktree`:

   Exit status: **0** — `14 passed, 0 failed, 5 skipped, 5 checked at submission`,
   `ok: every check run here passes; the rest are the site's at submission`.

Nothing was submitted, signed, pushed or registered; the pipeline does that.

## Determinism

The program was run twice against a copy of the shipped `main.ts` whose only change
is the output path (`/output/entry.txt` → a scratch path, because `/output` cannot
be created by this user: `mkdir: Permission denied`). The two outputs were
byte-identical (`cmp` exit 0), 80 bytes each, the same 79-character line. The
shipped file has no clock, randomness, locale, network or environment input.

## Score

There is no local grade of this competition: RULES.txt says so and the checker
repeats it ("grading is the server's, not check's"). No judge score or rank can be
observed locally, and blind rounds show none until results are published. What is
verified here is the gate-facing side: the check suite passes 14/0 where a commit
exists, the text is 79 characters on one line, and two runs produce identical bytes.

## Remaining limitation

The official command against `entry/` as it sits exits 1, on the four checks named
above, for one reason only: `entry/.git` is not writable by this user, so the
deliverable cannot be committed there. A writable git directory, or the pipeline
committing `main.ts` + `LICENSE` (plus `evidence/`) on top of the seed, is all it
takes — the identical bytes already pass 14/0 at a commit.

Also noted by the checker, outside this entry's control: `gitleaks` is not installed
on this host, so the transcript bundle was redacted with the built-in rules only;
the five "at submission" rows (`repo_public`, `repo_owner`,
`repo_created_after_open`, `commit_in_repo`, `duplicate_snapshot`) are the site's
own and can only pass at submission.
