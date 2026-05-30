# CLI Usage

Build the CLI bundle:

```bash
npm run make:cli
```

The generated entrypoint is:

```bash
node out/cli/gb-studio-cli.js --help
```

## Build a GBA ROM

```bash
npm run build:gba -- test/data/projects/RunProject/RunProject.gbsproj out/RunProject.gba
```

Equivalent direct CLI call after `npm run make:cli`:

```bash
node out/cli/gb-studio-cli.js make:rom test/data/projects/RunProject/RunProject.gbsproj out/RunProject.gba -v
```

## Export a GBDK Project

```bash
node out/cli/gb-studio-cli.js export path/to/project.gbsproj out/exported-project
```

Export only generated data folders:

```bash
node out/cli/gb-studio-cli.js export path/to/project.gbsproj out/exported-project -d
```

## Notes

- ROM builds require devkitARM. See `docs/DEVKIT_SETUP.md`.
- `-v` enables verbose compiler output.
- `npm run test:emu -- out/RunProject.gba` runs a short emulator smoke test when mGBA or binjgb is installed.
