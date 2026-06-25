// Ambient declarations so TypeScript accepts global, side-effect stylesheet
// imports such as `import "./globals.css"`. Next.js bundles types for CSS
// Modules (*.module.css) but not for bare global stylesheet imports, which is
// why the editor reports TS2882 even though the build compiles CSS correctly.
declare module "*.css";
