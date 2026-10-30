export const cadastroProdutoPage = {
  visitar() {
    cy.visit('/admin/cadastrarprodutos');
  },

  cadastrar(produto) {
    cy.get('[data-testid=nome]').type(produto.nome);
    cy.get('[data-testid=preco]').type(produto.preco);
    cy.get('[data-testid=descricao]').type(produto.descricao);
    cy.get('[data-testid=quantity]').type(produto.quantidade);
    // "cadastar" está escrito assim no front
    cy.get('[data-testid=cadastarProdutos]').click();
  },
};
