const url = `${Cypress.expose('apiUrl')}/login`;

export const loginService = {
  // A resposta traz body.authorization já com o prefixo "Bearer ", pronto para o header
  autenticar(email, password) {
    return cy.request({
      method: 'POST',
      url,
      body: { email, password },
      failOnStatusCode: false,
    });
  },
};
