// scripts/check-deps.js
// Usage: node scripts/check-deps.js
// Scans .js/.jsx/.ts/.tsx for import/require module names, compares with package.json,
// and reports modules not listed and installed packages that contain android/ios native dirs.

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// helper: list source files
const files = glob.sync('**/*.{js,jsx,ts,tsx}', {
  ignore: ['node_modules/**', 'android/**', 'ios/**', '**/dist/**', '.expo/**']
});

// regex to capture imports and requires
const importRegex = /(?:import\s+[^'"]*from\s+|require\s*\()\s*['"]([^'"].*?)['"]/g;
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const declaredDeps = {
  ...(packageJson.dependencies || {}),
  ...(packageJson.devDependencies || {}),
  ...(packageJson.peerDependencies || {})
};

const found = new Set();

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  let m;
  while ((m = importRegex.exec(content)) !== null) {
    let mod = m[1].trim();
    // ignore relative imports
    if (mod.startsWith('.') || mod.startsWith('/')) continue;
    // ignore urls
    if (mod.startsWith('http')) continue;
    // normalize: for scoped or path imports, keep the package root
    const parts = mod.split('/');
    let pkg = parts[0].startsWith('@') ? parts.slice(0, 2).join('/') : parts[0];
    found.add(pkg);
  }
});

// convert to array and sort
const importedPkgs = Array.from(found).sort();

const notDeclared = importedPkgs.filter(p => !Object.prototype.hasOwnProperty.call(declaredDeps, p));
const declaredButMissingFromNodeModules = Object.keys(declaredDeps).filter(p => {
  try {
    const resolved = require.resolve(path.join(process.cwd(), 'node_modules', p));
    return false;
  } catch (e) {
    return false; // don't flag missing node_modules here; we check installed below
  }
});

// check installed packages for native dirs
const nativePackages = [];
importedPkgs.forEach(p => {
  const pkgPath = path.join(process.cwd(), 'node_modules', p);
  try {
    if (fs.existsSync(pkgPath)) {
      if (fs.existsSync(path.join(pkgPath, 'android')) || fs.existsSync(path.join(pkgPath, 'ios'))) {
        nativePackages.push(p);
      } else {
        // also check package.json keywords or react-native field
        const pjPath = path.join(pkgPath, 'package.json');
        if (fs.existsSync(pjPath)) {
          const pj = JSON.parse(fs.readFileSync(pjPath, 'utf8'));
          const keywords = (pj.keywords || []).join(' ');
          const hasNativeHint = (pj?.reactNative || pj?.rnpm || keywords.includes('react-native') || keywords.includes('native'));
          if (hasNativeHint) nativePackages.push(p);
        }
      }
    }
  } catch (e) {
    // ignore
  }
});

console.log('Scanned files:', files.length);
console.log('\nImported external packages found (sample):\n', importedPkgs.slice(0, 80).join(', ') || '(none)');
console.log('\nPackages imported but NOT declared in package.json:\n');
if (notDeclared.length === 0) {
  console.log('  ✓ none — all imports are declared in package.json');
} else {
  notDeclared.forEach(p => console.log('  -', p));
}

console.log('\nPackages that appear to include native code (android/ios folders or react-native hint):\n');
if (nativePackages.length === 0) {
  console.log('  ✓ none detected');
} else {
  nativePackages.forEach(p => console.log('  -', p));
}

console.log('\n--- Recommendations ---');
console.log('1) Install any package listed above under "not declared".');
console.log('2) For any native package listed, you must prebuild and include native projects and/or use a custom dev client.');
console.log('3) To avoid runtime bundling failures, run `npx expo prebuild --platform android --clean` locally and fix errors before pushing.');
