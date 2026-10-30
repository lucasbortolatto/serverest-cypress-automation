export const cadastroProdutoPage = {
  visitar() {
    cy.visit('/admin/cadastrarprodutos');
  },

  // A imagem fica de fora: o campo tem asterisco, mas não é obrigatório
  cadastrar(produto) {
    cy.get('[data-testid=nome]').type(produto.nome);
    cy.get('[data-testid=preco]').type(produto.preco);
    cy.get('[data-testid=descricao]').type(produto.descricao);
    cy.get('[data-testid=quantity]').type(produto.quantidade);
    // "cadastar" com erro de digitação é o data-testid real do front
    cy.get('[data-testid=cadastarProdutos]').click();
  },
};
