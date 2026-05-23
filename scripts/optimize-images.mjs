#!/usr/bin/env node
/**
 * In-place image optimizer.
 *
 * Rules (URL-preserving — every existing image path keeps working):
 *  - Walks public/{work,images,projects,music}.
 *  - For each .png/.jpg/.jpeg:
 *      * If width > MAX_WIDTH, downscale (preserve aspect ratio).
 *      * Re-encode with strong-but-quality-preserving settings.
 *      * Replace the original file (same name, same extension).
 *      * Also emit a sibling .webp at WEBP_QUALITY.
 *  - Idempotent: tracks a manifest of file content-hashes so re-runs are no-ops.
 *  - Never renames or deletes files. Skips anything already WebP/SVG/etc.
 *  - Skips files whose post-optimization size would be LARGER than the source
 *    (keeps the original bytes in that case).
 *
 * Flags:
 *   --dry-run     Report what would change without writing.
 *   --force       Ignore manifest, re-process every file.
 *   --quiet       Only print summary.
 */
import {
  readdirSync,
  statSync,
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
} from 'node:fs';
import { join, dirname, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PUBLIC = join(ROOT, 'public');

const TARGET_DIRS = ['work', 'images', 'projects', 'music'].map((d) =>
  join(PUBLIC, d)
);

const MANIFEST_PATH = join(ROOT, 'scripts', '.image-optimize-manifest.json');
const REPORT_PATH = join(ROOT, 'scripts', '.optimize-report.json');

const MAX_WIDTH = 2400;
const PNG_QUALITY = 80;
const JPEG_QUALITY = 82;
const WEBP_QUALITY = 80;

const argv = process.argv.slice(2);
const DRY_RUN = argv.includes('--dry-run');
const FORCE = argv.includes('--force');
const QUIET = argv.includes('--quiet');

const log = (...args) => {
  if (!QUIET) console.log(...args);
};

const isImageFile = (name) => /\.(png|jpe?g)$/i.test(name);

const walk = (dir, out = []) => {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    let st;
    try {
      st = statSync(full);
    } catch {
      continue;
    }
    if (st.isDirectory()) {
      walk(full, out);
    } else if (st.isFile() && isImageFile(entry)) {
      out.push(full);
    }
  }
  return out;
};

const hashFile = (path) => {
  const buf = readFileSync(path);
  return createHash('sha256').update(buf).digest('hex');
};

const loadManifest = () => {
  if (!existsSync(MANIFEST_PATH)) return {};
  try {
    return JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'));
  } catch {
    return {};
  }
};

const saveManifest = (m) => {
  mkdirSync(dirname(MANIFEST_PATH), { recursive: true });
  writeFileSync(MANIFEST_PATH, JSON.stringify(m, null, 2));
};

const fmtKB = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

const processFile = async (filePath, manifest) => {
  const rel = filePath.slice(ROOT.length + 1);
  const ext = extname(filePath).toLowerCase();
  const originalBuf = readFileSync(filePath);
  const originalSize = originalBuf.length;
  const originalHash = createHash('sha256').update(originalBuf).digest('hex');

  if (!FORCE && manifest[rel] && manifest[rel].sourceHash === originalHash) {
    return {
      rel,
      action: 'skip-manifest',
      originalSize,
      finalSize: originalSize,
      webpSize: manifest[rel].webpSize || 0,
    };
  }

  let pipeline = sharp(originalBuf, { failOn: 'none' });
  const meta = await pipeline.metadata();
  if (meta.width && meta.width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  let optimizedBuf;
  if (ext === '.png') {
    optimizedBuf = await pipeline
      .clone()
      .png({ quality: PNG_QUALITY, compressionLevel: 9, palette: true })
      .toBuffer();
  } else {
    optimizedBuf = await pipeline
      .clone()
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true, progressive: true })
      .toBuffer();
  }

  const webpBuf = await pipeline
    .clone()
    .webp({ quality: WEBP_QUALITY })
    .toBuffer();

  let finalSize = originalSize;
  let webpWritten = false;

  if (optimizedBuf.length < originalSize) {
    if (!DRY_RUN) writeFileSync(filePath, optimizedBuf);
    finalSize = optimizedBuf.length;
  }

  const webpPath = filePath.slice(0, -ext.length) + '.webp';
  if (!existsSync(webpPath) || FORCE || webpBuf.length < (statSync(webpPath).size || Infinity)) {
    if (!DRY_RUN) writeFileSync(webpPath, webpBuf);
    webpWritten = true;
  }

  if (!DRY_RUN) {
    manifest[rel] = {
      sourceHash: optimizedBuf.length < originalSize ? createHash('sha256').update(optimizedBuf).digest('hex') : originalHash,
      finalSize,
      webpSize: webpBuf.length,
      processedAt: new Date().toISOString(),
    };
  }

  return {
    rel,
    action: optimizedBuf.length < originalSize ? 'optimized' : 'kept-original',
    originalSize,
    finalSize,
    webpSize: webpBuf.length,
    webpWritten,
  };
};

