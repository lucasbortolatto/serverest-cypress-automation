import { gerarUsuario } from '../../support/factories/usuarioFactory';
import { usuariosService } from '../../support/services/usuariosService';

describe('API - Usuários', () => {
  let usuarioExistente;

  beforeEach(() => {
    usuarioExistente = gerarUsuario();
    cy.cadastrarUsuarioViaApi(usuarioExistente);
  });

  it('não permite cadastrar usuário com e-mail já utilizado', () => {
    const novoUsuario = gerarUsuario({ email: usuarioExistente.email });

    usuariosService.cadastrar(novoUsuario).then((resposta) => {
      expect(resposta.status).to.eq(400);
      expect(resposta.body.message).to.eq('Este email já está sendo usado');
    });
  });

  afterEach(() => {
    usuariosService.excluir(usuarioExistente._id);
  });
});
