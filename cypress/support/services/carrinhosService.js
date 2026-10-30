const url = `${Cypress.expose('apiUrl')}/carrinhos`;

export const carrinhosService = {
  // produtos: [{ idProduto, quantidade }]
  cadastrar(produtos, token) {
    return cy.request({
      method: 'POST',
      url,
      headers: { Authorization: token },
      body: { produtos },
      failOnStatusCode: false,
    });
  },

  // Cancela o carrinho do usuário dono do token e devolve as unidades ao estoque
  cancelarCompra(token) {
    return cy.request({
      method: 'DELETE',
      url: `${url}/cancelar-compra`,
      headers: { Authorization: token },
      failOnStatusCode: false,
    });
  },
};
