const url = `${Cypress.expose('apiUrl')}/produtos`;

export const produtosService = {
  cadastrar(produto, token) {
    return cy.request({
      method: 'POST',
      url,
      headers: { Authorization: token },
      body: produto,
      failOnStatusCode: false,
    });
  },

  buscarPorId(id) {
    return cy.request({ method: 'GET', url: `${url}/${id}`, failOnStatusCode: false });
  },

  buscarPorNome(nome) {
    return cy.request({ method: 'GET', url, qs: { nome }, failOnStatusCode: false });
  },

  excluir(id, token) {
    return cy.request({
      method: 'DELETE',
      url: `${url}/${id}`,
      headers: { Authorization: token },
      failOnStatusCode: false,
    });
  },
};
