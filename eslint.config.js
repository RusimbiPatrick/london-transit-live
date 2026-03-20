module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  ignorePatterns: [
    '**/dist/**',
    '**/build/**',
    '**/.expo/**',
    '**/.turbo/**',
    '**/coverage/**',
    '**/node_modules/**',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'react-native'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react-native/all',
    'prettier',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['apps/web/**/*.{ts,tsx,js,jsx}', 'packages/**/*.{ts,tsx,js,jsx}'],
      env: {
        browser: true,
      },
      rules: {
        'react-native/no-inline-styles': 'off',
      },
    },
    {
      files: ['apps/mobile/**/*.{ts,tsx,js,jsx}'],
      env: {
        'react-native/react-native': true,
      },
      rules: {
        'react-native/no-raw-text': 'off',
      },
    },
    {
      files: ['*.cjs', '*.js'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
};
