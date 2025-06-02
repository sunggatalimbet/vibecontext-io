import nextConfig from '@repo/eslint-config/next'
import TS_ESLint from 'typescript-eslint'

export default TS_ESLint.config(...nextConfig, {
  languageOptions: {
    parserOptions: {
      project: './tsconfig.json',
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
