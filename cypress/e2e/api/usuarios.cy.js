import { gerarUsuario } from '../../support/factories/usuarioFactory';
import { usuariosService } from '../../support/services/usuariosService';

describe('API - Usuários', () => {
  let usuarioExistente;

  beforeEach(() => {
    usuarioExistente = gerarUsuario();
    usuariosService.cadastrar(usuarioExistente).then((resposta) => {
      expect(resposta.status).to.eq(201);
      usuarioExistente._id = resposta.body._id;
    });
  });

  it('não permite cadastrar usuário com e-mail já utilizado', () => {
    // Nome e senha novos, só o e-mail repetido: o bloqueio só pode ser pelo e-mail
    const novoUsuario = gerarUsuario({ email: usuarioExistente.email });

    usuariosService.cadastrar(novoUsuario).then((resposta) => {
      expect(resposta.status).to.eq(400);
      expect(resposta.body.message).to.eq('Este email já está sendo usado');
    });
  });

  // Limpeza por cortesia com o ambiente público; nenhum teste depende dela
  afterEach(() => {
    usuariosService.excluir(usuarioExistente._id);
  });
});
