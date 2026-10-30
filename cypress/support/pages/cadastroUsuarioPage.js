export const cadastroUsuarioPage = {
  visitar() {
    cy.visit('/cadastrarusuarios');
  },

  // Sem marcar o checkbox de administrador: o cadastro pela tela cria usuário comum
  cadastrar(usuario) {
    cy.get('[data-testid=nome]').type(usuario.nome);
    cy.get('[data-testid=email]').type(usuario.email);
    cy.get('[data-testid=password]').type(usuario.password, { log: false });
    cy.get('[data-testid=cadastrar]').click();
  },
};
