import path from 'path'
import Unocss from 'unocss/vite'
import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl'

export default defineConfig({
  plugins: [Unocss(), glsl()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve('.', '/src') }],
  },
})
