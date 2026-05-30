# Emulator Smoke Tests

GBA Studio includes a small emulator wrapper for checking that a produced ROM can be opened by an emulator.

## Install an Emulator

Ubuntu:

```bash
sudo apt-get update
sudo apt-get install -y --no-install-recommends mgba-sdl
```

Windows and macOS:

- Install mGBA or binjgb.
- Add the emulator executable to `PATH`, or set `GBA_STUDIO_EMULATOR` to the executable path.

## Run

```bash
npm run test:emu -- out/RunProject.gba
```

In CI/headless environments:

```bash
GBA_STUDIO_EMULATOR=mgba GBA_STUDIO_EMULATOR_HEADLESS=1 npm run test:emu -- out/RunProject.gba
```

The wrapper exits successfully if the emulator exits with code `0` or runs until the configured timeout without exiting early. Set `GBA_STUDIO_EMULATOR_TIMEOUT_MS` to change the default 10 second timeout.
