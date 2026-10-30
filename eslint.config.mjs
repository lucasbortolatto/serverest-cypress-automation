import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import pluginCypress from 'eslint-plugin-cypress';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import globals from 'globals';

export default defineConfig([
  js.configs.recommended,

  {
    files: ['cypress.config.js'],
    languageOptions: { globals: globals.node },
  },

  {
    files: ['cypress/**/*.js'],
    extends: [pluginCypress.configs.recommended],
    rules: {
      'cypress/no-pause': 'error',
      'cypress/no-debug': 'error',
      'cypress/no-force': 'error',
      'cypress/require-data-selectors': 'error',
    },
  },

  // Precisa ficar por último para desligar as regras de estilo que conflitam com o Prettier
  eslintConfigPrettier,
]);
