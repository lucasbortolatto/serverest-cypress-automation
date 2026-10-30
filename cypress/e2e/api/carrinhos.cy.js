import { gerarProduto } from '../../support/factories/produtoFactory';
import { gerarUsuario } from '../../support/factories/usuarioFactory';
import { carrinhosService } from '../../support/services/carrinhosService';
import { loginService } from '../../support/services/loginService';
import { produtosService } from '../../support/services/produtosService';
import { usuariosService } from '../../support/services/usuariosService';

describe('API - Carrinhos', () => {
  // Com 2 unidades dá para ver que a API desconta a quantidade pedida, e não só 1 por item
  const QUANTIDADE_RESERVADA = 2;

  let admin;
  let token;
  let produto;

  beforeEach(() => {
    admin = gerarUsuario({ administrador: 'true' });
    produto = gerarProduto();

    cy.cadastrarUsuarioViaApi(admin);
    loginService.autenticar(admin.email, admin.password).then((resposta) => {
      expect(resposta.status).to.eq(200);
      token = resposta.body.authorization;
    });
    // cy.then: o token só existe depois que o login executa
    cy.then(() => produtosService.cadastrar(produto, token)).then((resposta) => {
      expect(resposta.status).to.eq(201);
      produto._id = resposta.body._id;
    });
  });

  it('reserva o estoque ao criar o carrinho e devolve ao cancelar a compra', () => {
    const estoqueInicial = produto.quantidade;

    carrinhosService
      .cadastrar([{ idProduto: produto._id, quantidade: QUANTIDADE_RESERVADA }], token)
      .then((resposta) => {
        expect(resposta.status).to.eq(201);
      });

    produtosService.buscarPorId(produto._id).then((resposta) => {
      expect(resposta.body.quantidade).to.eq(estoqueInicial - QUANTIDADE_RESERVADA);
    });

    carrinhosService.cancelarCompra(token).then((resposta) => {
      expect(resposta.status).to.eq(200);
      expect(resposta.body.message).to.eq(
        'Registro excluído com sucesso. Estoque dos produtos reabastecido',
      );
    });

    produtosService.buscarPorId(produto._id).then((resposta) => {
      expect(resposta.body.quantidade).to.eq(estoqueInicial);
    });
  });

  // A API não exclui produto que está em carrinho nem usuário com carrinho
  afterEach(() => {
    produtosService.excluir(produto._id, token);
    usuariosService.excluir(admin._id);
  });
});
