const esbuild = require("esbuild");

const production = process.argv.includes('--production'); // Check if we're in production mode
const watch = process.argv.includes('--watch'); // Check if we want to watch files for changes

/**
 * @type {import('esbuild').Plugin}
 * This plugin will handle logging of build errors during the watch process.
 */
const esbuildProblemMatcherPlugin = {
  name: 'esbuild-problem-matcher',
  setup(build) {
    build.onStart(() => {
      console.log('[watch] build started');
    });
    build.onEnd((result) => {
      result.errors.forEach(({ text, location }) => {
        console.error(`✘ [ERROR] ${text}`);
        console.error(`    ${location.file}:${location.line}:${location.column}:`);
      });
      console.log('[watch] build finished');
    });
  },
};

async function main() {
  // Create an esbuild context with the necessary configuration
  const ctx = await esbuild.context({
    entryPoints: [
      'src/extension.ts'  // The entry file for the extension
    ],
    bundle: true,            // Bundle all dependencies into a single file
    format: 'cjs',           // CommonJS format for Node.js compatibility
    minify: production,      // Minify the output in production mode
    sourcemap: !production,  // Enable sourcemaps in non-production mode
    sourcesContent: false,   // Do not include the source code in the sourcemaps
    platform: 'node',        // Target Node.js runtime
    outfile: 'dist/extension.js', // Output bundled file
    external: ['vscode'],    // Exclude 'vscode' from bundling, since it's provided by VS Code
    logLevel: 'silent',      // Set the logging level to silent to avoid verbose logs
    plugins: [
      esbuildProblemMatcherPlugin, // Add the error-handling plugin
    ],
  });

  if (watch) {
    await ctx.watch(); // Watch for file changes and rebuild automatically
  } else {
    await ctx.rebuild(); // Build once if not in watch mode
    await ctx.dispose(); // Dispose of the build context after one-time build
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1); // Exit with error code if the build fails
});
