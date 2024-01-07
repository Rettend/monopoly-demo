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
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: {
    'btn': 'px-4 py-2 b-none rounded-lg cursor-pointer text-lg font-bold text-white bg-primary hover:bg-secondary transition',
    'btn-outer': 'p-2 m-2 cursor-pointer bg-transparent b-none',
    'big-btn': 'm-10 cursor-pointer shadow-(2xl black opacity-40) transition hover:opacity-80 focus:(outline-(~ 5 white)) active:translate-y-3',
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
    transformerVariantGroup(),
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
