import { defineConfig } from 'unocss'
import { presetWind3, presetAttributify, presetTypography } from 'unocss'

export default defineConfig({
  presets: [
    presetWind3(),
    presetAttributify(),
    presetTypography(),
  ],
})