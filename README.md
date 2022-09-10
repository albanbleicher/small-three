# small three

quickly bootstrap a three project with useful pre-configured goods

- Vite ⚡
- ESLint/Prettier with StandardJS config 🫧
- TypeScript ✅
- Unocss 💄
- Texture loader 🏞
- GLTF/FBX Loaders 🔎
- GLSL imports✨🌈
- Tweakpane ⚙️ (to do)

## Setup

After cloning the template, just run `pnpm install` and everything is good to go, you can une `pnpm dev`to start the dev environment.

## Lint

To preview lint errors and warnings, just use `pnpm lint`. Add `--fix` flag to fix them if there are any.

## Assets management

- By putting files in `assets/textures` or `assets/models`, assets will automatically be loaded and available in `app.ts` using `this.assets.textures` or `this.assets.models`.

  > 💡 TIP: Supports nested directories. `assets/textures/animals/cat.png` will be accessible using `this.assets.textures.animals.cat`

- In scripts, you can use `@`alias to access `src` folder from anywhere.

## To do

- add accurate percentage to loader (onProgress callback currently not supported by three)
- add tweakpane
-
