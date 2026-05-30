#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

echo "[release] enabling corepack"
corepack enable

echo "[release] installing deps"
yarn install --frozen-lockfile || npm ci

echo "[release] fetching deps"
npm run fetch-deps

echo "[release] running tests"
npm test

echo "[release] building CLI"
npm run make:cli

echo "[release] building sample GBA ROM"
npm run build:gba -- test/data/projects/RunProject/RunProject.gbsproj out/RunProject.gba

echo "[release] exporting sample project data"
mkdir -p out/ci
node out/cli/gb-studio-cli.js export test/data/projects/RunProject/RunProject.gbsproj out/ci/RunProject

echo "[release] packaging app (electron-forge make)"
npm run make

echo "[release] artifacts in out/"
