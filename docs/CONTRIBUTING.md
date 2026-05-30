# Contributing

This fork is focused on making the GB Studio workflow produce Game Boy Advance ROMs.

## Setup

```bash
corepack enable
yarn install --immutable
npm run fetch-deps
npm test
```

Use `npm ci` if Corepack/Yarn is unavailable.

## Before Opening a PR

Run the checks that match your change:

```bash
npm test
npm run make:cli
npm run build:gba -- test/data/projects/RunProject/RunProject.gbsproj out/RunProject.gba
```

For compiler, CI, or ROM-output changes, also run:

```bash
npm run test:emu -- out/RunProject.gba
```

## Notes

- Keep generated build outputs out of git.
- Do not commit local toolchain installs.
- Prefer POSIX-style paths for project resource paths stored in `.gbsres` files.
