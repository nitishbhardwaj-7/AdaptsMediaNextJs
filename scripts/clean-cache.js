const fs = require('fs');
const path = require('path');

function cleanZeroByteFiles(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }

  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      try {
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          cleanZeroByteFiles(fullPath);
        } else if (stat.isFile() && stat.size === 0) {
          fs.unlinkSync(fullPath);
          console.log(`[Cache Cleaner] Removed corrupted 0-byte cache file: ${fullPath}`);
        }
      } catch (fileErr) {
        // Ignore individual file lock errors
      }
    }
  } catch (err) {
    console.warn(`[Cache Cleaner] Warning reading/cleaning cache directory ${dir}:`, err.message);
  }
}

const targetDirs = [
  path.join(process.cwd(), '.next', 'cache', 'images'),
  path.join(process.cwd(), '.next', 'dev', 'cache', 'images'),
];

console.log('[Cache Cleaner] Checking for corrupted 0-byte Next.js cache files...');
for (const dir of targetDirs) {
  cleanZeroByteFiles(dir);
}
console.log('[Cache Cleaner] Cleanup completed.');
