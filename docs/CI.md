# Continuous Integration

`.github/workflows/ci.yml` is the GBA-specific verification workflow.

It runs on pushes to `main`, pull requests to `main`, `v*` tags, and manual dispatches. The workflow:

- Installs dependencies using Corepack/Yarn with an npm fallback.
- Fetches engine and tool dependencies.
- Runs the Jest test suite.
- Builds the CLI bundle.
- Installs devkitPro pacman and the `gba-dev` toolchain group.
- Builds `out/RunProject.gba` from the sample project.
- Runs a short mGBA smoke test.
- Exports the sample GBDK project and uploads the ROM/export artifacts.
- Attaches the uploaded artifacts to GitHub Releases for `v*` tags.

The older `.github/workflows/main.yml` still handles broader Electron packaging.

## Local Equivalent

```bash
corepack enable
yarn install --immutable
npm run fetch-deps
npm test
npm run build:gba -- test/data/projects/RunProject/RunProject.gbsproj out/RunProject.gba
npm run test:emu -- out/RunProject.gba
```

## Release

Tag releases with a `v` prefix so the CI artifact attachment job runs:

```bash
git tag v4.2.0-alpha0
git push origin v4.2.0-alpha0
```
