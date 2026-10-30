const url = `${Cypress.expose('apiUrl')}/usuarios`;

export const usuariosService = {
  cadastrar(usuario) {
    return cy.request({ method: 'POST', url, body: usuario, failOnStatusCode: false });
  },

  buscarPorEmail(email) {
    return cy.request({ method: 'GET', url, qs: { email }, failOnStatusCode: false });
  },

  excluir(id) {
    return cy.request({ method: 'DELETE', url: `${url}/${id}`, failOnStatusCode: false });
  },
};
