const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://front.serverest.dev',
    expose: {
      apiUrl: 'https://serverest.dev',
    },
    viewportWidth: 1366,
    viewportHeight: 768,
  },
});
