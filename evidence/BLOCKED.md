# BLOCKED — the exact RULES check command cannot pass against `entry/` as it sits

The deliverable itself passes every local check (14 passed, 0 failed). What cannot
pass is the official command run against `entry/`'s HEAD, because `entry/.git` is
owned by another user and this build user cannot create the commit that would hold
the files.

## The exact command and its exact result

Run from the unpacked kit (`--kit .`), against the graded root `entry/`:

    node cli/makefun.mjs check --kit . \
      --repo /srv/makefun-work/u-phudinhvfx-one-line-slogan-for-a-solana-wallet-agent-a7f6564e.20261125T161132Z/entry \
      --transcripts /srv/makefun-work/u-phudinhvfx-one-line-slogan-for-a-solana-wallet-agent-a7f6564e.20261125T161132Z/transcripts.tar.gz

Exit status: 1. Printed: `10 passed, 4 failed, 5 skipped, 5 checked at submission`
and `not ready: fix license_osi, entrypoint, thinking_reproduces, thinking_revised, then check again`.

The four failing checks, with the checker's own reasons:

- `license_osi` — "the tree has no root license file (LICENSE, LICENSE.md, LICENSE.txt, COPYING)"
- `entrypoint` — "the snapshot has no main.ts or main.py at its root: the grader runs nothing"
- `thinking_reproduces` — "the snapshot has no counted line; the snapshot has no entrypoint (main.ts or main.py) at its root"
- `thinking_revised` — "no file takes its final content from 2 or more messages that write or edit it: the snapshot has no counted file"

All four are the same single cause: the command checks **the commit at HEAD**, and
`entry/`'s HEAD is the pipeline's empty seed commit
`9232e14ec0f994e140375a1d09634a9b0f6eace2` ("entry start", 0 files). The checker
says so itself: "the snapshot has no … at its root".

## What it would take

One thing: a writable `entry/.git`, so that a commit holding `main.ts` and `LICENSE`
can exist and `--repo entry` (default `--commit HEAD`) reads it. This user cannot
make it:

    $ ls -ld entry/.git
    drwxrwxr-x 7 kuro kuro  ... entry/.git
    $ id
    uid=105(makefun-build) gid=108(makefun-build) groups=108(makefun-build),981(makefun-work)
    $ touch entry/.git/.write-test
    touch: cannot touch 'entry/.git/.write-test': Permission denied

The working tree is writable (`entry/` is group `makefun-work`); only the git
directory is not. RULES.txt's own repository-init step, run exactly as it names it,
refuses for the same reason:

    $ cd entry && node <kit>/cli/makefun.mjs init --competition u-phudinhvfx-…-a7f6564e \
        --license MIT --keypair /…/wallet.json
    makefun init: this repository already has history (HEAD 9232e14ec0f994e140375a1d09634a9b0f6eace2), and the root commit 9232e14ec0f994e140375a1d09634a9b0f6eace2 is empty: a beacon root holds .makefun/freshness.json alone. init starts a new history and never rewrites one: run it in a new, empty directory and build your work on its root
    EXIT=1

(`init` itself is not broken on this host: run in a fresh empty directory it
succeeds — `makefun anchor 85ee5be1072a5694e377110839dea111e1ae4d47 round 34273495` —
it just cannot be run in `entry/`, which already has the seed history.)

## Proof the same bytes are not the problem

The identical `main.ts` and `LICENSE` bytes (with the evidence files), committed in
a scratch copy (`/srv/makefun-build/.hermes/cache/scratch/commit-check-2`), were
checked with the same command minus the path, at that commit:

    node cli/makefun.mjs check --kit . --repo <scratch copy> --transcripts <same bundle>

Exit status 0 — `14 passed, 0 failed, 5 skipped, 5 checked at submission` —
`ok: every check run here passes; the rest are the site's at submission`,
including `license_osi`, `entrypoint`, `thinking_reproduces` and `thinking_revised`.

`--worktree` on `entry/` (the files as they are, not a commit) gives the same
14 passed, 0 failed, exit 0. See `RESULT.md`.

## Not blocked by anything else

The five "at submission" rows (`repo_public`, `repo_owner`,
`repo_created_after_open`, `commit_in_repo`, `duplicate_snapshot`) are the site's
own checks on a pushed repository; no local command can satisfy them, and the
pipeline, not this session, submits. Nothing was submitted, signed or pushed here.
