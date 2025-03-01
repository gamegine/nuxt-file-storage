// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

// Run `npx @eslint/config-inspector` to inspect the resolved config interactively
export default createConfigForNuxt({
  features: {
    // Rules for module authors
    tooling: true,
    // Rules for formatting
    stylistic: true,
  },
  dirs: {
    src: [
      './playground',
    ],
  },
})
  .append(
    // your custom flat config here...
    {
      rules: {
        'vue/multi-word-component-names': 0,
        'vue/html-indent': 0,
        'vue/html-self-closing': 0,
        'vue/max-attributes-per-line': 0,
        'vue/singleline-html-element-content-newline': 0,
        '@typescript-eslint/no-unused-vars': 0,
        '@stylistic/no-tabs': 0,
        '@stylistic/indent': 0,
      },
    },
  )
