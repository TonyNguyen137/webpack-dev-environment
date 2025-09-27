import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },

    rules: {
      'no-unused-vars': 'warn',
      'arrow-body-style': ['error', 'as-needed'],
      'capitalized-comments': [
        'error',
        'always',
        {
          line: {
            ignorePattern: 'eslint-ignore',
          },
          block: {
            ignoreInlineComments: true,
            ignorePattern: 'eslint-ignore',
          },
        },
      ],
    },
  },
]);
