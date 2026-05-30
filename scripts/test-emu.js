#!/usr/bin/env node

const fs = require("fs");
const Path = require("path");
const { spawn } = require("child_process");

const romPath = process.argv[2] || "out/RunProject.gba";
const timeoutMs = Number(process.env.GBA_STUDIO_EMULATOR_TIMEOUT_MS || 10000);
const requestedEmulator = process.env.GBA_STUDIO_EMULATOR;
const defaultEmulators =
  process.platform === "win32"
    ? ["mGBA.exe", "mgba.exe", "binjgb.exe"]
    : ["mgba", "binjgb"];

const pathExts =
  process.platform === "win32"
    ? (process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM").split(";").filter(Boolean)
    : [""];

const pathDirs = (process.env.PATH || "").split(Path.delimiter).filter(Boolean);

const hasPathSeparator = (value) =>
  value.includes("/") || value.includes("\\") || value.includes(Path.sep);

const findExecutable = (command) => {
  if (hasPathSeparator(command)) {
    return fs.existsSync(command) ? command : "";
  }

  for (const dir of pathDirs) {
    for (const ext of pathExts) {
      const candidate = Path.join(
        dir,
        command.endsWith(ext) ? command : command + ext,
      );
      if (fs.existsSync(candidate)) {
        return candidate;
      }
    }
  }
  return "";
};

if (!fs.existsSync(romPath)) {
  console.error(`[emu] ROM not found: ${romPath}`);
  process.exit(1);
}

const emulator = [requestedEmulator, ...defaultEmulators]
  .filter(Boolean)
  .map(findExecutable)
  .find(Boolean);

if (!emulator) {
  console.error(
    "[emu] No emulator found. Install mGBA/binjgb or set GBA_STUDIO_EMULATOR.",
  );
  process.exit(1);
}

const extraArgs = (process.env.GBA_STUDIO_EMULATOR_ARGS || "")
  .split(/\s+/)
  .filter(Boolean);
const env = { ...process.env };

if (process.env.CI || process.env.GBA_STUDIO_EMULATOR_HEADLESS === "1") {
  env.SDL_VIDEODRIVER = env.SDL_VIDEODRIVER || "dummy";
  env.SDL_AUDIODRIVER = env.SDL_AUDIODRIVER || "dummy";
}

console.log(`[emu] ${emulator} ${extraArgs.concat(romPath).join(" ")}`);

const child = spawn(emulator, [...extraArgs, romPath], {
  stdio: "inherit",
  env,
});

let timedOut = false;
const timer = setTimeout(() => {
  timedOut = true;
  child.kill();
}, timeoutMs);

child.on("error", (error) => {
  clearTimeout(timer);
  console.error(`[emu] Failed to start emulator: ${error.message}`);
  process.exit(1);
});

child.on("close", (code) => {
  clearTimeout(timer);
  if (timedOut) {
    console.log(`[emu] Emulator ran for ${timeoutMs}ms without exiting early.`);
    process.exit(0);
  }
  if (code === 0) {
    console.log("[emu] Emulator exited successfully.");
    process.exit(0);
  }
  console.error(`[emu] Emulator exited with code ${code}.`);
  process.exit(code || 1);
});
