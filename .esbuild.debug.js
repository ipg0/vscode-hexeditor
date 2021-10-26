const esbuild = require('esbuild');

const watch = process.argv.find(a => a === '--watch') !== undefined;

// Build the editor provider
esbuild.build({
  entryPoints: ['src/extension.ts'],
	tsconfig: "./tsconfig.json",
  bundle: true,
	external: ['vscode'],
	sourcemap: 'inline',
	minify: false,
	watch,
	platform: 'node',
  outfile: 'dist/extension.js',
}).catch(() => process.exit(1))

esbuild.build({
  entryPoints: ['src/extension.ts'],
	tsconfig: "./tsconfig.json",
  bundle: true,
	format: 'cjs',
	external: ['vscode'],
	sourcemap: 'inline',
	minify: true,
	watch,
	platform: 'browser',
  outfile: 'dist/web/extension.js',
}).catch(() => process.exit(1))

// Build the data inspector
esbuild.build({
  entryPoints: ['media/data_inspector/inspector.ts'],
	tsconfig: "./tsconfig.json",
  bundle: true,
	external: ['vscode'],
	sourcemap: 'inline',
	watch,
	platform: 'browser',
  outfile: 'dist/inspector.js',
}).catch(() => process.exit(1))

// Build the webview editors
esbuild.build({
  entryPoints: ['media/editor/hexEdit.ts'],
	tsconfig: "./tsconfig.json",
  bundle: true,
	external: ['vscode'],
	sourcemap: 'inline',
	watch,
	platform: 'browser',
  outfile: 'dist/editor.js',
}).catch(() => process.exit(1))