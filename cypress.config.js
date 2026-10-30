const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    // Front usado pelos testes de UI: cy.visit('/login') abre https://front.serverest.dev/login
    baseUrl: 'https://front.serverest.dev',
    expose: {
      // API usada pelos testes de API e pelo setup dos testes de UI.
      // expose (Cypress 16+) é para valores públicos; segredos iriam em env, lidos com cy.env()
      apiUrl: 'https://serverest.dev',
    },
    viewportWidth: 1366,
    viewportHeight: 768,
  },
});
