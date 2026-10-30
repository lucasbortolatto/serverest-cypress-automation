export const homePage = {
  visitar() {
    cy.visit('/home');
  },

  botaoLogout() {
    return cy.get('[data-testid=logout]');
  },

  sair() {
    this.botaoLogout().click();
  },

  pesquisar(nomeProduto) {
    cy.get('[data-testid=pesquisar]').type(nomeProduto);
    cy.get('[data-testid=botaoPesquisar]').click();
  },

  // Chamar depois de pesquisar pelo nome único: assim só existe um card na tela
  adicionarNaLista() {
    cy.get('[data-testid=adicionarNaLista]').should('have.length', 1).click();
  },
};
