import {
  defineConfig,

  // presets
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  presetWind,

  // transformers
  transformerAttributifyJsx,
} from 'unocss'

export default defineConfig({
  shortcuts: {
    'btn': 'px-4 py-2 b-none rounded-lg cursor-pointer text-lg font-bold text-white bg-primary hover:bg-secondary transition',
    'btn-outer': 'p-2 m-2 cursor-pointer bg-transparent b-none',
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetWind(),
    presetWebFonts({
      provider: 'bunny',
      fonts: {
        base: 'Inter:400,500,600,700,800,900',
      },
    }),
    presetTypography(),
    presetIcons(),
  ],
  transformers: [
    transformerAttributifyJsx(),
  ],
  theme: {
    colors: {
      primary: '#d90429',
      secondary: '#ef233c',
      dark: '#2b2d42',
      gray: '#8d99ae',
      light: '#edf2f4',
    },
  },
  preflights: [
    {
      getCSS: ({ theme }) => {
        const t = theme as any

        return `
          body {
            --c-primary: ${t.colors.primary};
            --c-text: ${t.colors.text};
            --c-bg: ${t.colors.bg};
          }
          html {
            scroll-behavior: smooth;
            height: 100%;
          }
        `
      },
    },
  ],
})
