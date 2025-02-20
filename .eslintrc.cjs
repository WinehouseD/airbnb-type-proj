module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'simple-import-sort'],
  rules: {
    'react/prop-types': 'off',
    'react-refresh/only-export-components': 'off',
    'react/no-unescaped-entities': 'off',
    'no-unused-vars': 'off',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Side effect imports.
          ['^\\u0000'],
          // Node.js built-ins.
          ['^node:'],
          // External packages.
          ['^@?\\w'],
          // Aliased imports (e.g., @/).
          ['^@/'],
          // Parent imports (e.g., ../).
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Sibling imports (e.g., ./).
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports.
          ['^.+\\.s?css$'],
        ],
      },
    ],
  },
};
