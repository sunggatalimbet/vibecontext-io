import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import TS_ESLint from 'typescript-eslint'
import baseConfig from './base.js'

export default TS_ESLint.config(...baseConfig, {
  files: ['**/*.{jsx,tsx}'],
  extends: [react.configs.flat.recommended, react.configs.flat['jsx-runtime']],
  plugins: {
    react: react,
    'react-hooks': reactHooks,
  },
  rules: {
    // React Hooks rules
    ...reactHooks.configs.recommended.rules,

    // React specific rules
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/jsx-key': 'error',
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-undef': 'error',
    'react/no-unknown-property': ['error', { ignore: ['cmdk-input-wrapper'] }],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
})
