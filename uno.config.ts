import { defineConfig } from 'unocss/vite'
import { presetAttributify, presetUno, transformerDirectives, presetWebFonts } from 'unocss'

export default defineConfig({
  include: [/\.html$/, /\.ts$/],
  exclude: [/node_modules/],
  rules: [['w-half', { width: '50%' }]],
  transformers: [
    transformerDirectives({
      enforce: 'pre',
    }),
  ],

  presets: [
    presetUno(),
    presetAttributify(),
    presetWebFonts({
      provider: 'bunny',
      fonts: {
        sans: {
          name: 'Work Sans',
          weights: ['400', '500', '700'],
          italic: true,
        },
      },
    }),
  ],
  theme: {
    breakpoints: {
      'xs': '320px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
})
