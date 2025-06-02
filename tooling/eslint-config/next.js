import nextPlugin from '@next/eslint-plugin-next'
import prettierPlugin from 'eslint-plugin-prettier'
import TS_ESLint from 'typescript-eslint'
import reactConfig from './react.js'

export default TS_ESLint.config(...reactConfig, {
  files: ['**/*.{js,jsx,ts,tsx}'],
  plugins: {
    '@next/next': nextPlugin,
    prettier: prettierPlugin,
  },
  rules: {
    // Next.js specific rules
    '@next/next/no-img-element': 'warn',
    '@next/next/no-html-link-for-pages': 'error',
    '@next/next/no-head-element': 'error',
    '@next/next/no-page-custom-font': 'warn',
    '@next/next/no-unwanted-polyfillio': 'error',
    '@next/next/no-before-interactive-script-outside-document': 'error',
    '@next/next/no-css-tags': 'error',
    '@next/next/no-head-import-in-document': 'error',
    '@next/next/no-script-component-in-head': 'error',
    '@next/next/no-styled-jsx-in-document': 'error',
    '@next/next/no-sync-scripts': 'warn',
    '@next/next/no-title-in-document-head': 'error',

    // Prettier integration
    'prettier/prettier': 'error',
  },
})
