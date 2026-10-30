const url = `${Cypress.expose('apiUrl')}/carrinhos`;

export const carrinhosService = {
  cadastrar(produtos, token) {
    return cy.request({
      method: 'POST',
      url,
      headers: { Authorization: token },
      body: { produtos },
      failOnStatusCode: false,
    });
  },

  cancelarCompra(token) {
    return cy.request({
      method: 'DELETE',
      url: `${url}/cancelar-compra`,
      headers: { Authorization: token },
      failOnStatusCode: false,
    });
  },
};
