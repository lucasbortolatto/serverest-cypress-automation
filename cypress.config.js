const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    // Front usado pelos testes de UI: cy.visit('/login') abre https://front.serverest.dev/login
    baseUrl: 'https://front.serverest.dev',
    env: {
      // API usada pelos testes de API e pelo setup dos testes de UI
      apiUrl: 'https://serverest.dev',
    },
    viewportWidth: 1366,
    viewportHeight: 768,
  },
});
