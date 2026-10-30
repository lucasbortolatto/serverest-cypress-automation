const url = `${Cypress.expose('apiUrl')}/login`;

export const loginService = {
  autenticar(email, password) {
    return cy.request({
      method: 'POST',
      url,
      body: { email, password },
      failOnStatusCode: false,
    });
  },
};
