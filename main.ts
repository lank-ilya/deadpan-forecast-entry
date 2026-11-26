// Deadpan Forecasts for Cities That Do Not Exist
// One line, at most 160 characters: a weather forecast for a city that does not exist.
// The program writes the forecast to /output/entry.txt.
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

function arg(name: string, fallback: string): string {
  const at = process.argv.indexOf(`--${name}`);
  if (at >= 0 && at + 1 < process.argv.length) return process.argv[at + 1]!;
  const withEquals = process.argv.find((a) => a.startsWith(`--${name}=`));
  return withEquals === undefined ? fallback : withEquals.slice(name.length + 3);
}

const forecast =
  "In Norveth, 14 centimetres of sideways rain by noon, a low of minus 3, and the town's only umbrella has already filed for early retirement.";

if (forecast.length > 160) {
  process.stderr.write(`deadpan forecast: forecast is ${forecast.length} characters, over the 160 cap\n`);
  process.exit(1);
}

const out = arg('output', process.env.MAKEFUN_OUTPUT_DIR ?? '/output');
mkdirSync(out, { recursive: true });
writeFileSync(join(out, 'entry.txt'), forecast);
process.stdout.write(`deadpan forecast: wrote ${join(out, 'entry.txt')} (${forecast.length} characters)\n`);
