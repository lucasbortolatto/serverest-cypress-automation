import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import pluginCypress from 'eslint-plugin-cypress';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import globals from 'globals';

export default defineConfig([
  // Regras gerais de JavaScript: variável não usada, variável não declarada etc.
  js.configs.recommended,

  // cypress.config.js roda no Node, fora do navegador
  {
    files: ['cypress.config.js'],
    languageOptions: { globals: globals.node },
  },

  // Testes e código de apoio rodam no navegador, dentro do Cypress
  {
    files: ['cypress/**/*.js'],
    extends: [pluginCypress.configs.recommended],
    rules: {
      // Impede esquecer pausas e depuração no código entregue
      'cypress/no-pause': 'error',
      'cypress/no-debug': 'error',
      // force: true esconde problemas reais de interação com a tela
      'cypress/no-force': 'error',
      // Seletores só por atributos data-*, que não mudam com layout ou texto
      'cypress/require-data-selectors': 'error',
    },
  },

  // Desliga as regras de estilo que o Prettier já cuida; sempre por último
  eslintConfigPrettier,
]);
