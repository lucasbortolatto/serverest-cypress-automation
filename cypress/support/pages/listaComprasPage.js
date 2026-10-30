export const listaComprasPage = {
  nomeDoProduto() {
    return cy.get('[data-testid=shopping-cart-product-name]');
  },

  quantidadeDoProduto() {
    return cy.get('[data-testid=shopping-cart-product-quantity]');
  },
};
