import { gerarUsuario } from '../../support/factories/usuarioFactory';
import { cadastroUsuarioPage } from '../../support/pages/cadastroUsuarioPage';
import { homePage } from '../../support/pages/homePage';
import { loginPage } from '../../support/pages/loginPage';
import { usuariosService } from '../../support/services/usuariosService';

describe('UI - Cadastro de usuário', () => {
  let usuario;

  beforeEach(() => {
    usuario = gerarUsuario();
  });

  // Único teste que passa pela tela de login; os demais montam a sessão pela API
  it('novo usuário se cadastra, sai e entra novamente pela tela de login', () => {
    cadastroUsuarioPage.visitar();
    cadastroUsuarioPage.cadastrar(usuario);

    cy.contains('Cadastro realizado com sucesso').should('be.visible');
    cy.location('pathname').should('eq', '/home');

    homePage.sair();
    cy.location('pathname').should('eq', '/login');

    loginPage.entrar(usuario.email, usuario.password);
    cy.location('pathname').should('eq', '/home');
    homePage.botaoLogout().should('be.visible');

    // A tela mostrou sucesso; a API confirma que o dado foi gravado como usuário comum
    usuariosService.buscarPorEmail(usuario.email).then((resposta) => {
      expect(resposta.body.quantidade).to.eq(1);
      expect(resposta.body.usuarios[0]).to.include({
        nome: usuario.nome,
        administrador: 'false',
      });
    });
  });

  // O usuário nasce pela tela, então o id vem da API na limpeza
  afterEach(() => {
    usuariosService.buscarPorEmail(usuario.email).then((resposta) => {
      resposta.body.usuarios.forEach(({ _id }) => usuariosService.excluir(_id));
    });
  });
});