const main = async () => {
  const allFiles = TARGET_DIRS.flatMap((d) => walk(d));
  log(`[optimize-images] Found ${allFiles.length} candidate files across:`);
  for (const d of TARGET_DIRS) {
    if (existsSync(d)) log(`  - ${d.slice(ROOT.length + 1)}`);
  }
  log(
    `[optimize-images] Mode: ${
      DRY_RUN ? 'DRY RUN' : 'WRITE'
    } | Force: ${FORCE} | MAX_WIDTH=${MAX_WIDTH}`
  );

  const manifest = FORCE ? {} : loadManifest();
  const results = [];

  let totalBefore = 0;
  let totalAfter = 0;
  let totalWebp = 0;
  let optimizedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (let i = 0; i < allFiles.length; i++) {
    const f = allFiles[i];
    try {
      const r = await processFile(f, manifest);
      results.push(r);
      totalBefore += r.originalSize;
      totalAfter += r.finalSize;
      totalWebp += r.webpSize;
      if (r.action === 'optimized') optimizedCount++;
      else skippedCount++;
      if ((i + 1) % 25 === 0 || i + 1 === allFiles.length) {
        log(
          `  [${i + 1}/${allFiles.length}] ${r.rel} ${r.action} ` +
            `${fmtKB(r.originalSize)} -> ${fmtKB(r.finalSize)}` +
            (r.webpWritten ? ` (+webp ${fmtKB(r.webpSize)})` : '')
        );
      }
    } catch (err) {
      errorCount++;
      console.error(`[optimize-images] ERROR ${f}:`, err.message);
    }
  }

  if (!DRY_RUN) saveManifest(manifest);

  const report = {
    generatedAt: new Date().toISOString(),
    dryRun: DRY_RUN,
    fileCount: allFiles.length,
    optimizedCount,
    skippedCount,
    errorCount,
    bytes: {
      before: totalBefore,
      after: totalAfter,
      webp: totalWebp,
      savedOriginals: totalBefore - totalAfter,
      addedWebp: totalWebp,
      netDelta: totalAfter + totalWebp - totalBefore,
    },
  };
  if (!DRY_RUN) writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));

  log('');
  log('[optimize-images] Summary:');
  log(`  Files processed:    ${allFiles.length}`);
  log(`  Optimized:          ${optimizedCount}`);
  log(`  Skipped/idempotent: ${skippedCount}`);
  log(`  Errors:             ${errorCount}`);
  log(`  Original bytes:     ${(totalBefore / 1024 / 1024).toFixed(1)} MB`);
  log(`  After re-encode:    ${(totalAfter / 1024 / 1024).toFixed(1)} MB`);
  log(`  +WebP siblings:     ${(totalWebp / 1024 / 1024).toFixed(1)} MB`);
  log(
    `  Net change:         ${((totalAfter + totalWebp - totalBefore) / 1024 / 1024).toFixed(1)} MB`
  );

  if (errorCount > 0) process.exit(1);
};

main().catch((e) => {
  console.error('[optimize-images] FATAL', e);
  process.exit(1);
});
