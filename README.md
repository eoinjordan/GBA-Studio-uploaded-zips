# GBA Studio

- GBA Studio Copyright (c) 2025 Blue Heron, also released under the MIT license.
- GB Studio Copyright (c) 2024 Chris Maltby, released under the [MIT license](https://opensource.org/licenses/MIT).

GBA Studio is an experimental fork of GB Studio tailored for Game Boy Advance game development. Like the original, it provides a visual retro game editor for Mac, Linux, and Windows.

## Maintainers Wanted

This project is a prototype. I'm not a JS/TS expert, nor a GBA ROM expert. If you can take over where I've left off, please let me know.

## Features

- Creates GBA projects instead of GB projects
- Exports .gba ROM files that run on Game Boy Advance
- Uses ARM-based compilation for enhanced performance
- Supports higher resolution graphics and more colors

It's a fully functional GB Studio look-alike that:

- Opens existing GB Studio projects and converts them to GBA format
- Provides the same visual editor interface
- Exports working .gba ROM files
- Runs the compiled games on GBA emulators or real hardware

For more information on the upstream project see the original [GB Studio](https://www.gbstudio.dev) site.

![GBA Studio](gbstudio.gif)

GBA Studio consists of an [Electron](https://electronjs.org/) game builder application and a C based game engine using [GBDK](http://gbdk.sourceforge.net/).

## Installation / From source

Download a release for your operating system from this repository's GitHub Releases page, or run from source:

Prerequisites

- Node.js (LTS recommended)
- Git
- devkitPro/devkitARM if you plan to build `.gba` files (see `docs/DEVKIT_SETUP.md`)

Quick start (use the bootstrap script to enable Corepack/Yarn or fall back to `npm`):

```bash
cd gba-studio
# Linux / macOS
bash tools/bootstrap.sh
# Windows (PowerShell)
powershell -NoProfile -ExecutionPolicy Bypass -File tools\bootstrap.ps1
```

If you prefer `npm` instead of Yarn/Corepack:

```bash
npm ci
npm run fetch-deps
npm start
```

After checking out a new version run:

```bash
npm run fetch-deps
```

If you use `nvm` you can switch to the repository Node version with `.nvmrc`:

```bash
nvm use
```

## GBA Studio CLI

Install GBA Studio from source as above then:

```bash
npm run make:cli
```

The CLI entrypoint is `out/cli/gb-studio-cli.js`. Common commands are documented in `docs/CLI_USAGE.md`.

### Update the CLI

Pull the latest code and run `make:cli` again.

```bash
> npm run make:cli
```

### CLI Examples

- **Export Project**

  ```bash
  > node out/cli/gb-studio-cli.js export path/to/project.gbsproj out/
  ```

  Export GBDK project from gbsproj to out directory

- **Export Data**
  ```bash
  > node out/cli/gb-studio-cli.js export path/to/project.gbsproj out/ -d
  ```
  Export only src/data and include/data from gbsproj to out directory
- **Make ROM**

  ```bash
  > node out/cli/gb-studio-cli.js make:rom path/to/project.gbsproj out/game.gba
  ```

  Make a GBA ROM file from gbsproj

- **Make Pocket**

  ```bash
  > node out/cli/gb-studio-cli.js make:pocket path/to/project.gbsproj out/game.pocket
  ```

  Make a Pocket file from gbsproj

- **Make Web**
  ```bash
  > node out/cli/gb-studio-cli.js make:web path/to/project.gbsproj out/
  ```
  Make a Web build from gbsproj

## Documentation

See the `docs/` folder for repository-specific guides:

- `docs/GETTING_STARTED.md` - quickstart and run instructions
- `docs/DEVKIT_SETUP.md` - devkitPro installation and verification
- `docs/CLI_USAGE.md` - CLI commands and examples
- `docs/EMULATOR.md` - emulator smoke tests and CI usage
- `docs/CI.md` - CI notes and recommendations
- `docs/CONTRIBUTING.md` - contributing and development workflow

## Prebuilt Packages

Prebuilt installers are produced by the project's CI when a Git tag is pushed. Download installers from the GitHub Release created for the tag or from the workflow artifacts.

### Local Package Builds

You can build platform installers locally using Electron Forge. The project includes convenience npm scripts for each platform:

Windows:

```powershell
Set-Location 'c:\Users\Eoin\git\GBAStudio\gba-studio'
npm ci
npm run make:win
# Output installers will be in the out/make/ folder
Get-ChildItem -Path .\out\make -Recurse
```

Linux:

```bash
cd gba-studio
npm ci
npm run make:linux
ls -la out/make
```

macOS:

```bash
cd gba-studio
npm ci
npm run make:mac
ls -la out/make
```

Notes

- Packaging may require additional platform tools (codesign on macOS, signing/certificate tooling on Windows). CI will produce unsigned packages by default unless signing secrets are provided.
- If a local package build fails, check the `out/` and `out/make/` directories for logs and artifacts and consult `docs/CI.md` for troubleshooting.

[GB Studio Documentation](https://www.gbstudio.dev/docs)

## Note For Translators

If you're looking to update an existing translation with content that is missing, there is a handy script that lists keys found in the English localisation that are not found and copies them to your localisation

```bash
npm run missing-translations lang
# e.g. npm run missing-translations de
# e.g. npm run missing-translations en-GB
```
