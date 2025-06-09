const { build } = require("esbuild");

build({
  bundle: true,
  minify: true,
  sourcemap: true,
  platform: "node",
  entryPoints: ["src/index.js"],
  outfile: "dist/index.js",
  target: "node16",
}).catch((e) => {
  console.error(e);
  process.exit(1);
});
