#!/usr/bin/env node

const fs = require("fs");
const Path = require("path");
const { spawnSync } = require("child_process");

const projectFile =
  process.argv[2] || "test/data/projects/RunProject/RunProject.gbsproj";
const destination = process.argv[3] || "out/RunProject.gba";
const rawExtraArgs = process.argv.slice(4);
const quiet = rawExtraArgs.includes("--quiet");
const extraArgs = rawExtraArgs.filter((arg) => arg !== "--quiet");
const hasVerbose = extraArgs.some((arg) => arg === "-v" || arg === "--verbose");

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const cliPath = Path.join("out", "cli", "gb-studio-cli.js");

const run = (command, args) => {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: process.platform === "win32" && command.endsWith(".cmd"),
  });

  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
};

fs.mkdirSync(Path.dirname(destination), { recursive: true });

run(npmCommand, ["run", "make:cli"]);
run(process.execPath, [
  cliPath,
  "make:rom",
  projectFile,
  destination,
  ...extraArgs,
  ...(quiet || hasVerbose ? [] : ["--verbose"]),
]);
