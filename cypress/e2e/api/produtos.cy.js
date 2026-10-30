import { gerarProduto } from '../../support/factories/produtoFactory';
import { gerarUsuario } from '../../support/factories/usuarioFactory';
import { loginService } from '../../support/services/loginService';
import { produtosService } from '../../support/services/produtosService';
import { usuariosService } from '../../support/services/usuariosService';

describe('API - Produtos', () => {
  let usuarioComum;
  let token;

  beforeEach(() => {
    usuarioComum = gerarUsuario();
    cy.cadastrarUsuarioViaApi(usuarioComum);
    loginService.autenticar(usuarioComum.email, usuarioComum.password).then((resposta) => {
      expect(resposta.status).to.eq(200);
      token = resposta.body.authorization;
    });
  });

  it('não permite que usuário comum cadastre produto', () => {
    const produto = gerarProduto();

    produtosService.cadastrar(produto, token).then((resposta) => {
      expect(resposta.status).to.eq(403);
      expect(resposta.body.message).to.eq('Rota exclusiva para administradores');
    });

    produtosService.buscarPorNome(produto.nome).then((resposta) => {
      expect(resposta.status).to.eq(200);
      expect(resposta.body.quantidade).to.eq(0);
    });
  });

  afterEach(() => {
    usuariosService.excluir(usuarioComum._id);
  });
});
